import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAnalysisDto } from './dto/create-analysis.dto';
import { UpdateAnalysisDto } from './dto/update-analysis.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Analysis } from '@/entities';
import { Repository } from 'typeorm';
import * as dayjs from 'dayjs'
import { PipelinesService } from '../pipelines/pipelines.service';

@Injectable()
export class AnalysisService {

  constructor(
    @InjectRepository(Analysis) private analysisRepository: Repository<Analysis>,
    private pipelinesService: PipelinesService,
  ) {}

  create(createAnalysisDto: CreateAnalysisDto) {
    return 'This action adds a new analysis';
  }

  findAll() {
    return `This action returns all analysis`;
  }

  findOne(id: number) {
    return `This action returns a #${id} analysis`;
  }

  async getAnalysesByWorkspaceId(workspace_id: number, user_id: number, page: number = 1, pageSize: number = 10) {
    page = Math.max(1, page);
    pageSize = Math.max(1, pageSize);

    const offset = (page - 1) * pageSize;
    const pageBegin = offset + 1;
    const pageEnd = pageBegin + pageSize - 1;

    const totalItems = await this.analysisRepository.count({
      where: { 
        project_id: workspace_id,
        user_id: user_id, 
        is_deleted: 0 
      }
    });
    const totalPages = Math.ceil(totalItems / pageSize);

    const analyses = await this.analysisRepository.find({
      where: { 
        project_id: workspace_id,
        user_id: user_id, 
        is_deleted: 0 
      },
      skip: offset,
      take: pageSize,
    });

    const data = await Promise.all(analyses.map(async (analysis) => {
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
      status: 'success',
      message: 'List all analyses',
      data,
      totalItems: totalItems,
      totalPages: totalPages,
      pageBegin,
      pageEnd
    };
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
