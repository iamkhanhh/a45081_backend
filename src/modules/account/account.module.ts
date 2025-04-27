import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { UsersModule } from '../users/users.module';
import { AnalysisModule } from '../analysis/analysis.module';
import { WorkspacesModule } from '../workspaces/workspaces.module';

@Module({
  imports: [
    UsersModule,
    AnalysisModule,
    WorkspacesModule
  ],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
