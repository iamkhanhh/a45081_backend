import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { VariantCallingService } from './variant-calling.service';
import { UpdateAnalysisStatusDto } from '../vep/dto/update-analysis-status.dto';
import { Public } from '@/decorators';
import { FastqGuard } from '@/auth/passport/fastq.guard';

@ApiTags('Variant Calling')
@Controller('variant-calling')
@Public()
@UseGuards(FastqGuard)
export class VariantCallingController {
  constructor(private readonly variantCallingService: VariantCallingService) { }

  @Get('get-pending-analysis-fastq')
  @ApiOperation({ summary: 'Get pending FASTQ analyses for variant calling' })
  @ApiResponse({ status: 200, description: 'Pending FASTQ analyses retrieved successfully' })
  async getPendingAnalysis() {
    return this.variantCallingService.getPendingAnalysis();
  }

  @Put('update-analysis-status')
  @ApiOperation({ summary: 'Update analysis status after variant calling' })
  @ApiResponse({ status: 200, description: 'Analysis status updated successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async updateAnalysisStatus(
    @Body() updateAnalysisStatusDto: UpdateAnalysisStatusDto
  ) {
    return this.variantCallingService.updateAnalysisStatus(updateAnalysisStatusDto);
  }
}
