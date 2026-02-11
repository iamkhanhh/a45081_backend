import { Module } from '@nestjs/common';
import { VepService } from './vep.service';
import { VepController } from './vep.controller';
import { AnalysisModule } from '../analysis/analysis.module';

@Module({
  imports: [AnalysisModule],
  controllers: [VepController],
  providers: [VepService],
})
export class VepModule {}
