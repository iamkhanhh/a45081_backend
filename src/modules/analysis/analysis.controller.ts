import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { AnalysisService } from './analysis.service';
import { CreateAnalysisDto } from './dto/create-analysis.dto';
import { UpdateAnalysisDto } from './dto/update-analysis.dto';

@Controller('analysis')
export class AnalysisController {
  constructor(private readonly analysisService: AnalysisService) {}

  @Post()
  create(@Body() createAnalysisDto: CreateAnalysisDto) {
    return this.analysisService.create(createAnalysisDto);
  }

  @Get()
  findAll() {
    return this.analysisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.analysisService.findOne(+id);
  }

  @Get('getAnalysesByWorkspaceId/:id')
  async getAnalysesByWorkspaceId(
    @Request() req,
    @Query('page', ParseIntPipe, new DefaultValuePipe(1)) page: number,
    @Query('pageSize', ParseIntPipe, new DefaultValuePipe(10)) pageSize: number,
    @Param('id', ParseIntPipe) id: number
  ) {
    return await this.analysisService.getAnalysesByWorkspaceId(id, req.user.id, page, pageSize);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateAnalysisDto: UpdateAnalysisDto) {
    return this.analysisService.update(id, updateAnalysisDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.analysisService.remove(id);
  }
}
