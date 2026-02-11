import { Module } from '@nestjs/common';
import { VariantCallingService } from './variant-calling.service';
import { VariantCallingController } from './variant-calling.controller';
import { AnalysisModule } from '../analysis/analysis.module';

@Module({
  imports: [AnalysisModule],
  controllers: [VariantCallingController],
  providers: [VariantCallingService],
})
export class VariantCallingModule {}
