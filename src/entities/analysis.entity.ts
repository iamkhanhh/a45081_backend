import { AnalysisStatus } from '@/enums';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { AbstractEntity } from './abstract.entity';

@Entity()
export class Analysis extends AbstractEntity{
  @Column()
  name: string;

  @Column()
  user_id: number;

  @Column({
    nullable: true
  })
  data_type: string;

  @Column({
    nullable: true
  })
  control: string;

  @Column({
    nullable: true
  })
  genotype: string;

  @Column({
    nullable: true
  })
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
  description: string;

  @Column({default: 0})
  is_deleted: number;

  @Column({ nullable: true})
  pipeline_id: number;

  @Column()
  upload_id: number;

  @Column()
  assembly: string;

  static getAnalysisStatus(status): string {
		switch(status) {
			case AnalysisStatus.QUEUING: 
        return 'VCF Queuing'
			case AnalysisStatus.FASTQ_QUEUING: 
				return 'FASTQ Queuing'
      case AnalysisStatus.FASTQ_ANALYZING:
        return 'FASTQ Analyzing'
			case AnalysisStatus.ANALYZING:
			case AnalysisStatus.VEP_ANALYZED:
			case AnalysisStatus.IMPORTING:
				return 'VCF Analyzing'
			case AnalysisStatus.ANALYZED:
				return 'Analyzed'
			case AnalysisStatus.ERROR:
			case AnalysisStatus.FASTQ_ERROR:
				return 'Error';
			default:
				return 'Error'
		}
	}
}