import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Query } from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';

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

  @Get()
  async findAll(
    @Request() req,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number
  ) {
    return await this.workspacesService.findAll(req.user.id, page, pageSize);
  }

  @Get(':id')
  index(@Param('id') id: string) {
    return this.workspacesService.index(+id);
  }

  @Get('getWorkspaceName/:id')
  async getWorkspaceName(@Param('id') id: string) {
    return await this.workspacesService.getWorkspaceName(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkspaceDto: UpdateWorkspaceDto) {
    return this.workspacesService.update(+id, updateWorkspaceDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.workspacesService.remove(+id);
  }
}
