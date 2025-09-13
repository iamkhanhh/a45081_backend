import { Injectable } from '@nestjs/common';
import { UpdateAnalysisStatusDto } from '../vep/dto/update-analysis-status.dto';
import { AnalysisService } from '../analysis/analysis.service';

@Injectable()
export class VariantCallingService {
    constructor(
        private readonly analysisService: AnalysisService,
    ) { }

    async getPendingAnalysis() {
        let analysis = await this.analysisService.getPendingFastqAnalysis();

        return {
            status: 'success',
            message: 'Pending analysis retrieved successfully',
            data: analysis
        }
    }

    async updateAnalysisStatus(updateAnalysisStatusDto: UpdateAnalysisStatusDto) {
        const { analysisId, status } = updateAnalysisStatusDto;

        if (!analysisId || status === undefined || status === null) {
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
