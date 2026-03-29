import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { Users } from './users.entity';
import { SubscriptionPlan } from './subscription-plan.entity';
import { PaymentOrder } from './payment-order.entity';

@Entity('user_subscriptions')
export class UserSubscription extends AbstractEntity {
	@OneToOne(() => Users)
	@JoinColumn({ name: 'user_id' })
	user: Users;

	@ManyToOne(() => SubscriptionPlan)
	@JoinColumn({ name: 'plan_id' })
	plan: SubscriptionPlan;

	@ManyToOne(() => PaymentOrder)
	@JoinColumn({ name: 'order_id' })
	order: PaymentOrder;

	@Column({ name: 'start_date' })
	startDate: Date;

	@Column({ name: 'end_date' })
	endDate: Date;

	@Column({ default: true, name: 'is_active' })
	isActive: boolean;
}
