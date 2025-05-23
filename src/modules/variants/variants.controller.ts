import { Controller, Post, Body, Param, ParseIntPipe, DefaultValuePipe, Query, Get, Delete } from '@nestjs/common';
import { VariantsService } from './variants.service';
import { FilterVariantsDto } from './dto/filter-variants.dto';
import { AddVariantsToReport } from './dto/add-variants-to-report.dto';
import { VariantToReportDto } from './dto/variant-to-report.dto';

@Controller('variants')
export class VariantsController {
  constructor(private readonly variantsService: VariantsService) { }

  @Post(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Query('page', ParseIntPipe, new DefaultValuePipe(1)) page: number,
    @Query('pageSize', ParseIntPipe, new DefaultValuePipe(10)) pageSize: number,
    @Body() filter: FilterVariantsDto
  ) {
    return this.variantsService.findOne(id, page, pageSize, filter);
  }

  @Get('get-variants-selected/:id')
  getVariantsSelected(
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.variantsService.getVariantsSelected(id);
  }

  @Delete(':id/delete-selected-variant')
  deleteSelectedVariant(
    @Param('id', ParseIntPipe) id: number,
    @Body() variant: VariantToReportDto
  ) {
    return this.variantsService.deleteSelectedVariant(id, variant);
  }
  
  @Post('add-to-report/:id')
  selectVariantToReport(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: AddVariantsToReport
  ) {
    return this.variantsService.selectVariantToReport(id, body);
  }
}
