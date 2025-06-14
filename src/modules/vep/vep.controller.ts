import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { VepService } from './vep.service';
import { Public } from '@/decorators';
import { VepGuard } from '@/auth/passport/vep.guard';
import { UpdateAnalysisStatusDto } from './dto/update-analysis-status.dto';

@Controller('vep')
@Public()
@UseGuards(VepGuard)
export class VepController {
  constructor(private readonly vepService: VepService) {}

  @Get('get-pending-analysis')
  async getPendingAnalysis() {
    return this.vepService.getPendingAnalysis();
  }

  @Put('update-analysis-status')
  async updateAnalysisStatus(
    @Body() updateAnalysisStatusDto: UpdateAnalysisStatusDto
  ) {
    return this.vepService.updateAnalysisStatus(updateAnalysisStatusDto);
  }
}
