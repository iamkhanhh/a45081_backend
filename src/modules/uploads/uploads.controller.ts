import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { UploadsService } from './uploads.service';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { CreateUploadForSample } from './dto/create-upload-for-sample.dto';

@ApiTags('Uploads')
@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post('fastq')
  @ApiOperation({ summary: 'Create a new FASTQ upload record' })
  @ApiResponse({ status: 201, description: 'Upload record created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(
    @Body() createUploadDto: CreateUploadForSample,
    @Request() req,
  ) {
    return this.uploadsService.createUploadFastQ(createUploadDto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all uploads' })
  @ApiResponse({ status: 200, description: 'Uploads retrieved successfully' })
  findAll() {
    return this.uploadsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an upload by ID' })
  @ApiParam({ name: 'id', example: 1, description: 'Upload ID' })
  @ApiResponse({ status: 200, description: 'Upload retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Upload not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.uploadsService.findOne(id);
  }

  @Patch('fastq/:id')
  @ApiOperation({ summary: 'Update a FASTQ upload record' })
  @ApiParam({ name: 'id', example: 1, description: 'Upload ID' })
  @ApiResponse({ status: 200, description: 'Upload updated successfully' })
  @ApiResponse({ status: 404, description: 'Upload not found' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUploadDto: UpdateUploadDto) {
    return this.uploadsService.update(id, updateUploadDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an upload' })
  @ApiParam({ name: 'id', example: 1, description: 'Upload ID' })
  @ApiResponse({ status: 200, description: 'Upload deleted successfully' })
  @ApiResponse({ status: 404, description: 'Upload not found' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.uploadsService.remove(id);
  }
}
