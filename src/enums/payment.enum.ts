export enum PaymentStatus {
	PENDING = 'PENDING',
	PAID = 'PAID',
	CANCELLED = 'CANCELLED',
	EXPIRED = 'EXPIRED',
}

export enum PlanType {
	STANDARD = 'STANDARD',
	PREMIUM = 'PREMIUM',
}

export enum PlanTier {
	BASIC = 'BASIC',
	STANDARD = 'STANDARD',
	PREMIUM = 'PREMIUM',
}

export interface PlanLimits {
	tier: PlanTier;
	dailyUploadLimit: number; // -1 = unlimited
	dailyAnalysisLimit: number; // -1 = unlimited
	canUseQC: boolean;
	canUseReport: boolean;
}

export const PLAN_LIMITS: Record<PlanTier, PlanLimits> = {
	[PlanTier.BASIC]: {
		tier: PlanTier.BASIC,
		dailyUploadLimit: 3,
		dailyAnalysisLimit: 3,
		canUseQC: false,
		canUseReport: false,
	},
	[PlanTier.STANDARD]: {
		tier: PlanTier.STANDARD,
		dailyUploadLimit: 10,
		dailyAnalysisLimit: 10,
		canUseQC: true,
		canUseReport: true,
	},
	[PlanTier.PREMIUM]: {
		tier: PlanTier.PREMIUM,
		dailyUploadLimit: -1,
		dailyAnalysisLimit: -1,
		canUseQC: true,
		canUseReport: true,
	},
};
