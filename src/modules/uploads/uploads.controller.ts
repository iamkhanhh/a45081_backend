import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Request } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { CreateUploadForSample } from './dto/create-upload-for-sample.dto';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post('fastq')
  create(
    @Body() createUploadDto: CreateUploadForSample,
    @Request() req,
  ) {
    return this.uploadsService.createUploadFastQ(createUploadDto, req.user.id);
  }

  @Get()
  findAll() {
    return this.uploadsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.uploadsService.findOne(id);
  }

  @Patch('fastq/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateUploadDto: UpdateUploadDto) {
    return this.uploadsService.update(id, updateUploadDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.uploadsService.remove(id);
  }
}
