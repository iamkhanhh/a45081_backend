import { Injectable } from '@nestjs/common';
import { CreatePatientInformationDto } from './dto/create-patient-information.dto';
import { UpdatePatientInformationDto } from './dto/update-patient-information.dto';

@Injectable()
export class PatientInformationService {
  create(createPatientInformationDto: CreatePatientInformationDto) {
    return 'This action adds a new patientInformation';
  }

  findAll() {
    return `This action returns all patientInformation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} patientInformation`;
  }

  update(id: number, updatePatientInformationDto: UpdatePatientInformationDto) {
    return `This action updates a #${id} patientInformation`;
  }

  remove(id: number) {
    return `This action removes a #${id} patientInformation`;
  }
}
