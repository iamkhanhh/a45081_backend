import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, DefaultValuePipe, Query, Request } from '@nestjs/common';
import { SamplesService } from './samples.service';
import { CreateSampleDto } from './dto/create-sample.dto';
import { UpdateSampleDto } from './dto/update-sample.dto';
import { FilterSampleDto } from './dto/filter-sample.dto';
import { GenerateSinglePresignedUrl } from './dto/generate-single-presigned-url.dto';

@Controller('samples')
export class SamplesController {
  constructor(private readonly samplesService: SamplesService) {}

  @Post()
  create(@Body() createSampleDto: CreateSampleDto) {
    return this.samplesService.create(createSampleDto);
  }

  @Post('load-samples')
  findAll(
    @Request() req,
    @Query('page', ParseIntPipe, new DefaultValuePipe(1)) page: number,
    @Query('pageSize', ParseIntPipe, new DefaultValuePipe(10)) pageSize: number,
    @Body() filterSampleDto: FilterSampleDto
  ) {
    return this.samplesService.findAll(req.user.id, page, pageSize, filterSampleDto);
  }

  @Post('generateSinglePresignedUrl')
  generateSinglePresignedUrl(
    @Body() generateSinglePresignedUrl: GenerateSinglePresignedUrl
  ) {
    return this.samplesService.generateSinglePresignedUrl(generateSinglePresignedUrl.fileName);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.samplesService.findOne(id);
  }

  @Get('getSamplesByPipeLine/:id')
  async getSamplesByPipeLine(@Param('id', ParseIntPipe) id: number) {
    return await this.samplesService.getSamplesByPipeLine(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateSampleDto: UpdateSampleDto) {
    return this.samplesService.update(id, updateSampleDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.samplesService.remove(id);
  }
}
