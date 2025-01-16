import { AnalysisStatus } from '@/enums';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { AbstractEntity } from './abstract.entity';

@Entity()
export class Analysis extends AbstractEntity{
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

  // static getMongoCollectionName(analysisId: number): {
	// 	return process.env.MONGO_ANALYSIS_PREFIX + analysisId
	// }

  static getAnalysisStatus(status): string {
		switch(status) {
			case AnalysisStatus.QUEUING: 
			case AnalysisStatus.FASTQ_QUEUING: 
				return 'Queuing'
			case AnalysisStatus.ANALYZING:
			case AnalysisStatus.FASTQ_ANALYZING:
			case AnalysisStatus.VEP_ANALYZED:
			case AnalysisStatus.IMPORTING:
				return 'Analyzing'
			case AnalysisStatus.ANALYZED:
				return 'Analyzed'
			case AnalysisStatus.ERROR:
			case AnalysisStatus.FASTQ_ERROR:
				return 'Error';
			default:
				return 'Queuing'
		}
	}
}