import { Entity, Column } from 'typeorm';
import { AbstractEntity } from './abstract.entity';

@Entity('PGx')
export class PGx extends AbstractEntity {
	@Column()
	rsid: string;

	@Column()
	gene: string;

	@Column()
	evidence: string;

	@Column()
	clinical_annotation_types: string;

	@Column()
	related_chemicals: string;

	@Column()
	drug_response_category: string;

	@Column()
	related_diseases: string;

	@Column()
	annotation_text: string;
}
