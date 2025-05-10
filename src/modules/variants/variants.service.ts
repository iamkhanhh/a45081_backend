import { Injectable } from '@nestjs/common';
import { FilterVariantsDto } from './dto/filter-variants.dto';

@Injectable()
export class VariantsService {

  findOne(id: number, page: number, pageSize: number, filter: FilterVariantsDto) {
    console.log("id", id);
    console.log("page", page);
    console.log("pageSize", pageSize);
    console.log("filter", filter);
    
    return {
      status: "success",
      message: "Get variants successfully",
      data: []
    };
  }
}
