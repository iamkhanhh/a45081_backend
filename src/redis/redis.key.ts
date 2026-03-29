export const REDIS_KEYS = {
	dailyUpload: (userId: number, date: string) =>
		`usage:${userId}:${date}:upload`,
	dailyAnalysis: (userId: number, date: string) =>
		`usage:${userId}:${date}:analysis`,
	userPlan: (userId: number) => `user_plan:${userId}`,
};

export const REDIS_TTL = {
	DAILY_USAGE: 172800,
	USER_PLAN: 3600,
};
