import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PatientInformationService } from './patient-information.service';
import { CreatePatientInformationDto } from './dto/create-patient-information.dto';
import { UpdatePatientInformationDto } from './dto/update-patient-information.dto';

@Controller('patient-information')
export class PatientInformationController {
  constructor(private readonly patientInformationService: PatientInformationService) {}

  @Post()
  create(@Body() createPatientInformationDto: CreatePatientInformationDto) {
    return this.patientInformationService.create(createPatientInformationDto);
  }

  @Get()
  findAll() {
    return this.patientInformationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientInformationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePatientInformationDto: UpdatePatientInformationDto) {
    return this.patientInformationService.update(+id, updatePatientInformationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientInformationService.remove(+id);
  }
}
