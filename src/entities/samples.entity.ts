import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { AbstractEntity } from './abstract.entity';

@Entity()
export class Samples extends AbstractEntity{
  @Column()
  name: string;

  @Column()
  user_id: number;

  @Column({
    nullable: true
  })
  data_type: number;

  @Column({
    nullable: true
  })
  control: string;

  @Column({
    nullable: true
  })
  genotype: string;

  @Column()
  file_size: number;

  @Column()
  file_type: string;

  @Column()
  complete_status: number;

  @Column()
  assembly: string;

  static getSampleStatus(status: number): string {
		switch (status) {
			case 0:
				return 'Incomplete'
			case 1:
				return 'Completed'
			default:
				return 'N/A'
		}
  }
}