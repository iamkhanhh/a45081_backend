import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { Workspaces } from '@/entities';
import { Like, Raw, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PipelinesService } from '../pipelines/pipelines.service';
import * as dayjs from 'dayjs'
import { PaginationProvider } from '@/common/providers/pagination.provider';
import { FilterWorkspacesDto } from './dto/filter-workspaces.dto';
import { DeleteMultipleWorkspacesDto } from './dto/delete-multiple-workspaces.dto';
import { AnalysisService } from '../analysis/analysis.service';

@Injectable()
export class WorkspacesService {

  constructor(
    @InjectRepository(Workspaces) private workspacesRepository: Repository<Workspaces>,
    private readonly pipelinesService: PipelinesService,
    @Inject(forwardRef(() => AnalysisService))
    private readonly analysisService: AnalysisService,
    private readonly paginationProvider: PaginationProvider
  ) {}

  async create(createWorkspaceDto: CreateWorkspaceDto, id: number) {
    const existed_workspace = await this.workspacesRepository.findOne({where: {name: createWorkspaceDto.name}});
    if (existed_workspace) {
      throw new BadRequestException('Your workspace name is already existed!');
    }

    const newWorkspace = new Workspaces();
    newWorkspace.dashboard = createWorkspaceDto.dashboard;
    newWorkspace.name = createWorkspaceDto.name;
    newWorkspace.pipeline = createWorkspaceDto.pipeline;
    newWorkspace.is_deleted = 0;
    newWorkspace.user_created_id = id;
    newWorkspace.number = 0;
    const savedWorkspace = await this.workspacesRepository.save(newWorkspace);

    return {
      status: 'success',
      message: 'Created workspace successfully !',
      data: savedWorkspace
    };
  }

  async findAll(id: number, page: number, pageSize: number, filterWorkspacesDto: FilterWorkspacesDto) {
    const filters: any = {
      user_created_id: id, 
      is_deleted: 0
    }

    if (filterWorkspacesDto.searchDate != '') {
      filters.createdAt = Raw((alias) => `${alias} > :date`, { date: filterWorkspacesDto.searchDate})
    }

    if (filterWorkspacesDto.searchTerm != '') {
      filters.name = Like(`%${filterWorkspacesDto.searchTerm}%`)
    }

    const results = await this.paginationProvider.paginate<Workspaces>(page, pageSize, this.workspacesRepository, filters);

    const data = await Promise.all(results.data.map(async (workspace) => {
      const pipeline_name = await this.pipelinesService.getPipelineNameFromId(workspace.pipeline);
      const formatted_date = dayjs(workspace.createdAt).format('DD/MM/YYYY');
      const updatedAt = dayjs(workspace.updatedAt).format('DD/MM/YYYY');
      return {
        id: workspace.id,
        name: workspace.name,
        number: workspace.number,
        createdAt: formatted_date,
        pipeline_name: pipeline_name,
        updatedAt
      }
    }));

    return {
      ...results,
      data,
      message: 'List all workspaces successfully!'
    };
  }

  async index(id: number) {
    const workspace = await this.workspacesRepository.findOne({where: {id}});
    if (!workspace) {
      throw new BadRequestException('That workspace could not be found')
    }
    return {
      status: 'success',
      message: 'got workspace successfully!',
      data: workspace
    };
  }

  async getWorkspaceName(id: number) {
    const workspace = await this.workspacesRepository.findOne({where: {id}});
    if (!workspace) {
      throw new BadRequestException('That workspace could not be found')
    }
    return {
      status: 'success',
      message: 'getWorkspaceName successfully!',
      data: workspace.name
    };
  }

  async update(id: number, updateWorkspaceDto: UpdateWorkspaceDto) {
    const workspace = await this.workspacesRepository.findOne({where: {id}});
    if (!workspace) {
      throw new BadRequestException('That workspace could not be found')
    }
    await this.workspacesRepository.update({id}, {...updateWorkspaceDto});

    return {
      status: 'success',
      message: 'Updated successfully!'
    }
  }

  async remove(id: number) {
    const workspace = await this.workspacesRepository.findOne({where: {id}});
    if (!workspace) {
      throw new BadRequestException('That workspace could not be found')
    }
    await this.workspacesRepository.update({id}, {is_deleted: 1});
    await this.analysisService.deleteAnalysesByWorkspaceId(id);
    return {
      status: 'success',
      message: 'Deleted successfully!'
    };
  }

  async deleteMultipleWorkspaces(deleteMultipleWorkspacesDto: DeleteMultipleWorkspacesDto) {
    for (let workspace_id of deleteMultipleWorkspacesDto.ids) {
      await this.remove(workspace_id);
    }
    return {
      status: 'success',
      message: 'Delete multiple workspaces successfully!'
    }
  }
}
