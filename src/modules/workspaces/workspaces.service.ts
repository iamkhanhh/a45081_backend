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

  async findAll(id) {
    const workspaces = await this.workspacesRepository.find({where: {
      user_created_id: id,
      is_deleted: 0
    }});

    const data = await Promise.all(workspaces.map(async (workspace) => {
      const pipeline_name = await this.pipelinesService.getPipelineNameFromId(workspace.pipeline);
      const formatted_date = dayjs(workspace.createdAt).format('DD/MM/YYYY');
      return {
        id: workspace.id,
        name: workspace.name,
        number: workspace.number,
        createdAt: formatted_date,
        pipeline_name: pipeline_name
      }
    }));

    return {
      status: 'success',
      message: 'List all workspaces',
      data
    };
  }

  index(id: number) {

    return `This action returns a #${id} workspace`;
  }

  update(id: number, updateWorkspaceDto: UpdateWorkspaceDto) {
    return `This action updates a #${id} workspace`;
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
