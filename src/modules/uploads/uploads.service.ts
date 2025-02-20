import { Injectable } from '@nestjs/common';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { Uploads } from '@/entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUploadForSample } from './dto/create-upload-for-sample.dto';

@Injectable()
export class UploadsService {

  constructor(
    @InjectRepository(Uploads) private uploadsRepository: Repository<Uploads>,
  ) { }

  create(createUploadDto: CreateUploadDto) {
    return 'This action adds a new upload';
  }

  findAll() {
    return `This action returns all uploads`;
  }

  findOne(id: number) {
    return `This action returns a #${id} upload`;
  }

  update(id: number, updateUploadDto: UpdateUploadDto) {
    return `This action updates a #${id} upload`;
  }

  remove(id: number) {
    return `This action removes a #${id} upload`;
  }

  async findUploadsBySampleId(sample_id: number) {
    return await this.uploadsRepository.find({
      where: {
        sample_id
      }
    })
  }

  async updateSampleId(upload_id: number, sample_id: number) {
    return await this.uploadsRepository.update({id: upload_id}, {sample_id})
  }

  async createUploadForSample(createUploadForSample: CreateUploadForSample) {
    let new_upload = new Uploads();

    new_upload.original_name = createUploadForSample.original_name;
    new_upload.file_size = createUploadForSample.file_size;
    new_upload.file_type = createUploadForSample.file_type;
    new_upload.upload_name = createUploadForSample.upload_name;
    new_upload.user_created = createUploadForSample.user_created;
    new_upload.file_path = createUploadForSample.file_path
    new_upload.is_deleted = 0;
    new_upload.upload_status = createUploadForSample.upload_status;

    return await this.uploadsRepository.save(new_upload);
  }
}
