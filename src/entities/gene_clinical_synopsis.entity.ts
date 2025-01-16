import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { AbstractEntity } from './abstract.entity';

@Entity()
export class GeneClinicalSynopsis extends AbstractEntity{
  @Column()
  gene_omim: string;

  @Column()
  gene_name: string;

  @Column()
  pheno_omim: string;

  @Column()
  pheno_name: string;

  @Column()
  location: string;
}