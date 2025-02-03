import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSampleDto } from './dto/create-sample.dto';
import { UpdateSampleDto } from './dto/update-sample.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Samples } from '@/entities';
import { Like, Repository } from 'typeorm';
import { PaginationProvider } from '@/common/providers/pagination.provider';
import * as dayjs from 'dayjs'
import { FilterSampleDto } from './dto/filter-sample.dto';

@Injectable()
export class SamplesService {

  constructor(
    @InjectRepository(Samples) private samplesRepository: Repository<Samples>,
    private readonly paginationProvider: PaginationProvider
  ) { }

  create(createSampleDto: CreateSampleDto) {
    return 'This action adds a new sample';
  }

  async findAll(id: number, page: number, pageSize: number, filterSampleDto: FilterSampleDto) {
    const filters: any = {
      user_id: id
    }

    if (filterSampleDto.type != '') {
      filters.file_type = filterSampleDto.type
    }
    if (filterSampleDto.assembly != '') {
      filters.assembly = filterSampleDto.assembly
    }
    if (filterSampleDto.searchTerm != '') {
      filters.name = Like(`%${filterSampleDto.searchTerm}%`)
    }

    const results = await this.paginationProvider.paginate<Samples>(page, pageSize, this.samplesRepository, filters);

    const data = await Promise.all(results.data.map(async (sample) => {
      const formatted_date = dayjs(sample.createdAt).format('DD/MM/YYYY');
      const sample_status = Samples.getSampleStatus(sample.complete_status);
      return {
        id: sample.id,
        name: sample.name,
        createdAt: formatted_date,
        type: sample.file_type,
        status: sample_status,
        size: sample.file_size,
        assembly: sample.assembly
      }
    }));

    return {
      ...results,
      data,
      message: 'List all workspaces successfully!'
    };
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

    const samples = await this.samplesRepository.find({
      where: {
        file_type
      }
    })

    return {
      status: 'success',
      message: 'getSamplesByPipeLine successfully!',
      data: samples
    }
  }

  async getSamplesBySampleName(sampleName: string) {
    const samples = await this.samplesRepository.find({
      where: {
        name: Like(`%${sampleName}%`)
      }
    })

    return samples.map(sample => sample.id);
  }

  update(id: number, updateSampleDto: UpdateSampleDto) {
    return `This action updates a #${id} sample`;
  }

  remove(id: number) {
    return `This action removes a #${id} sample`;
  }
}
