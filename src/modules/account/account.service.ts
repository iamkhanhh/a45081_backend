import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
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
    let user = await this.usersService.findOne(user_id);
    let workspaces = await this.workspacesService.getTotal(user_id);
    let analyses = await this.analysisService.getTotal(user_id);

    return {
      status: "success",
      message: "Get account successfully",
      data: {
        ...user,
        workspaces,
        analyses
      }
    };
  }

  async getAccountDashboard(user_id: number) {
    let workspaces = await this.workspacesService.getTotal(user_id);
    let analyses = await this.analysisService.getTotal(user_id);
    let samples = await this.samplesService.getTotal(user_id);

    let analysisByStatus = await this.analysisService.getAnalysisStaticsByStatus(user_id);
    let samplesByFileType = await this.samplesService.getSamplesStaticsByFileType(user_id);
    let samplesbyAsembly = await this.samplesService.getSamplesStaticsByAssembly(user_id);

    const lastSixMonthsNumbers = this.getLastSixMonths();
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                        
    const lastSixMonths = lastSixMonthsNumbers.map(month => monthNames[month - 1]);

    let samplesLastSixMonths = await this.samplesService.getSamplesLastSixMonths(user_id, lastSixMonthsNumbers);
    let analysisLastSixMonths = await this.analysisService.getAnalysesStatistics(user_id, lastSixMonthsNumbers);

    let recentAnalyses = await this.analysisService.getRecentAnalyses(user_id);

    return {
      status: "success",
      message: "Get account dashboard successfully",
      data: {
        workspaces,
        analyses,
        samples,
        analysisByStatus,
        samplesByFileType,
        samplesbyAsembly,
        samplesLastSixMonths,
        analysisLastSixMonths,
        recentAnalyses
      }
    };
  }

  async updatePassword(user_id: number, updatePasswordDto: UpdatePasswordDto) {
    let user = await this.usersService.findOne(user_id);
    if (!user) {
      throw new BadRequestException("User not found");
    }
    const isMatchPassword = await this.hashingPasswordProvider.comparePasswordHelper(updatePasswordDto.oldPassword, user.password);
    
    if (!isMatchPassword) {
      throw new BadRequestException("Current password is incorrect");
    }

    await this.usersService.updatePassword(user_id, updatePasswordDto.password);

    return {
      status: "success",
      message: "Update password successfully"
    };
  }


  findOne(id: number) {
    return `This action returns a #${id} account`;
  }

  async update(id: number, updateAccountDto: UpdateAccountDto) {
    let user = await this.usersService.findOne(id);
    if (!user) {
      throw new BadRequestException("User not found");
    }
    
    return await this.usersService.updateAccount(id, updateAccountDto);
  }

  async getAccountStatistics(user_id: number) {
    const lastSixMonthsNumbers = this.getLastSixMonths();

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                        
    const lastSixMonths = lastSixMonthsNumbers.map(month => monthNames[month - 1]);
    const analysesStatistics = await this.analysisService.getAnalysesStatistics(user_id, lastSixMonthsNumbers);
    const workspacesStatistics = await this.workspacesService.getWorkspacesStatistics(user_id, lastSixMonthsNumbers);

    return {
      status: 'success',
      message: 'Get account statistics successfully',
      data: {
        lastSixMonths,
        analysesStatistics,
        workspacesStatistics
      }
    }
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
