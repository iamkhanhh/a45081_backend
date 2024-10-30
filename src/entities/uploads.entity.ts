import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Uploads {
  @PrimaryGeneratedColumn()
  id: number;

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

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updatedAt: Date;
}