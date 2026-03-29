import { SetMetadata } from '@nestjs/common';

export type UsageAction = 'upload' | 'analysis';
export const TRACK_USAGE_KEY = 'track_daily_usage';

export const TrackDailyUsage = (action: UsageAction) =>
	SetMetadata(TRACK_USAGE_KEY, action);
