import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { Users } from './users.entity';
import { SubscriptionPlan } from './subscription-plan.entity';
import { PaymentStatus } from '@/enums/payment.enum';

@Entity('payment_orders')
export class PaymentOrder extends AbstractEntity {
	@Column({ unique: true, type: 'bigint', name: 'order_code' })
	orderCode: number;

	@ManyToOne(() => Users)
	@JoinColumn({ name: 'user_id' })
	user: Users;

	@ManyToOne(() => SubscriptionPlan)
	@JoinColumn({ name: 'plan_id' })
	plan: SubscriptionPlan;

	@Column()
	amount: number;

	@Column({ nullable: true })
	description: string;

	@Column({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.PENDING })
	status: PaymentStatus;

	@Column({ nullable: true, name: 'checkout_url' })
	checkoutUrl: string;

	@Column({ nullable: true, name: 'payment_link_id' })
	paymentLinkId: string;

	@Column({ nullable: true, name: 'paid_at' })
	paidAt: Date;
}
