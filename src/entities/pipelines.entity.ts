import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { AbstractEntity } from './abstract.entity';

@Entity()
export class Pipelines extends AbstractEntity{
  @Column()
  name: string;

  @Column()
  version: string;
}