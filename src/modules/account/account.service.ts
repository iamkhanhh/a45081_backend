import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateAccountDto } from './dto/update-account.dto';
import { UsersService } from '../users/users.service';
import { WorkspacesService } from '../workspaces/workspaces.service';
import { AnalysisService } from '../analysis/analysis.service';
import { HashingPasswordProvider } from '@/common/providers/hashing-password.provider';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { SamplesService } from '../samples/samples.service';

@Injectable()
export class AccountService {
	constructor(
		private readonly usersService: UsersService,
		private readonly workspacesService: WorkspacesService,
		private readonly analysisService: AnalysisService,
		private readonly samplesService: SamplesService,
		private readonly hashingPasswordProvider: HashingPasswordProvider,
	) {}

	async getAccount(user_id: number) {
		const user = await this.usersService.findOne(user_id);
		const workspaces = await this.workspacesService.getTotal(user_id);
		const analyses = await this.analysisService.getTotal(user_id);

		return {
			status: 'success',
			message: 'Get account successfully',
			data: {
				...user,
				workspaces,
				analyses,
			},
		};
	}

	async getAccountDashboard(user_id: number) {
		const workspaces = await this.workspacesService.getTotal(user_id);
		const analyses = await this.analysisService.getTotal(user_id);
		const samples = await this.samplesService.getTotal(user_id);

		const analysisByStatus =
			await this.analysisService.getAnalysisStaticsByStatus(user_id);
		const samplesByFileType =
			await this.samplesService.getSamplesStaticsByFileType(user_id);
		const samplesbyAsembly =
			await this.samplesService.getSamplesStaticsByAssembly(user_id);

		const lastSixMonthsNumbers = this.getLastSixMonths();

		const samplesLastSixMonths =
			await this.samplesService.getSamplesLastSixMonths(
				user_id,
				lastSixMonthsNumbers,
			);
		const analysisLastSixMonths =
			await this.analysisService.getAnalysesStatistics(
				user_id,
				lastSixMonthsNumbers,
			);

		const recentAnalyses =
			await this.analysisService.getRecentAnalyses(user_id);

		const monthNames = [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec',
		];

		const lastSixMonths = lastSixMonthsNumbers.map(
			(month) => monthNames[month - 1],
		);

		return {
			status: 'success',
			message: 'Get account dashboard successfully',
			data: {
				lastSixMonths,
				workspaces,
				analyses,
				samples,
				analysisByStatus,
				samplesByFileType,
				samplesbyAsembly,
				samplesLastSixMonths,
				analysisLastSixMonths,
				recentAnalyses,
			},
		};
	}

	async updatePassword(user_id: number, updatePasswordDto: UpdatePasswordDto) {
		const user = await this.usersService.findOne(user_id);
		if (!user) {
			throw new BadRequestException('User not found');
		}
		const isMatchPassword =
			await this.hashingPasswordProvider.comparePasswordHelper(
				updatePasswordDto.oldPassword,
				user.password,
			);

		if (!isMatchPassword) {
			throw new BadRequestException('Current password is incorrect');
		}

		await this.usersService.updatePassword(user_id, updatePasswordDto.password);

		return {
			status: 'success',
			message: 'Update password successfully',
		};
	}

	findOne(id: number) {
		return `This action returns a #${id} account`;
	}

	async update(id: number, updateAccountDto: UpdateAccountDto) {
		const user = await this.usersService.findOne(id);
		if (!user) {
			throw new BadRequestException('User not found');
		}

		return await this.usersService.updateAccount(id, updateAccountDto);
	}

	async getAccountStatistics(user_id: number) {
		const lastSixMonthsNumbers = this.getLastSixMonths();

		const monthNames = [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec',
		];

		const lastSixMonths = lastSixMonthsNumbers.map(
			(month) => monthNames[month - 1],
		);
		const analysesStatistics = await this.analysisService.getAnalysesStatistics(
			user_id,
			lastSixMonthsNumbers,
		);
		const workspacesStatistics =
			await this.workspacesService.getWorkspacesStatistics(
				user_id,
				lastSixMonthsNumbers,
			);

		return {
			status: 'success',
			message: 'Get account statistics successfully',
			data: {
				lastSixMonths,
				analysesStatistics,
				workspacesStatistics,
			},
		};
	}

	private getLastSixMonths(): number[] {
		const now = new Date();
		const currentMonth = now.getMonth() + 1;

		const lastSixMonths: number[] = [];

		for (let i = 5; i >= 0; i--) {
			let month = currentMonth - i;
			if (month <= 0) {
				month += 12;
			}
			lastSixMonths.push(month);
		}
		return lastSixMonths;
	}
}
