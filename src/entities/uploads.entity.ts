import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { UploadStatus } from '@/enums/uploads.enum';

@Entity()
export class Uploads extends AbstractEntity{
  @Column()
  original_name: string;

  @Column()
  file_size: number;

  @Column()
  file_type: string;

  @Column()
  upload_name: string;

  @Column()
  is_deleted: number;

  @Column()
  file_path: string;

  @Column()
  user_created: number;

  @Column()
  sample_id: number;

  @Column({
    nullable: true
  })
  fastq_pair_index: number;

  @Column()
  upload_status: number;

  static getUploadStatus(status: number): string {
    switch (status) {
      case UploadStatus.UPLOADING:
        return 'Uploading';
      case UploadStatus.COMPLETED:
        return 'Completed';
      case UploadStatus.ERROR:
        return 'Error';
      default:
        return 'N/A'
    }
  }
}