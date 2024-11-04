import { Injectable } from '@nestjs/common';
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

  create(createPipelineDto: CreatePipelineDto) {
    return 'This action adds a new pipeline';
  }

  async findAll() {
    const pipelines = await this.pipelinesRepository.find({});
    return {
      status: 'success',
      message: 'load all pipelines successfully!',
      data: pipelines
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} pipeline`;
  }

  update(id: number, updatePipelineDto: UpdatePipelineDto) {
    return `This action updates a #${id} pipeline`;
  }

  remove(id: number) {
    return `This action removes a #${id} pipeline`;
  }

  async getPipelineNameFromId(id: number) {
    const pipelines = await this.pipelinesRepository.findOne({where: {id}});
    return pipelines.name;
  }
}
