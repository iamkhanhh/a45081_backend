import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { Workspaces } from '@/entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PipelinesService } from '../pipelines/pipelines.service';

@Injectable()
export class WorkspacesService {

  constructor(
    @InjectRepository(Workspaces) private workspacesRepository: Repository<Workspaces>,
    private pipelinesService: PipelinesService
  ) {}

  async create(createWorkspaceDto: CreateWorkspaceDto, id: number) {
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
      data: savedWorkspace
    };
  }

  async findAll(id) {
    const workspaces = await this.workspacesRepository.find({where: {user_created_id: id}});


    return {
      status: 'success',
      message: 'List all workspaces',
      data: workspaces
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
      message: 'That workspace has been deleted!'
    };
  }
}
