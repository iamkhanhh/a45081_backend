import { Column, Entity } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { PlanType } from '@/enums/payment.enum';

@Entity('subscription_plans')
export class SubscriptionPlan extends AbstractEntity {
	@Column({ type: 'enum', enum: PlanType, unique: true, name: 'plan_type' })
	planType: PlanType;

	@Column()
	name: string;

	@Column()
	price: number;

	@Column({ default: 30 })
	duration: number;

	@Column({ default: 10, name: 'daily_upload_limit' })
	dailyUploadLimit: number;

	@Column({ default: 10, name: 'daily_analysis_limit' })
	dailyAnalysisLimit: number;

	@Column({ type: 'json', nullable: true })
	features: string[];

	@Column({ default: true, name: 'is_active' })
	isActive: boolean;
}
