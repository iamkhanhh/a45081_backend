import { forwardRef, Module } from '@nestjs/common';
import { PatientsInformationService } from './patient-information.service';
import { PatientInformationController } from './patient-information.controller';
import { PatientsInformation } from '@/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalysisModule } from '../analysis/analysis.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PatientsInformation]),
    forwardRef(() => AnalysisModule)
  ],
  controllers: [PatientInformationController],
  providers: [PatientsInformationService],
  exports: [PatientsInformationService]
})
export class PatientInformationModule {}
