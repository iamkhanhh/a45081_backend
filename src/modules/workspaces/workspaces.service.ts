import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { Workspaces } from '@/entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PipelinesService } from '../pipelines/pipelines.service';
import * as dayjs from 'dayjs'

@Injectable()
export class WorkspacesService {

  constructor(
    @InjectRepository(Workspaces) private workspacesRepository: Repository<Workspaces>,
    private pipelinesService: PipelinesService,
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

  async findAll(id: number, page: number = 1, pageSize: number = 10) {

    page = Math.max(1, page);
    pageSize = Math.max(1, pageSize);

    const offset = (page - 1) * pageSize;
    const pageBegin = offset + 1;
    const pageEnd = pageBegin + pageSize - 1;

    const totalItems = await this.workspacesRepository.count({
      where: { user_created_id: id, is_deleted: 0 }
    });
    const totalPages = Math.ceil(totalItems / pageSize);

    const workspaces = await this.workspacesRepository.find({
      where: { user_created_id: id, is_deleted: 0 },
      skip: offset,
      take: pageSize,
      order: {
        createdAt: 'desc'
      }
    });

    const data = await Promise.all(workspaces.map(async (workspace) => {
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
      status: 'success',
      message: 'List all workspaces',
      data,
      totalItems: totalItems,
      totalPages: totalPages,
      pageBegin,
      pageEnd
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
    return {
      status: 'success',
      message: 'Deleted successfully!'
    };
  }
}
