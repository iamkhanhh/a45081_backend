import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class GeneClinicalSynopsis {
  @PrimaryGeneratedColumn()
  id: number;

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

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updatedAt: Date;
}