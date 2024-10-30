import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Samples {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  user_id: number;

  @Column()
  data_type: number;

  @Column()
  control: string;

  @Column()
  genotype: string;

  @Column()
  file_size: number;

  @Column()
  file_type: string;

  @Column()
  complete_status: number;

  @Column()
  assembly: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updatedAt: Date;

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