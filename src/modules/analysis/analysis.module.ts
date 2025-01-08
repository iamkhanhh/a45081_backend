import { Module } from '@nestjs/common';
import { AnalysisService } from './analysis.service';
import { AnalysisController } from './analysis.controller';
import { Analysis } from '@/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PipelinesModule } from '../pipelines/pipelines.module';
import { CommonModule } from '@/common/common.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Analysis]),
    PipelinesModule,
    CommonModule
  ],
  controllers: [AnalysisController],
  providers: [AnalysisService],
  exports: [AnalysisService],
})
export class AnalysisModule {}
