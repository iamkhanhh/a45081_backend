import { Controller, Get, Post, Body, Param, Request } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Public } from '@/decorators';
import { Webhook } from '@payos/node';

@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
	constructor(private readonly paymentsService: PaymentsService) {}

	@Post()
	@ApiOperation({
		summary: 'Create a payment order',
		description: 'Create a payment order and return QR code + checkout URL',
	})
	@ApiResponse({
		status: 201,
		description: 'Order created successfully, returns qrCode and checkoutUrl',
	})
	@ApiResponse({ status: 404, description: 'Plan not found' })
	create(@Body() createPaymentDto: CreatePaymentDto, @Request() req) {
		return this.paymentsService.create(req.user.id, createPaymentDto);
	}

	@Public()
	@Post('webhook')
	@ApiOperation({
		summary: 'Receive webhook from PayOS',
		description: 'PayOS calls this endpoint after a transaction is completed.',
	})
	@ApiResponse({ status: 200, description: 'Webhook processed successfully' })
	@ApiResponse({ status: 400, description: 'Invalid webhook signature' })
	handleWebhook(@Body() webhookBody: Webhook) {
		return this.paymentsService.handleWebhook(webhookBody);
	}

	@Get('status/:orderCode')
	@ApiOperation({
		summary: 'Check order status',
		description: 'Used for polling after displaying QR code',
	})
	@ApiParam({
		name: 'orderCode',
		example: 1743200000000123,
		description: 'Order code',
	})
	@ApiResponse({ status: 200, description: 'Returns order information' })
	@ApiResponse({ status: 404, description: 'Order not found' })
	getOrderStatus(@Param('orderCode') orderCode: string) {
		return this.paymentsService.getOrderStatus(+orderCode);
	}

	@Get('subscription')
	@ApiOperation({ summary: 'Get current user subscription' })
	@ApiResponse({
		status: 200,
		description: 'Returns active subscription, null if none exists',
	})
	getUserSubscription(@Request() req) {
		return this.paymentsService.getUserSubscription(req.user.id);
	}

	@Public()
	@Get('plans')
	@ApiOperation({
		summary: 'Get all subscription plans',
		description:
			'Returns active plans sorted by price ascending. No JWT required.',
	})
	@ApiResponse({ status: 200, description: 'List of subscription plans' })
	getAllPlans() {
		return this.paymentsService.getAllPlans();
	}

	@Get('')
	@ApiOperation({
		summary: 'Get all payment methods',
		description: 'Returns all payment methods for the user. No JWT required.',
	})
	@ApiResponse({ status: 200, description: 'List of payment methods' })
	getAllPaymentMethods(@Request() req) {
		return this.paymentsService.getAllPaymentMethods(req.user.id);
	}
}
