import { forwardRef, Module } from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';
import { WorkspacesController } from './workspaces.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workspaces } from '@/entities';
import { PipelinesModule } from '../pipelines/pipelines.module';
import { AnalysisModule } from '../analysis/analysis.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Workspaces]),
    PipelinesModule,
    forwardRef(() => AnalysisModule)
  ],
  controllers: [WorkspacesController],
  providers: [WorkspacesService],
  exports: [WorkspacesService]
})
export class WorkspacesModule {}
