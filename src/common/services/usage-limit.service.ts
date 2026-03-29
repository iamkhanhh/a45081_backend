import { UserSubscription } from '@/entities/user-subscription.entity';
import { PLAN_LIMITS, PlanLimits, PlanTier } from '@/enums/payment.enum';
import { REDIS_CLIENT } from '@/redis/redis.module';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { REDIS_KEYS, REDIS_TTL } from '@/redis/redis.key';
import Redis from 'ioredis';
import { Repository } from 'typeorm';

@Injectable()
export class UsageLimitService {
	constructor(
		@Inject(REDIS_CLIENT) private redis: Redis,
		@InjectRepository(UserSubscription)
		private usersubscriptionRepo: Repository<UserSubscription>,
	) {}

	async getUserPlanLimits(
		id: number,
	): Promise<{ status: string; message: string; data: PlanLimits }> {
		const cacheKey = REDIS_KEYS.userPlan(id);
		const cached = await this.redis.get(cacheKey);
		if (cached)
			return {
				status: 'success',
				message: 'Get User Plan Limit Success',
				data: JSON.parse(cached) as PlanLimits,
			};

		const subscription = await this.usersubscriptionRepo.findOne({
			where: {
				user: { id: id },
				isActive: true,
			},
			relations: ['plan'],
		});

		let tier = PlanTier.BASIC;
		if (subscription && subscription.endDate > new Date()) {
			tier = subscription.plan.planType as unknown as PlanTier;
		}

		const limits = PLAN_LIMITS[tier];
		await this.redis.setex(
			cacheKey,
			REDIS_TTL.USER_PLAN,
			JSON.stringify(limits),
		);

		return {
			status: 'success',
			message: 'Get User Plan Limit Success',
			data: limits,
		};
	}

	async invalidatePlanCache(id: number): Promise<void> {
		await this.redis.del(REDIS_KEYS.userPlan(id));
	}

	async getDailyUsage(
		id: number,
		action: 'upload' | 'analysis',
	): Promise<{ status: string; message: string; data: number }> {
		const today = new Date().toISOString().split('T')[0];
		const key =
			action === 'upload'
				? REDIS_KEYS.dailyUpload(id, today)
				: REDIS_KEYS.dailyAnalysis(id, today);
		const val = await this.redis.get(key);
		return {
			status: 'success',
			message: 'Get Daily Usage Success',
			data: val ? parseInt(val, 10) : 0,
		};
	}

	async incrementDailyUsage(
		id: number,
		action: 'upload' | 'analysis',
	): Promise<{ status: string; message: string; data: number }> {
		const today = new Date().toISOString().split('T')[0];
		const key =
			action === 'upload'
				? REDIS_KEYS.dailyUpload(id, today)
				: REDIS_KEYS.dailyAnalysis(id, today);
		const count = await this.redis.incr(key);
		if (count === 1) {
			await this.redis.expire(key, REDIS_TTL.DAILY_USAGE);
		}
		return {
			status: 'success',
			message: 'Get daily usage success',
			data: count,
		};
	}

	async canPerformAction(
		id: number,
		action: 'upload' | 'analysis',
	): Promise<boolean> {
		const planlimits = await this.getUserPlanLimits(id);
		const limit =
			action === 'upload'
				? planlimits.data.dailyUploadLimit
				: planlimits.data.dailyAnalysisLimit;
		if (limit === -1) return true;
		const current = await this.getDailyUsage(id, action);
		return current.data < limit;
	}
}
