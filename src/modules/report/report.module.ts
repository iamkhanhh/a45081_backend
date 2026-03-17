import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from '@/entities';
import { VariantsModule } from '../variants/variants.module';
import { PatientInformationModule } from '../patient-information/patient-information.module';
import { AnalysisModule } from '../analysis/analysis.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Report]),
    VariantsModule,
    AnalysisModule,
    PatientInformationModule,
  ],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
