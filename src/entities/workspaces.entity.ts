import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { AbstractEntity } from './abstract.entity';

@Entity()
export class Workspaces extends AbstractEntity {
  @Column()
  name: string;

  @Column()
  user_created_id: number;

  @Column()
  number: number;

  @Column()
  pipeline: number;

  @Column({ type: 'text'})
  dashboard: string;

  @Column({default: 0})
  is_deleted: number;
}