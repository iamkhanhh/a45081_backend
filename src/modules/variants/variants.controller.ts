import { Controller, Post, Body, Param, ParseIntPipe, DefaultValuePipe, Query } from '@nestjs/common';
import { VariantsService } from './variants.service';
import { FilterVariantsDto } from './dto/filter-variants.dto';

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
}
