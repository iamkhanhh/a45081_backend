import { forwardRef, Module } from '@nestjs/common';
import { AnalysisService } from './analysis.service';
import { AnalysisController } from './analysis.controller';
import { Analysis } from '@/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PipelinesModule } from '../pipelines/pipelines.module';
import { UploadsModule } from '../uploads/uploads.module';
import { SamplesModule } from '../samples/samples.module';
import { WorkspacesModule } from '../workspaces/workspaces.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Analysis]),
    PipelinesModule,
    UploadsModule,
    SamplesModule,
    forwardRef(() => WorkspacesModule)
  ],
  controllers: [AnalysisController],
  providers: [AnalysisService],
  exports: [AnalysisService],
})
export class AnalysisModule {}
