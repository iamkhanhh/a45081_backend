import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Query, Put, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { WorkspacesService } from './workspaces.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { FilterWorkspacesDto } from './dto/filter-workspaces.dto';
import { DeleteMultipleWorkspacesDto } from './dto/delete-multiple-workspaces.dto';

@ApiTags('Workspaces')
@Controller('workspaces')
export class WorkspacesController {
  constructor(private readonly workspacesService: WorkspacesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new workspace' })
  @ApiResponse({ status: 201, description: 'Workspace created successfully' })
  @ApiResponse({ status: 400, description: 'Workspace name already exists' })
  create(
    @Body() createWorkspaceDto: CreateWorkspaceDto,
    @Request() req
  ) {
    return this.workspacesService.create(createWorkspaceDto, req.user.id);
  }

  @Post('load-workspaces')
  @ApiOperation({ summary: 'Get all workspaces with pagination and filters' })
  @ApiQuery({ name: 'page', example: 1, description: 'Page number' })
  @ApiQuery({ name: 'pageSize', example: 10, description: 'Number of items per page' })
  @ApiResponse({ status: 200, description: 'Workspaces retrieved successfully' })
  async findAll(
    @Request() req,
    @Query('page', ParseIntPipe, new DefaultValuePipe(1)) page: number,
    @Query('pageSize', ParseIntPipe, new DefaultValuePipe(10)) pageSize: number,
    @Body() filterWorkspacesDto: FilterWorkspacesDto
  ) {
    return await this.workspacesService.findAll(req.user.id, page, pageSize, filterWorkspacesDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a workspace by ID' })
  @ApiParam({ name: 'id', example: 1, description: 'Workspace ID' })
  @ApiResponse({ status: 200, description: 'Workspace retrieved successfully' })
  @ApiResponse({ status: 400, description: 'Workspace not found' })
  async index(@Param('id', ParseIntPipe) id: number) {
    return await this.workspacesService.index(id);
  }

  @Get('getWorkspaceName/:id')
  @ApiOperation({ summary: 'Get workspace name by ID' })
  @ApiParam({ name: 'id', example: 1, description: 'Workspace ID' })
  @ApiResponse({ status: 200, description: 'Workspace name retrieved successfully' })
  @ApiResponse({ status: 400, description: 'Workspace not found' })
  async getWorkspaceName(@Param('id', ParseIntPipe) id: number) {
    return await this.workspacesService.getWorkspaceName(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a workspace' })
  @ApiParam({ name: 'id', example: 1, description: 'Workspace ID' })
  @ApiResponse({ status: 200, description: 'Workspace updated successfully' })
  @ApiResponse({ status: 400, description: 'Workspace not found' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateWorkspaceDto: UpdateWorkspaceDto) {
    return await this.workspacesService.update(id, updateWorkspaceDto);
  }

  @Delete('delete-multiple-workspaces')
  @ApiOperation({ summary: 'Delete multiple workspaces' })
  @ApiResponse({ status: 200, description: 'Workspaces deleted successfully' })
  async deleteMultipleWorkspaces (
    @Body() deleteMultipleWorkspacesDto: DeleteMultipleWorkspacesDto
  ) {
    return await this.workspacesService.deleteMultipleWorkspaces(deleteMultipleWorkspacesDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a workspace by ID' })
  @ApiParam({ name: 'id', example: 1, description: 'Workspace ID' })
  @ApiResponse({ status: 200, description: 'Workspace deleted successfully' })
  @ApiResponse({ status: 400, description: 'Workspace not found' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.workspacesService.remove(id);
  }
}
