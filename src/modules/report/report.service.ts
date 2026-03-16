import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from '@/entities';
import { Repository } from 'typeorm';

import * as fs from "fs";
import * as path from "path";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { ConfigService } from '@nestjs/config';
import { S3Provider } from '@/common/providers/s3.provider';
import * as dayjs from 'dayjs'
import { AnalysisService } from '../analysis/analysis.service';
import { PatientsInformationService } from '../patient-information/patient-information.service';

interface ReportVariantData {
    gene: string;
    change: string;
    zygosity: string;
    inheritance: string;
    classification: string;
}

interface ReportTemplateData {
    report_name: string;
    patient_no: string;
    patient_name: string;
    dob: string;
    gender: string;
    ethnicity: string;
    physician_name: string;
    specimen: string;
    received_date: string;
    prepared_by: string;
    report_date: string;
    test_requested: string;
    clinical_information: string;
    summary: { text: string }[];
    variants: ReportVariantData[];
    details: { text: string }[];
}

@Injectable()
export class ReportService {
    constructor(
        @InjectRepository(Report)
        private reportRepository: Repository<Report>,
        private configService: ConfigService,
        private s3Provider: S3Provider,
        private analysisService: AnalysisService,
        private patientsInformationService: PatientsInformationService,
    ) { }

    async create(createReportDto: CreateReportDto, user_id: number) {

        const analysisResult = await this.analysisService.findOne(createReportDto.analysisId);
        const analysis = analysisResult.data;

        const patientResult = await this.patientsInformationService.findOne(createReportDto.analysisId);
        const patient = patientResult.data;

        const formattedVariants: ReportVariantData[] = createReportDto.variants.map(v => ({
            gene: v.gene,
            change: v.cdna,
            zygosity: "N\\A",
            inheritance: "N\\A",
            classification: v.classification
        }));

        const templateData: ReportTemplateData = {
            report_name: createReportDto.report_name,

            patient_no: `GE-${patient.id}`,
            patient_name: `${patient.first_name} ${patient.last_name}`,
            dob: dayjs(patient.dob).format('DD/MM/YYYY'),
            gender: patient.gender,
            ethnicity: patient.ethnicity,

            physician_name: "N\\A",
            specimen: patient.sample_type,
            received_date: dayjs(analysis.createdAt).format('DD/MM/YYYY'),
            prepared_by: "TLU GENETICS",
            report_date: dayjs(new Date()).format('DD/MM/YYYY'),

            test_requested: analysis.sequencing_type,

            clinical_information: patient.phenotype,

            summary: formattedVariants.map(v => ({
                text: `${v.classification.toUpperCase()} VARIANT IDENTIFIED`
            })),

            variants: formattedVariants,
            details: [`SYNE4: This gene is a member of the nesprin family of genes, that encode KASH (Klarsicht, Anc-1, Syne Homology) domain-containing proteins. In addition to the KASH domain, this protein also contains a coiled-coil and leucine zipper region, a spectrin repeat, and a kinesin-1 binding region. This protein localizes to the outer nuclear membrane, and is part of the linker of nucleoskeleton and cytoskeleton (LINC) complex in the nuclear envelope. LINC complexes are formed by SUN (Sad1, UNC-84)-KASH pairs, and are thought to mechanically couple nuclear components to the cytoskeleton. Mutations in this gene have been associated with progressive high-frequency hearing loss. The absence of this protein in mice also caused hearing loss, and changes in hair cell morphology in the ears. Alternative splicing results in multiple transcript variants encoding different isoforms. [provided by RefSeq, Aug 2015] The identified synonymous variant, c.243T>C (p.Ser81=), lies in exon 2 of the SYNE4 gene. This variant is predicted to be non- damaging by in-silico prediction tool(s) (CADD, REVEL, SpliceAI). This variant has been reported in the dbSNP database (rs149158221) and in the genome Aggregation Database (gnomAD) as a rare variant with the highest allele frequency (AF) of 0.00202215 while 1 homozygosity (for this variant) has been reported. In the ClinVar database, the clinical significance of this variant has been reported as 'Benign/Likely benign' with consensus in the context of SYNE4-related disorder (RCV003908030.2). In summary, based on ACMG guidelines, this variant was classified as 'Benign or Likely Benign'.`,
                `NGF: This gene is a member of the NGF-beta family and encodes a secreted protein which homodimerizes and is incorporated into a larger complex. This protein has nerve growth stimulating activity and the complex is involved in the regulation of growth and the differentiation of sympathetic and certain sensory neurons. Mutations in this gene have been associated with hereditary sensory and autonomic neuropathy, type 5 (HSAN5), and dysregulation of this gene's expression is associated with allergic rhinitis. [provided by RefSeq, Jul 2008]`].map(v => ({
                    text: `${v}`
                }))
        };

        const { fileName } = await this.generateReportFile(templateData, user_id, analysis.id);

        const report = this.reportRepository.create({
            report_name: createReportDto.report_name,
            analysis_id: createReportDto.analysisId,
            user_created: user_id,
            file_path: fileName,
            is_deleted: 0
        });

        const downloadUrl = await this.s3Provider.generateDownloadUrl(
            `${this.configService.get('ANALYSIS_FOLDER')}/${user_id}/${analysis.id}/reports/${fileName}`
        );
        await this.reportRepository.save(report);

        return {
            status: 'success',
            message: 'Report created successfully',
            data: {
                ...report,
                downloadUrl
            }
        };
    }

    private async generateReportFile(data: ReportTemplateData, user_id: number, analysis_id: number) {
        const templatePath = path.resolve(
            process.cwd(),
            "src/modules/report/templates/genetics_report_template.docx"
        );

        if (!fs.existsSync(templatePath)) {
            throw new BadRequestException("Report template not found");
        }

        const content = fs.readFileSync(templatePath);

        const zip = new PizZip(content);

        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true
        });

        doc.setData(data);

        try {
            doc.render();
        } catch (error) {
            throw new BadRequestException("Error rendering report template");
        }

        const buffer = doc.getZip().generate({
            type: "nodebuffer"
        });

        const fileName = `report_${Date.now()}.docx`;

        const outputPath = `${this.configService.get('MOUNT_FOLDER')}/${this.configService.get('ANALYSIS_FOLDER')}/${user_id}/${analysis_id}/reports/${fileName}`
        if (!fs.existsSync(path.dirname(outputPath))) {
            fs.mkdirSync(path.dirname(outputPath), {
                recursive: true
            });
        }

        fs.writeFileSync(outputPath, new Uint8Array(buffer));

        return {
            fileName,
            filePath: outputPath
        };
    }

    async findAll(user_id: number, analysis_id: number) {
        const reports = await this.reportRepository.find({
            where: {
                user_created: user_id,
                analysis_id: analysis_id,
                is_deleted: 0
            }
        });

        return {
            status: 'success',
            message: 'Get reports successfully',
            data: reports
        };
    }

    async findOne(user_id: number, report_id: number) {
        const report = await this.reportRepository.findOne({
            where: {
                id: report_id,
                user_created: user_id,
                is_deleted: 0
            }
        });

        if (!report) {
            throw new BadRequestException('Report not found');
        }

        const download_url = await this.s3Provider.generateDownloadUrl(
            `${this.configService.get('ANALYSIS_FOLDER')}/${user_id}/${report.analysis_id}/reports/${report.file_path}`
        );

        return {
            status: 'success',
            message: 'Get report successfully',
            data: {
                ...report,
                download_url
            }
        };
    }

    async delete(user_id: number, report_id: number) {

        const report = await this.reportRepository.findOne({
            where: {
                id: report_id,
                user_created: user_id,
                is_deleted: 0
            }
        });

        if (!report) {
            throw new BadRequestException('That report could not be found');
        }

        await this.reportRepository.update(
            { id: report_id },
            { is_deleted: 1 }
        );

        return {
            status: "success",
            message: "Deleted successfully!"
        };
    }

}
