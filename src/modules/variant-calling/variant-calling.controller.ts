import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { VariantCallingService } from './variant-calling.service';
import { UpdateAnalysisStatusDto } from '../vep/dto/update-analysis-status.dto';
import { Public } from '@/decorators';
import { FastqGuard } from '@/auth/passport/fastq.guard';

@Controller('variant-calling')
@Public()
@UseGuards(FastqGuard)
export class VariantCallingController {
  constructor(private readonly variantCallingService: VariantCallingService) { }

  @Get('get-pending-analysis-fastq')
  async getPendingAnalysis() {
    return this.variantCallingService.getPendingAnalysis();
  }

  @Put('update-analysis-status')
  async updateAnalysisStatus(
    @Body() updateAnalysisStatusDto: UpdateAnalysisStatusDto
  ) {
    return this.variantCallingService.updateAnalysisStatus(updateAnalysisStatusDto);
  }
}
