import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Query, ParseIntPipe, DefaultValuePipe, Put } from '@nestjs/common';
import { AnalysisService } from './analysis.service';
import { CreateAnalysisDto } from './dto/create-analysis.dto';
import { UpdateAnalysisDto } from './dto/update-analysis.dto';
import { FilterAnalysisDto } from './dto/filter-analysis.dto';

@Controller('analysis')
export class AnalysisController {
  constructor(private readonly analysisService: AnalysisService) {}

  @Post()
  create(
    @Body() createAnalysisDto: CreateAnalysisDto,
    @Request() req,
  ) {
    return this.analysisService.create(createAnalysisDto, req.user.id);
  }

  @Post('load-analyses')
  findAll(
    @Request() req,
    @Query('page', ParseIntPipe, new DefaultValuePipe(1)) page: number,
    @Query('pageSize', ParseIntPipe, new DefaultValuePipe(10)) pageSize: number,
    @Body() filterAnalysisDto: FilterAnalysisDto
  ) {
    return this.analysisService.findAll(req.user.id, page, pageSize, filterAnalysisDto);
  }

  @Get('get-qc-vcf/:id')
  getQCVCF(@Param('id', ParseIntPipe) id: number) {
    return this.analysisService.getQCVCF(id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.analysisService.findOne(id);
  }

  @Post('getAnalysesByWorkspaceId/:id')
  async getAnalysesByWorkspaceId(
    @Request() req,
    @Query('page', ParseIntPipe, new DefaultValuePipe(1)) page: number,
    @Query('pageSize', ParseIntPipe, new DefaultValuePipe(10)) pageSize: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() filterAnalysisDto: FilterAnalysisDto
  ) {
    return await this.analysisService.getAnalysesByWorkspaceId(id, req.user.id, page, pageSize, filterAnalysisDto);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateAnalysisDto: UpdateAnalysisDto) {
    return this.analysisService.update(id, updateAnalysisDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.analysisService.remove(id);
  }
}
