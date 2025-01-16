import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { AbstractEntity } from './abstract.entity';

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

  @Column()
  fastq_pair_index: number;

  @Column()
  upload_status: number;

  static getUploadStatus(status: number): string {
		switch (status) {
			case 0:
				return 'Uploading';
			case 1:
				return 'Completed';
			case 2:
				return 'Error';
			default:
				return 'N/A'
		}
	}
}