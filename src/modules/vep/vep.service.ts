import { Injectable } from '@nestjs/common';
import { AnalysisService } from '../analysis/analysis.service';
import { UpdateAnalysisStatusDto } from './dto/update-analysis-status.dto';

@Injectable()
export class VepService {

    constructor(
        private readonly analysisService: AnalysisService,
    ) {}

    async getPendingAnalysis() {
        let analysis = await this.analysisService.getPendingAnalysis('hg19');

        return {
            status: 'success',
            message: 'Pending analysis retrieved successfully',
            data: analysis
        }
    }

    async updateAnalysisStatus(updateAnalysisStatusDto: UpdateAnalysisStatusDto) {
        const { analysisId, status } = updateAnalysisStatusDto;

        if (!analysisId || !status) {
            return {
                status: 'error',
                message: 'Invalid analysis ID or status'
            };
        }

        await this.analysisService.updateAnalysisStatus(analysisId, status);

        return {
            status: 'success',
            message: 'Analysis status updated successfully'
        }
    }
}
