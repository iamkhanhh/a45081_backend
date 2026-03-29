import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive } from 'class-validator';

export class CreatePaymentDto {
	@ApiProperty({
		example: 1,
		description: 'ID của plan trong bảng subscription_plans',
	})
	@IsNumber()
	@IsPositive()
	planId: number;
}
