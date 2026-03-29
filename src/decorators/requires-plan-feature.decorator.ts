import { SetMetadata } from '@nestjs/common';

export type PlanFeature = 'qc' | 'report';
export const REQUIRES_FEATURE_KEY = 'require_plan_feature';

export const RequiresPlanFeature = (feature: PlanFeature) =>
	SetMetadata(REQUIRES_FEATURE_KEY, feature);
