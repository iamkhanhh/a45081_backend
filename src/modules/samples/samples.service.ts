import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSampleDto } from './dto/create-sample.dto';
import { UpdateSampleDto } from './dto/update-sample.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Samples } from '@/entities';
import { Repository } from 'typeorm';

@Injectable()
export class SamplesService {

  constructor(
    @InjectRepository(Samples) private samplesRepository: Repository<Samples>,
  ) {}

  create(createSampleDto: CreateSampleDto) {
    return 'This action adds a new sample';
  }

  findAll() {
    return `This action returns all samples`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sample`;
  }

  async getSamplesByPipeLine(id: number) {
    let file_type;
    if (id == 1) {
      file_type = 'fastq'
    } else if (id == 2) {
      file_type = 'vcf'
    } else {
      throw new BadRequestException('There is not a pipeline has that id!')
    }

    const samples = await this.samplesRepository.find({where: {
      file_type
    }})

    return {
      status: 'success',
      message: 'getSamplesByPipeLine successfully!',
      data: samples
    }
  }

  update(id: number, updateSampleDto: UpdateSampleDto) {
    return `This action updates a #${id} sample`;
  }

  remove(id: number) {
    return `This action removes a #${id} sample`;
  }
}
