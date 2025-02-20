import { Injectable } from '@nestjs/common';
import { CreatePatientInformationDto } from './dto/create-patient-information.dto';
import { UpdatePatientInformationDto } from './dto/update-patient-information.dto';
import { PatientsInformation } from '@/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PatientsInformationService {

  constructor(
    @InjectRepository(PatientsInformation) private patientInformationRepository: Repository<PatientsInformation>,
  ) {}

  async create(createPatientInformationDto: CreatePatientInformationDto) {
    let new_patient = new PatientsInformation();

    new_patient.first_name = createPatientInformationDto.first_name;
    new_patient.last_name = createPatientInformationDto.last_name;
    new_patient.dob = createPatientInformationDto.dob;
    new_patient.phenotype = createPatientInformationDto.phenotype;
    new_patient.sample_id = createPatientInformationDto.sample_id;

    return await this.patientInformationRepository.save(new_patient);
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
