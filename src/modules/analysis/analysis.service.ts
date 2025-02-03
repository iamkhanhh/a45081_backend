import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAnalysisDto } from './dto/create-analysis.dto';
import { UpdateAnalysisDto } from './dto/update-analysis.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Analysis } from '@/entities';
import { Repository } from 'typeorm';
import * as dayjs from 'dayjs'
import { PipelinesService } from '../pipelines/pipelines.service';
import { PaginationProvider } from '@/common/providers/pagination.provider';
import { AnalysisStatus } from '@/enums';
import { UploadsService } from '../uploads/uploads.service';
import { ConfigService } from '@nestjs/config';
import { S3Provider } from '@/common/providers/s3.provider';

@Injectable()
export class AnalysisService {

  constructor(
    @InjectRepository(Analysis) private analysisRepository: Repository<Analysis>,
    private readonly pipelinesService: PipelinesService,
    private readonly paginationProvider: PaginationProvider,
    private readonly uploadsService: UploadsService,
    private readonly configService: ConfigService,
    private readonly s3Provider: S3Provider
  ) {}

  async create(createAnalysisDto: CreateAnalysisDto, user_id: number) {
    console.log(createAnalysisDto);
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
    let igv_local_path = `user_files/${user_id}/${result.id}`;
    const data_saved = await this.analysisRepository.update({id: result.id}, { igv_local_path, upload_id: uploads[0].id });

    for (let e of uploads) {
      let destination = `${this.configService.get<string>('ANALYSIS_FOLDER')}/${result.user_id}/${result.id}/${e.upload_name}`
      let source = `${this.configService.get<string>('AWS_BUCKET')}/${this.configService.get<string>('UPLOAD_FOLDER')}/${e.file_path}`

      await this.s3Provider.copyObject(source, destination);
    }

    return {
      status: 'success',
      message: 'Create analysis successfully'
    };
  }

  findAll() {
    return `This action returns all analysis`;
  }

  findOne(id: number) {
    return `This action returns a #${id} analysis`;
  }

  async getAnalysesByWorkspaceId(workspace_id: number, user_id: number, page: number, pageSize: number) {
    const filters = {
      project_id: workspace_id,
      user_id: user_id, 
      is_deleted: 0 
    }

    const results = await this.paginationProvider.paginate(page, pageSize, this.analysisRepository, filters);

    const data = await Promise.all(results.data.map(async (analysis) => {
      const pipeline_name = await this.pipelinesService.getPipelineNameFromId(analysis.pipeline_id);
      const createdAt = dayjs(analysis.createdAt).format('DD/MM/YYYY');
      const updatedAt = dayjs(analysis.updatedAt).format('DD/MM/YYYY');
      return {
        id: analysis.id,
        name: analysis.name,
        pipeline_name: pipeline_name,
        createdAt: createdAt,
        updatedAt: updatedAt,
        analyzed: analysis.analyzed,
        variants: analysis.variants,
        size: analysis.size,
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
    return await this.analysisRepository.update({project_id: workspace_id}, {is_deleted: 1});
  }

  update(id: number, updateAnalysisDto: UpdateAnalysisDto) {
    return `This action updates a #${id} analysis`;
  }

  async remove(id: number) {
    const analysis = await this.analysisRepository.findOne({where: {id}});
    if (!analysis) {
      throw new BadRequestException('That analysis could not be found')
    }
    await this.analysisRepository.update({id}, {is_deleted: 1});
    return {
      status: 'success',
      message: 'Deleted successfully!'
    };
  }
}
