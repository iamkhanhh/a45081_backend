import { Column, Entity } from 'typeorm';
import { AbstractEntity } from './abstract.entity';

@Entity()
export class Report extends AbstractEntity {
	@Column()
	report_name: string;

	@Column()
	analysis_id: number;

	@Column()
	user_created: number;

	@Column({ nullable: true })
	file_path: string;

	@Column({ default: 0 })
	is_deleted: number;
}
