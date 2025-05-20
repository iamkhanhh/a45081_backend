import { Module } from '@nestjs/common';
import { VariantsService } from './variants.service';
import { VariantsController } from './variants.controller';
import { GeneClinicalSynopsis } from '@/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '@/common/common.module';
import { AnalysisModule } from '../analysis/analysis.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([GeneClinicalSynopsis]),
    CommonModule,
    AnalysisModule
  ],
  controllers: [VariantsController],
  providers: [VariantsService],
})
export class VariantsModule {}
