import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePipelineDto } from './dto/create-pipeline.dto';
import { UpdatePipelineDto } from './dto/update-pipeline.dto';
import { Pipelines } from '@/entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PipelinesService {

  constructor(
    @InjectRepository(Pipelines) private pipelinesRepository: Repository<Pipelines>,
  ) {}

  async create(createPipelineDto: CreatePipelineDto) {
    let pipeline = await this.pipelinesRepository.findOne({
      where: {
        name: createPipelineDto.name
      }
    })
    if (pipeline) {
      throw new BadRequestException("This pipeline name is already existed!")
    }

    let newPipeline = new Pipelines();
    newPipeline.name = createPipelineDto.name;
    newPipeline.version = createPipelineDto.version;
    newPipeline.is_deleted = 0;
    const savedPipeline = await this.pipelinesRepository.save(newPipeline);

    return {
      status: 'success',
      message: 'Created a pipeline successfully!',
      data: savedPipeline
    };
  }

  async findAll() {
    const pipelines = await this.pipelinesRepository.find({
      where: {
        is_deleted: 0
      }
    });
    return {
      status: 'success',
      message: 'load all pipelines successfully!',
      data: pipelines
    };
  }

  async findOne(id: number) {
    let pipeline = await this.pipelinesRepository.findOne({
      where: {
        id: id
      }
    })
    if (!pipeline) {
      throw new BadRequestException("The pipeline could not be found!")
    }
    if (pipeline.is_deleted) {
      throw new BadRequestException("The pipeline is deleted!")
    }

    return {
      status: 'success',
      message: 'Get pipeline successfully!',
      data: pipeline
    };
  }

  async update(id: number, updatePipelineDto: UpdatePipelineDto) {
    const pipeline = await this.pipelinesRepository.findOne({where: {id}});
    if (!pipeline) {
      throw new BadRequestException('That pipeline could not be found')
    }
    await this.pipelinesRepository.update({id}, {...updatePipelineDto});

    return {
      status: 'success',
      message: 'Updated pipeline successfully!'
    }
  }

  async remove(id: number) {
    const pipeline = await this.pipelinesRepository.findOne({where: {id}});
    if (!pipeline) {
      throw new BadRequestException('That pipeline could not be found')
    }
    await this.pipelinesRepository.update({id}, {is_deleted: 1});
    return {
      status: 'success',
      message: 'Deleted pipeline successfully!'
    };
  }

  async getPipelineNameFromId(id: number) {
    const pipelines = await this.pipelinesRepository.findOne({where: {id}});
    return pipelines.name;
  }
}
