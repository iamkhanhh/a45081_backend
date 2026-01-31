import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { PipelinesService } from './pipelines.service';
import { CreatePipelineDto } from './dto/create-pipeline.dto';
import { UpdatePipelineDto } from './dto/update-pipeline.dto';

@ApiTags('Pipelines')
@Controller('pipelines')
export class PipelinesController {
  constructor(private readonly pipelinesService: PipelinesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new pipeline' })
  @ApiResponse({ status: 201, description: 'Pipeline created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createPipelineDto: CreatePipelineDto) {
    return this.pipelinesService.create(createPipelineDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all pipelines' })
  @ApiResponse({ status: 200, description: 'Pipelines retrieved successfully' })
  findAll() {
    return this.pipelinesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a pipeline by ID' })
  @ApiParam({ name: 'id', example: 1, description: 'Pipeline ID' })
  @ApiResponse({ status: 200, description: 'Pipeline retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Pipeline not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.pipelinesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a pipeline' })
  @ApiParam({ name: 'id', example: 1, description: 'Pipeline ID' })
  @ApiResponse({ status: 200, description: 'Pipeline updated successfully' })
  @ApiResponse({ status: 404, description: 'Pipeline not found' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updatePipelineDto: UpdatePipelineDto) {
    return this.pipelinesService.update(id, updatePipelineDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a pipeline by ID' })
  @ApiParam({ name: 'id', example: 1, description: 'Pipeline ID' })
  @ApiResponse({ status: 200, description: 'Pipeline deleted successfully' })
  @ApiResponse({ status: 404, description: 'Pipeline not found' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.pipelinesService.remove(id);
  }
}
