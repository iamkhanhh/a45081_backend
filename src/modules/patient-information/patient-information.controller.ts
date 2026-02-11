import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { PatientsInformationService } from './patient-information.service';
import { CreatePatientInformationDto } from './dto/create-patient-information.dto';
import { UpdatePatientInformationDto } from './dto/update-patient-information.dto';

@ApiTags('Patient Information')
@Controller('patient-information')
export class PatientInformationController {
  constructor(private readonly patientsInformationService: PatientsInformationService) {}

  @Post()
  @ApiOperation({ summary: 'Create patient information' })
  @ApiResponse({ status: 201, description: 'Patient information created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createPatientInformationDto: CreatePatientInformationDto) {
    return this.patientsInformationService.create(createPatientInformationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all patient information' })
  @ApiResponse({ status: 200, description: 'Patient information retrieved successfully' })
  findAll() {
    return this.patientsInformationService.findAll();
  }

  @Get(':analysis_id')
  @ApiOperation({ summary: 'Get patient information by analysis ID' })
  @ApiParam({ name: 'analysis_id', example: 1, description: 'Analysis ID' })
  @ApiResponse({ status: 200, description: 'Patient information retrieved successfully' })
  @ApiResponse({ status: 400, description: 'Patient not found' })
  findOne(@Param('analysis_id', ParseIntPipe) analysis_id: number) {
    return this.patientsInformationService.findOne(analysis_id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update patient information' })
  @ApiParam({ name: 'id', example: 1, description: 'Patient information ID' })
  @ApiResponse({ status: 200, description: 'Patient information updated successfully' })
  @ApiResponse({ status: 400, description: 'Patient could not be updated' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updatePatientInformationDto: UpdatePatientInformationDto) {
    return this.patientsInformationService.update(id, updatePatientInformationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete patient information' })
  @ApiParam({ name: 'id', example: 1, description: 'Patient information ID' })
  @ApiResponse({ status: 200, description: 'Patient information deleted successfully' })
  @ApiResponse({ status: 404, description: 'Patient information not found' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.patientsInformationService.remove(id);
  }
}
