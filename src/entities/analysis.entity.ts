import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum AnalysisStatus {
  QUEUING = 0,
  ANALYZING = 1, 
  ANALYZED = 2,
  ERROR = 3,
  VEP_ANALYZED = 4,
  IMPORTING = 5,
  FASTQ_QUEUING = 6,
  FASTQ_ANALYZING = 7,
  FASTQ_ERROR = 8,
}
@Entity()
export class Analysis {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  user_id: number;

  @Column()
  data_type: string;

  @Column()
  control: string;

  @Column()
  genotype: string;

  @Column()
  igv_local_path: string;

  @Column()
  sample_id: number;

  @Column()
  project_id: number;

  @Column()
  p_type: string;

  @Column({ type: 'datetime', nullable: true })
  analyzed: Date;

  @Column()
  variants: number;

  @Column()
  size: number;

  @Column()
  status: number;

  @Column({ type: 'text'})
  variants_to_report: string;

  @Column()
  file_path: string;

  @Column({ type: 'text'})
  description: number;

  @Column({default: 0})
  is_deleted: number;

  @Column({ nullable: true})
  pipeline_id: number;

  @Column()
  upload_id: number;

  @Column()
  assembly: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updatedAt: Date;

  // static getMongoCollectionName(analysisId: number): {
	// 	return process.env.MONGO_ANALYSIS_PREFIX + analysisId
	// }
}