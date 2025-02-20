import { Module } from '@nestjs/common';
import { PatientsInformationService } from './patient-information.service';
import { PatientInformationController } from './patient-information.controller';
import { PatientsInformation } from '@/entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([PatientsInformation]),
  ],
  controllers: [PatientInformationController],
  providers: [PatientsInformationService],
  exports: [PatientsInformationService]
})
export class PatientInformationModule {}
