import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Query, Put, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { FilterWorkspacesDto } from './dto/filter-workspaces.dto';
import { DeleteMultipleWorkspacesDto } from './dto/delete-multiple-workspaces.dto';

@Controller('workspaces')
export class WorkspacesController {
  constructor(private readonly workspacesService: WorkspacesService) {}

  @Post()
  create(
    @Body() createWorkspaceDto: CreateWorkspaceDto,
    @Request() req
  ) {
    return this.workspacesService.create(createWorkspaceDto, req.user.id);
  }

  @Post('load-workspaces')
  async findAll(
    @Request() req,
    @Query('page', ParseIntPipe, new DefaultValuePipe(1)) page: number,
    @Query('pageSize', ParseIntPipe, new DefaultValuePipe(10)) pageSize: number,
    @Body() filterWorkspacesDto: FilterWorkspacesDto
  ) {
    return await this.workspacesService.findAll(req.user.id, page, pageSize, filterWorkspacesDto);
  }

  @Get(':id')
  async index(@Param('id', ParseIntPipe) id: number) {
    return await this.workspacesService.index(id);
  }

  @Get('getWorkspaceName/:id')
  async getWorkspaceName(@Param('id', ParseIntPipe) id: number) {
    return await this.workspacesService.getWorkspaceName(id);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateWorkspaceDto: UpdateWorkspaceDto) {
    return await this.workspacesService.update(id, updateWorkspaceDto);
  }

  @Delete('delete-multiple-workspaces')
  async deleteMultipleWorkspaces (
    @Body() deleteMultipleWorkspacesDto: DeleteMultipleWorkspacesDto
  ) {
    return await this.workspacesService.deleteMultipleWorkspaces(deleteMultipleWorkspacesDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.workspacesService.remove(id);
  }
}
