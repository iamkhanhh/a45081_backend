import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Samples, Workspaces, Analysis } from '@/entities';
import { GlobalSearchDto } from './dto/global-search.dto';
import { PipelinesService } from '../pipelines/pipelines.service';
import * as dayjs from 'dayjs';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(Samples) private samplesRepository: Repository<Samples>,
    @InjectRepository(Workspaces)
    private workspacesRepository: Repository<Workspaces>,
    @InjectRepository(Analysis)
    private analysisRepository: Repository<Analysis>,
    private readonly pipelinesService: PipelinesService,
  ) {}

  async globalSearch(
    user_id: number,
    globalSearchDto: GlobalSearchDto,
  ): Promise<any> {
    const searchTerm = globalSearchDto.searchTerm || '';
    const [samples, workspaces, analysis] = await Promise.all([
      this.searchSamples(user_id, searchTerm),
      this.searchWorkspaces(user_id, searchTerm),
      this.searchAnalysis(user_id, searchTerm),
    ]);

    return {
      status: 'success',
      message: 'Global search completed',
      data: {
        samples: {
          count: samples.length,
          items: samples,
        },
        workspaces: {
          count: workspaces.length,
          items: workspaces,
        },
        analysis: {
          count: analysis.length,
          items: analysis,
        },
      },
      total: samples.length + workspaces.length + analysis.length,
      searchTerm,
    };
  }

  private async searchSamples(
    user_id: number,
    searchTerm: string,
  ): Promise<any[]> {
    try {
      const samples = await this.samplesRepository.find({
        where: {
          user_id,
          name: Like(`%${searchTerm}%`),
        },
      });

      return samples.map((sample) => ({
        id: sample.id,
        name: sample.name,
        type: 'sample',
        fileType: sample.file_type,
        assembly: sample.assembly,
        size: sample.file_size,
        status: Samples.getSampleStatus(sample.complete_status),
        createdAt: dayjs(sample.createdAt).format('DD/MM/YYYY'),
      }));
    } catch (error) {
      console.error('Error searching samples:', error);
      return [];
    }
  }

  private async searchWorkspaces(
    user_id: number,
    searchTerm: string,
  ): Promise<any[]> {
    try {
      const workspaces = await this.workspacesRepository.find({
        where: {
          user_created_id: user_id,
          is_deleted: 0,
          name: Like(`%${searchTerm}%`),
        },
      });

      const result = await Promise.all(
        workspaces.map(async (workspace) => {
          const pipelineName =
            await this.pipelinesService.getPipelineNameFromId(
              workspace.pipeline,
            );

          return {
            id: workspace.id,
            name: workspace.name,
            type: 'workspace',
            number: workspace.number,
            pipelineId: workspace.pipeline,
            pipelineName: pipelineName || 'Unknown',
            createdAt: dayjs(workspace.createdAt).format('DD/MM/YYYY'),
            updatedAt: dayjs(workspace.updatedAt).format('DD/MM/YYYY'),
          };
        }),
      );

      return result;
    } catch (error) {
      console.error('Error searching workspaces:', error);
      return [];
    }
  }

  private async searchAnalysis(
    user_id: number,
    searchTerm: string,
  ): Promise<any[]> {
    try {
      const analysisList = await this.analysisRepository.find({
        where: {
          user_id,
          is_deleted: 0,
          name: Like(`%${searchTerm}%`),
        },
      });

      return analysisList.map((analysis) => ({
        id: analysis.id,
        name: analysis.name,
        type: 'analysis',
        assembly: analysis.assembly,
        status: Analysis.getAnalysisStatus(analysis.status),
        variants: analysis.variants,
        sequencingType: analysis.sequencing_type,
        sampleId: analysis.sample_id,
        projectId: analysis.project_id,
        pipelineId: analysis.pipeline_id,
        createdAt: dayjs(analysis.createdAt).format('DD/MM/YYYY'),
        analyzed: analysis.analyzed
          ? dayjs(analysis.analyzed).format('DD/MM/YYYY')
          : null,
      }));
    } catch (error) {
      console.error('Error searching analysis:', error);
      return [];
    }
  }
}
