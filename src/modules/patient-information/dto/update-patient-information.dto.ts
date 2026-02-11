import { PartialType } from '@nestjs/swagger';
import { CreatePatientInformationDto } from './create-patient-information.dto';

export class UpdatePatientInformationDto extends PartialType(CreatePatientInformationDto) {}