import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Genes, Report } from '@/entities';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { ConfigService } from '@nestjs/config';
import { S3Provider } from '@/common/providers/s3.provider';
import * as dayjs from 'dayjs';
import { AnalysisService } from '../analysis/analysis.service';
import { PatientsInformationService } from '../patient-information/patient-information.service';
import { ReportTemplateData, ReportVariantData } from './interfaces';
import { OpenAI } from 'openai';
import { HttpProvider } from '@/common/providers/http.provider';
import { ChatbotService } from '../chatbot/chatbot.service';
import { VariantReportedDto } from './dto/variant-reported';
import { ReferencesReportedDto } from './dto/references-reported.dto';

@Injectable()
export class ReportService {
	private openai: OpenAI;

	constructor(
		@InjectRepository(Report)
		private readonly reportRepository: Repository<Report>,
		@InjectRepository(Genes)
		private readonly genesRepository: Repository<Genes>,
		private readonly configService: ConfigService,
		private readonly s3Provider: S3Provider,
		private readonly analysisService: AnalysisService,
		private readonly patientsInformationService: PatientsInformationService,
		private readonly httpProvider: HttpProvider,
		private readonly chatbotService: ChatbotService,
	) {}

	async onModuleInit() {
		this.openai = new OpenAI({
			apiKey: this.configService.get<string>('OPENAI_API_KEY'),
		});
	}

	async create(createReportDto: CreateReportDto, user_id: number) {
		const analysisResult = await this.analysisService.findOne(
			createReportDto.analysisId,
		);
		const analysis = analysisResult.data;

		let detailsGeneAnhVariant = await this.generateSummary(createReportDto.variants, analysis.assembly);
		let detailsReferences = this.generateReferences(createReportDto.references);
		
		const patientResult = await this.patientsInformationService.findOne(
			createReportDto.analysisId,
		);
		const patient = patientResult.data;

		const formattedVariants: ReportVariantData[] = createReportDto.variants.map(
			(v) => ({
				gene: v.gene,
				change: v.cdna,
				zygosity: 'N/A',
				inheritance: 'N/A',
				classification: v.classification,
			}),
		);

		const templateData: ReportTemplateData = {
			report_name: createReportDto.report_name,
			patient_no: `GE-${patient.id}`,
			patient_name: `${patient.first_name} ${patient.last_name}`,
			dob: dayjs(patient.dob).format('DD/MM/YYYY'),
			gender: patient.gender,
			ethnicity: patient.ethnicity,
			physician_name: 'N/A',
			specimen: patient.sample_type,
			received_date: dayjs(analysis.createdAt).format('DD/MM/YYYY'),
			prepared_by: 'TLU GENETICS',
			report_date: dayjs(new Date()).format('DD/MM/YYYY'),
			test_requested: analysis.sequencing_type,
			clinical_information: patient.phenotype,
			summary: formattedVariants.map((v) => ({
				text: `${v.classification.toUpperCase()} VARIANT IDENTIFIED`,
			})),
			variants: formattedVariants,
			details: detailsGeneAnhVariant,
			references: detailsReferences,
		};

		const { fileName } = await this.generateReportFile(
			templateData,
			user_id,
			analysis.id,
		);

		const report = this.reportRepository.create({
			report_name: createReportDto.report_name,
			analysis_id: createReportDto.analysisId,
			user_created: user_id,
			file_path: fileName,
			is_deleted: 0,
		});

		const downloadUrl = await this.s3Provider.generateDownloadUrl(
			`${this.configService.get('ANALYSIS_FOLDER')}/${user_id}/${analysis.id}/reports/${fileName}`,
		);
		await this.reportRepository.save(report);

		return {
			status: 'success',
			message: 'Report created successfully',
			data: {
				...report,
				downloadUrl,
			},
		};
	}

	private async generateReportFile(
		data: ReportTemplateData,
		user_id: number,
		analysis_id: number,
	) {
		const templatePath = path.resolve(
			process.cwd(),
			'src/modules/report/templates/genetics_report_template.docx',
		);

		if (!fs.existsSync(templatePath)) {
			throw new BadRequestException('Report template not found');
		}

		const content = fs.readFileSync(templatePath);

		const zip = new PizZip(content);

		const doc = new Docxtemplater(zip, {
			paragraphLoop: true,
			linebreaks: true,
		});

		try {
			doc.render(data);
		} catch (error) {
			throw new BadRequestException('Error rendering report template');
		}

		const buffer = doc.getZip().generate({
			type: 'nodebuffer',
		});

		const fileName = `report_${Date.now()}.docx`;

		const outputPath = `${this.configService.get('MOUNT_FOLDER')}/${this.configService.get('ANALYSIS_FOLDER')}/${user_id}/${analysis_id}/reports/${fileName}`;
		if (!fs.existsSync(path.dirname(outputPath))) {
			fs.mkdirSync(path.dirname(outputPath), {
				recursive: true,
			});
		}

		fs.writeFileSync(outputPath, new Uint8Array(buffer));

		return {
			fileName,
			filePath: outputPath,
		};
	}

	async findAll(user_id: number, analysis_id: number) {
		const reports = await this.reportRepository.find({
			where: {
				user_created: user_id,
				analysis_id: analysis_id,
				is_deleted: 0,
			},
		});

		return {
			status: 'success',
			message: 'Get reports successfully',
			data: reports,
		};
	}

	async findOne(user_id: number, report_id: number) {
		const report = await this.reportRepository.findOne({
			where: {
				id: report_id,
				user_created: user_id,
				is_deleted: 0,
			},
		});

		if (!report) {
			throw new BadRequestException('Report not found');
		}

		const download_url = await this.s3Provider.generateDownloadUrl(
			`${this.configService.get('ANALYSIS_FOLDER')}/${user_id}/${report.analysis_id}/reports/${report.file_path}`,
		);

		return {
			status: 'success',
			message: 'Get report successfully',
			data: {
				...report,
				download_url,
			},
		};
	}

	async delete(user_id: number, report_id: number) {
		const report = await this.reportRepository.findOne({
			where: {
				id: report_id,
				user_created: user_id,
				is_deleted: 0,
			},
		});

		if (!report) {
			throw new BadRequestException('That report could not be found');
		}

		await this.reportRepository.update({ id: report_id }, { is_deleted: 1 });

		return {
			status: 'success',
			message: 'Deleted successfully!',
		};
	}

	async generateSummary(variants: VariantReportedDto[], assembly: string) {
		let detailsGeneAnhVariant = [];
		const variantData = await Promise.all(
			variants.map(async (v) => {
				const [chrom, pos, ref, alt] = v.id.split('_');
				const response = await this.httpProvider.getGenebeData(
					chrom,
					parseInt(pos),
					ref,
					alt,
					v.transcript,
					assembly,
				);
				return {
					chrom,
					pos,
					ref,
					alt,
					gene: v.gene,
					transcript: v.transcript,
					response,
				};
			}),
		);

		for (let geneBeRes of variantData) {
			let variantSummary = await this.chatbotService.getVariantDescription(geneBeRes.transcript, geneBeRes.response);
			let geneInfo = await this.genesRepository.findOne({
				where: {
					name: geneBeRes.gene,
				},
			});
			detailsGeneAnhVariant.push({
				text: `${geneBeRes.gene}: ${geneInfo ? geneInfo.summary : 'No description available'}.`,
			});
			detailsGeneAnhVariant.push({
				text: `${variantSummary}`,
			});
		}
		return detailsGeneAnhVariant;
	}

	generateReferences(refs: ReferencesReportedDto[]) {
		let detailsReferences = [];

		for (const ref of refs) {
			detailsReferences.push({
				text: `${ref.authors.join(', ')} \n${ref.title} ${ref.source}, ${ref.date}, PMID: ${ref.id}. \n`,
			});
		}
		
		return detailsReferences;
	}
}
