import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Query, ParseIntPipe, DefaultValuePipe, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { ReportService } from './report.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';

@ApiTags('Report')
@Controller('report')
export class ReportController {
    constructor(private readonly reportService: ReportService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new report' })
    @ApiResponse({ status: 201, description: 'Report created successfully' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    create(@Body() createReportDto: CreateReportDto, @Request() req) {
        console.log(req.user_id)
        return this.reportService.create(createReportDto, req.user.id);
    }

    @Get()
    @ApiOperation({ summary: 'Get all reports of current user' })
    @ApiResponse({ status: 200, description: 'List of reports returned successfully' })
    findAll(@Request() req) {
        return this.reportService.findAll(req.user.id);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get report by id' })
    @ApiResponse({ status: 200, description: 'Report found' })
    @ApiResponse({ status: 404, description: 'Report not found' })
    findOne(@Request() req, @Param('id') id: string) {
        return this.reportService.findOne(req.user.id, +id);
    }

    // @Patch(':id')
    // @ApiOperation({ summary: 'Update report' })
    // @ApiResponse({ status: 200, description: 'Report updated successfully' })
    // update(
    //     @Request() req,
    //     @Param('id') id: string,
    //     @Body() updateReportDto: UpdateReportDto,
    // ) {
    //     return this.reportService.update(req.user.id, +id, updateReportDto);
    // }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete report (soft delete)' })
    @ApiParam({ name: 'id', example: 1 })
    @ApiResponse({ status: 200, description: 'Report deleted successfully' })
    remove(@Request() req, @Param('id') id: string) {
        return this.reportService.delete(req.user.id, +id);
    }
}
