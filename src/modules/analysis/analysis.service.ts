import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateAnalysisDto } from './dto/create-analysis.dto';
import { UpdateAnalysisDto } from './dto/update-analysis.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Analysis } from '@/entities';
import { In, Like, Repository } from 'typeorm';
import * as dayjs from 'dayjs'
import { PipelinesService } from '../pipelines/pipelines.service';
import { PaginationProvider } from '@/common/providers/pagination.provider';
import { AnalysisStatus } from '@/enums';
import { UploadsService } from '../uploads/uploads.service';
import { ConfigService } from '@nestjs/config';
import { S3Provider } from '@/common/providers/s3.provider';
import { FilterAnalysisDto } from './dto/filter-analysis.dto';
import { SamplesService } from '../samples/samples.service';
import { WorkspacesService } from '../workspaces/workspaces.service';
import { VariantToReportDto } from '../variants/dto/variant-to-report.dto';
import { Genes } from '@/entities/genes.entity';
import { GetGeneDetailDto } from './dto/get-gene-detail.dto';

@Injectable()
export class AnalysisService {

  constructor(
    @InjectRepository(Analysis) private analysisRepository: Repository<Analysis>,
    @InjectRepository(Genes) private genesRepository: Repository<Genes>,
    private readonly pipelinesService: PipelinesService,
    private readonly paginationProvider: PaginationProvider,
    private readonly uploadsService: UploadsService,
    private readonly samplesService: SamplesService,
    @Inject(forwardRef(() => WorkspacesService))
    private readonly workspacesService: WorkspacesService,
    private readonly configService: ConfigService,
    private readonly s3Provider: S3Provider
  ) { }

  async create(createAnalysisDto: CreateAnalysisDto, user_id: number) {
    const uploads = await this.uploadsService.findUploadsBySampleId(createAnalysisDto.sample_id);
    const newAnalysis = new Analysis();

    newAnalysis.name = createAnalysisDto.name;
    newAnalysis.project_id = createAnalysisDto.project_id;
    newAnalysis.pipeline_id = createAnalysisDto.pipeline_id;
    newAnalysis.sample_id = createAnalysisDto.sample_id;
    newAnalysis.p_type = createAnalysisDto.p_type;
    newAnalysis.size = createAnalysisDto.size;
    newAnalysis.description = createAnalysisDto.description;
    newAnalysis.assembly = createAnalysisDto.assembly;
    newAnalysis.user_id = user_id;
    newAnalysis.is_deleted = 0;

    if (createAnalysisDto.p_type == 'vcf') {
      newAnalysis.status = AnalysisStatus.QUEUING;
    } else {
      newAnalysis.status = AnalysisStatus.FASTQ_QUEUING;
    }

    const result = await this.analysisRepository.save(newAnalysis);
    let igv_local_path = `${this.configService.get<string>('ANALYSIS_FOLDER')}/${user_id}/${result.id}`;
    await this.analysisRepository.update({ id: result.id }, { igv_local_path, upload_id: uploads[0].id });

    for (let e of uploads) {
      let destination = `${this.configService.get<string>('ANALYSIS_FOLDER')}/${result.user_id}/${result.id}/${e.upload_name}`;
      let source = encodeURIComponent(`${this.configService.get<string>('AWS_BUCKET')}/${e.file_path}`);

      await this.s3Provider.copyObject(source, destination);
    }

    return {
      status: 'success',
      message: 'Create analysis successfully'
    };
  }

  async findAll(user_id: number, page: number, pageSize: number, filterAnalysisDto: FilterAnalysisDto) {
    const filters: any = {
      user_id: user_id,
      is_deleted: 0
    }

    if (filterAnalysisDto.status != '') {
      const statusMap = {
        queuing: [AnalysisStatus.QUEUING, AnalysisStatus.FASTQ_QUEUING],
        analyzing: [AnalysisStatus.ANALYZING, AnalysisStatus.FASTQ_ANALYZING, AnalysisStatus.VEP_ANALYZED, AnalysisStatus.IMPORTING],
        analyzed: [AnalysisStatus.ANALYZED],
        error: [AnalysisStatus.ERROR, AnalysisStatus.FASTQ_ERROR]
      };

      const statuses = statusMap[filterAnalysisDto.status.toLowerCase()];
      if (statuses) {
        filters.status = In(statuses);
      }
    }
    if (filterAnalysisDto.assembly != '') {
      filters.assembly = filterAnalysisDto.assembly
    }
    if (filterAnalysisDto.analysisName != '') {
      filters.name = Like(`%${filterAnalysisDto.analysisName}%`)
    }

    const results = await this.paginationProvider.paginate(page, pageSize, this.analysisRepository, filters);

    const data = await Promise.all(results.data.map(async (analysis) => {
      const createdAt = dayjs(analysis.createdAt).format('DD/MM/YYYY');
      const analyzed = analysis.analyzed ? dayjs(analysis.analyzed).format('DD/MM/YYYY') : '';
      const workspaceName = await this.workspacesService.getWorkspaceName(analysis.project_id);
      return {
        id: analysis.id,
        name: analysis.name,
        workspaceName: workspaceName ? workspaceName.data : '',
        createdAt: createdAt,
        analyzed: analyzed,
        variants: analysis.variants,
        assembly: analysis.assembly,
        status: Analysis.getAnalysisStatus(analysis.status),
      }
    }));

    return {
      ...results,
      data,
      message: 'List all analyses successfully!'
    };
  }

  async findOne(id: number) {
    const analysis = await this.analysisRepository.findOne({ where: { id } });
    if (!analysis) {
      throw new BadRequestException('That analysis could not be found')
    }
    let sample = await this.samplesService.findOne(analysis.sample_id);

    return {
      status: 'success',
      message: 'got analysis successfully!',
      data: {
        ...analysis,
        sampleName: sample.data.name
      }
    };
  }

  async getTotal(user_id: number) {
    const analyses = await this.analysisRepository.find({ where: { user_id: user_id, is_deleted: 0 } });
    return analyses.length;
  }

  async getAnalysesStatistics(user_id: number, lastSixMonthsNumbers: number[]) {
    let data = [];

    const now = new Date();
    let currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    for (let month of lastSixMonthsNumbers) {

      let year = month > currentMonth ? currentYear - 1 : currentYear;

      const results = await this.analysisRepository
        .createQueryBuilder('analysis')
        .where('MONTH(analysis.createdAt) = :month', { month })
        .andWhere('YEAR(analysis.createdAt) = :year', { year })
        .andWhere('analysis.user_id = :user_id', { user_id })
        .getMany();

      data.push(results.length);
    }

    return data;
  }

  async getGeneDetail(getGeneDetailDto: GetGeneDetailDto) {
    try {
      const gene = await this.genesRepository.findOne({ where: { name: getGeneDetailDto.geneName } });

      let geneInfo = {
        synonyms: gene.name,
        full_name: gene ? gene.full_name : "",
        function: gene ? gene.summary : ""
      }

      return {
        status: "success",
        message: "Get gene detail successfully",
        data: geneInfo
      }
    } catch (error) {
      console.log('AnalysisService@getGeneDetail: ', error);

      return { status: "error" }
    }
  }

  async getAnalysesByWorkspaceId(workspace_id: number, user_id: number, page: number, pageSize: number, filterAnalysisDto: FilterAnalysisDto) {
    const filters: any = {
      project_id: workspace_id,
      user_id: user_id,
      is_deleted: 0
    }

    if (filterAnalysisDto.status != '') {
      const statusMap = {
        queuing: [AnalysisStatus.QUEUING, AnalysisStatus.FASTQ_QUEUING],
        analyzing: [AnalysisStatus.ANALYZING, AnalysisStatus.FASTQ_ANALYZING, AnalysisStatus.VEP_ANALYZED, AnalysisStatus.IMPORTING],
        analyzed: [AnalysisStatus.ANALYZED],
        error: [AnalysisStatus.ERROR, AnalysisStatus.FASTQ_ERROR]
      };

      const statuses = statusMap[filterAnalysisDto.status.toLowerCase()];
      if (statuses) {
        filters.status = In(statuses);
      }
    }
    if (filterAnalysisDto.assembly != '') {
      filters.assembly = filterAnalysisDto.assembly
    }
    if (filterAnalysisDto.analysisName != '') {
      filters.name = Like(`%${filterAnalysisDto.analysisName}%`)
    }
    if (filterAnalysisDto.sampleName != '') {
      const temp = await this.samplesService.getSamplesBySampleName(filterAnalysisDto.sampleName);
      filters.sample_id = In(temp);
    }

    const results = await this.paginationProvider.paginate(page, pageSize, this.analysisRepository, filters);

    const data = await Promise.all(results.data.map(async (analysis) => {
      const pipeline_name = await this.pipelinesService.getPipelineNameFromId(analysis.pipeline_id);
      const createdAt = dayjs(analysis.createdAt).format('DD/MM/YYYY');
      const updatedAt = dayjs(analysis.updatedAt).format('DD/MM/YYYY');
      const analyzed = analysis.analyzed ? dayjs(analysis.analyzed).format('DD/MM/YYYY') : '';
      return {
        id: analysis.id,
        name: analysis.name,
        pipeline_name: pipeline_name,
        createdAt: createdAt,
        updatedAt: updatedAt,
        analyzed: analyzed,
        variants: analysis.variants,
        assembly: analysis.assembly,
        status: Analysis.getAnalysisStatus(analysis.status),
      }
    }));

    return {
      ...results,
      data,
      message: 'List all analyses successfully!'
    };
  }

  async deleteAnalysesByWorkspaceId(workspace_id: number) {
    return await this.analysisRepository.update({ project_id: workspace_id }, { is_deleted: 1 });
  }

  async update(id: number, updateAnalysisDto: UpdateAnalysisDto) {
    const analysis = await this.analysisRepository.findOne({ where: { id } });
    if (!analysis) {
      throw new BadRequestException('That analysis could not be found')
    }
    await this.analysisRepository.update({ id }, { ...updateAnalysisDto });

    return {
      status: 'success',
      message: 'Updated successfully!'
    }
  }

  async getQCVCF(id: number) {
    const analysis = await this.analysisRepository.findOne({ where: { id } });
    if (!analysis) {
      throw new BadRequestException('That analysis could not be found')
    }

    let file_path = 'http://s3.amazonaws.com/vcf.files/ExAC.r0.2.sites.vep.vcf.gz'
    let tbi_path = ''
    let genome_build = analysis.assembly == 'hg19' ? 'GRCh37' : 'GRCh38'

    return {
      status: "success",
      message: "Get QC URL successfully",
      data: `${this.configService.get<string>('VCF_IOBIO_HOST')}/?species=Human&build=${genome_build}&vcf=${file_path}&tbi=${tbi_path}`
    }
  }

  async updateVariantsSelected(id: number, arr: VariantToReportDto[]) {
    const analysis = await this.analysisRepository.findOne({ where: { id } });
    if (!analysis) {
      throw new BadRequestException('That analysis could not be found')
    }
    await this.analysisRepository.update({ id }, { variants_to_report: JSON.stringify(arr) });

    return {
      status: 'success',
      message: 'Updated variants selected successfully!'
    }
  }

  async remove(id: number) {
    const analysis = await this.analysisRepository.findOne({ where: { id } });
    if (!analysis) {
      throw new BadRequestException('That analysis could not be found')
    }
    await this.analysisRepository.update({ id }, { is_deleted: 1 });
    return {
      status: 'success',
      message: 'Deleted successfully!'
    };
  }
}
