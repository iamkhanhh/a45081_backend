import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genes, PGx, Report } from '@/entities';
import { VariantsModule } from '../variants/variants.module';
import { PatientInformationModule } from '../patient-information/patient-information.module';
import { AnalysisModule } from '../analysis/analysis.module';
import { CommonModule } from '@/common/common.module';
import { ChatbotModule } from '../chatbot/chatbot.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([Report, Genes, PGx]),
		VariantsModule,
		AnalysisModule,
		PatientInformationModule,
		CommonModule,
		ChatbotModule,
	],
	controllers: [ReportController],
	providers: [ReportService],
})
export class ReportModule {}
