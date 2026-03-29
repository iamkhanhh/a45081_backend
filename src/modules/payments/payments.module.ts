import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionPlan, UserSubscription, PaymentOrder } from '@/entities';
import { PaymentsController } from './payments.controller';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			PaymentOrder,
			SubscriptionPlan,
			UserSubscription,
		]),
	],
	controllers: [PaymentsController],
	providers: [PaymentsService],
})
export class PaymentsModule {}
