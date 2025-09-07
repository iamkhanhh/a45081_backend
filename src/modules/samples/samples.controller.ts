import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, DefaultValuePipe, Query, Request } from '@nestjs/common';
import { SamplesService } from './samples.service';
import { CreateSampleFastQDto } from './dto/create-sample-fastq.dto';
import { UpdateSampleDto } from './dto/update-sample.dto';
import { FilterSampleDto } from './dto/filter-sample.dto';
import { GenerateSinglePresignedUrl } from './dto/generate-single-presigned-url.dto';
import { PostFileInforDto } from './dto/post-file-infor.dto';
import { GeneratePresignedUrls } from './dto/generate-presigned-urls.dto';
import { CompleteUploadDto } from './dto/complete-upload.dto';

@Controller('samples')
export class SamplesController {
  constructor(private readonly samplesService: SamplesService) {}

  @Post()
  create(@Body() createSampleFastQDto: CreateSampleFastQDto) {
    return this.samplesService.create(createSampleFastQDto);
  }

  @Post('fastq')
  createSampleFastQ(
    @Body() body: CreateSampleFastQDto[],
    @Request() req,
  ) {
    return this.samplesService.createSampleFastQ(body, req.user.id);
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
    @Body() generateSinglePresignedUrl: GenerateSinglePresignedUrl,
    @Request() req,
  ) {
    return this.samplesService.generateSinglePresignedUrl(generateSinglePresignedUrl.fileName, req.user.id);
  }

  @Post('startMultipartUpload')
  startMultipartUpload(
    @Body() generateSinglePresignedUrl: GenerateSinglePresignedUrl,
    @Request() req,
  ) {
    return this.samplesService.startMultipartUpload(generateSinglePresignedUrl.fileName, req.user.id);
  }

  @Post('generatePresignedUrls')
  generatePresignedUrls(
    @Body() generatePresignedUrls: GeneratePresignedUrls,
    @Request() req,
  ) {
    return this.samplesService.generatePresignedUrls(generatePresignedUrls, req.user.id);
  }

  @Post('completeMultipartUpload')
  completeMultipartUpload(
    @Body() completeUploadDto: CompleteUploadDto,
    @Request() req,
  ) {
    return this.samplesService.completeMultipartUpload(completeUploadDto, req.user.id);
  }

  @Post('postFileInfor')
  postFileInfor(
    @Body() postFileInforDto: PostFileInforDto,
    @Request() req,
  ) {
    return this.samplesService.postFileInfor(postFileInforDto, req.user.id);
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
