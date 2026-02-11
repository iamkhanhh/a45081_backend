import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { AbstractEntity } from './abstract.entity';

@Entity()
export class PatientsInformation extends AbstractEntity{
  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  dob: Date;

  @Column({ type: 'text'})
  phenotype: string;

  @Column()
  sample_id: number;

  @Column()
  gender: string;

  @Column()
  ethnicity: string;

  @Column()
  sample_type: string;
}