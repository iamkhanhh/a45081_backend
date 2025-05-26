import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Put } from '@nestjs/common';
import { PatientsInformationService } from './patient-information.service';
import { CreatePatientInformationDto } from './dto/create-patient-information.dto';
import { UpdatePatientInformationDto } from './dto/update-patient-information.dto';

@Controller('patient-information')
export class PatientInformationController {
  constructor(private readonly patientsInformationService: PatientsInformationService) {}

  @Post()
  create(@Body() createPatientInformationDto: CreatePatientInformationDto) {
    return this.patientsInformationService.create(createPatientInformationDto);
  }

  @Get()
  findAll() {
    return this.patientsInformationService.findAll();
  }

  @Get(':analysis_id')
  findOne(@Param('analysis_id', ParseIntPipe) analysis_id: number) {
    return this.patientsInformationService.findOne(analysis_id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updatePatientInformationDto: UpdatePatientInformationDto) {
    return this.patientsInformationService.update(id, updatePatientInformationDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.patientsInformationService.remove(id);
  }
}
