import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Query, ParseIntPipe, DefaultValuePipe, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { AnalysisService } from './analysis.service';
import { CreateAnalysisDto } from './dto/create-analysis.dto';
import { UpdateAnalysisDto } from './dto/update-analysis.dto';
import { FilterAnalysisDto } from './dto/filter-analysis.dto';
import { GetGeneDetailDto } from './dto/get-gene-detail.dto';

@ApiTags('Analysis')
@Controller('analysis')
export class AnalysisController {
  constructor(private readonly analysisService: AnalysisService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new analysis' })
  @ApiResponse({ status: 201, description: 'Analysis created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(
    @Body() createAnalysisDto: CreateAnalysisDto,
    @Request() req,
  ) {
    return this.analysisService.create(createAnalysisDto, req.user.id);
  }

  @Post('load-analyses')
  @ApiOperation({ summary: 'Get all analyses with pagination and filters' })
  @ApiQuery({ name: 'page', example: 1, description: 'Page number' })
  @ApiQuery({ name: 'pageSize', example: 10, description: 'Number of items per page' })
  @ApiResponse({ status: 200, description: 'Analyses retrieved successfully' })
  findAll(
    @Request() req,
    @Query('page', ParseIntPipe, new DefaultValuePipe(1)) page: number,
    @Query('pageSize', ParseIntPipe, new DefaultValuePipe(10)) pageSize: number,
    @Body() filterAnalysisDto: FilterAnalysisDto
  ) {
    return this.analysisService.findAll(req.user.id, page, pageSize, filterAnalysisDto);
  }

  @Get('get-qc-vcf/:id')
  @ApiOperation({ summary: 'Get QC VCF data for an analysis' })
  @ApiParam({ name: 'id', example: 1, description: 'Analysis ID' })
  @ApiResponse({ status: 200, description: 'QC VCF data retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Analysis not found' })
  getQCVCF(@Param('id', ParseIntPipe) id: number) {
    return this.analysisService.getQCVCF(id);
  }

  @Post('get-gene-detail')
  @ApiOperation({ summary: 'Get gene detail information' })
  @ApiResponse({ status: 200, description: 'Gene detail retrieved successfully' })
  getGeneDetail(@Body() getGeneDetailDto: GetGeneDetailDto) {
    return this.analysisService.getGeneDetail(getGeneDetailDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an analysis by ID' })
  @ApiParam({ name: 'id', example: 1, description: 'Analysis ID' })
  @ApiResponse({ status: 200, description: 'Analysis retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Analysis not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.analysisService.findOne(id);
  }

  @Post('getAnalysesByWorkspaceId/:id')
  @ApiOperation({ summary: 'Get analyses by workspace ID with pagination and filters' })
  @ApiParam({ name: 'id', example: 1, description: 'Workspace ID' })
  @ApiQuery({ name: 'page', example: 1, description: 'Page number' })
  @ApiQuery({ name: 'pageSize', example: 10, description: 'Number of items per page' })
  @ApiResponse({ status: 200, description: 'Analyses retrieved successfully' })
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
  @ApiOperation({ summary: 'Update an analysis' })
  @ApiParam({ name: 'id', example: 1, description: 'Analysis ID' })
  @ApiResponse({ status: 200, description: 'Analysis updated successfully' })
  @ApiResponse({ status: 404, description: 'Analysis not found' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateAnalysisDto: UpdateAnalysisDto) {
    return this.analysisService.update(id, updateAnalysisDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an analysis' })
  @ApiParam({ name: 'id', example: 1, description: 'Analysis ID' })
  @ApiResponse({ status: 200, description: 'Analysis deleted successfully' })
  @ApiResponse({ status: 404, description: 'Analysis not found' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.analysisService.remove(id);
  }
}
