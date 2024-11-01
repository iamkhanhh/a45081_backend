import { PartialType } from '@nestjs/mapped-types';
import { CreatePatientInformationDto } from './create-patient-information.dto';

export class UpdatePatientInformationDto extends PartialType(CreatePatientInformationDto) {}
