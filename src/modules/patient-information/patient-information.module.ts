import { Module } from '@nestjs/common';
import { PatientInformationService } from './patient-information.service';
import { PatientInformationController } from './patient-information.controller';

@Module({
  controllers: [PatientInformationController],
  providers: [PatientInformationService],
})
export class PatientInformationModule {}
