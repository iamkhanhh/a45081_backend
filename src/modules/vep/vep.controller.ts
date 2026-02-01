import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { VepService } from './vep.service';
import { Public } from '@/decorators';
import { VepGuard } from '@/auth/passport/vep.guard';
import { UpdateAnalysisStatusDto } from './dto/update-analysis-status.dto';

@ApiTags('VEP')
@Controller('vep')
@Public()
@UseGuards(VepGuard)
export class VepController {
  constructor(private readonly vepService: VepService) {}

  @Get('get-pending-analysis')
  @ApiOperation({ summary: 'Get pending VEP analyses' })
  @ApiResponse({ status: 200, description: 'Pending analyses retrieved successfully' })
  async getPendingAnalysis() {
    return this.vepService.getPendingAnalysis();
  }

  @Put('update-analysis-status')
  @ApiOperation({ summary: 'Update analysis status after VEP processing' })
  @ApiResponse({ status: 200, description: 'Analysis status updated successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async updateAnalysisStatus(
    @Body() updateAnalysisStatusDto: UpdateAnalysisStatusDto
  ) {
    return this.vepService.updateAnalysisStatus(updateAnalysisStatusDto);
  }
}
