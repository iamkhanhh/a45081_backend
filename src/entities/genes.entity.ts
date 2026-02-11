import { Entity, Column } from 'typeorm';
import { AbstractEntity } from './abstract.entity';

@Entity()
export class Genes extends AbstractEntity {
    @Column()
    name: string;

    @Column()
    summary: string;

    @Column()
    full_name: string;
}