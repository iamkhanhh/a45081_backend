import { AnalysisStatus } from '@/enums';
import { IsEnum, IsNumber } from 'class-validator';

export class UpdateAnalysisStatusDto {
    @IsNumber()
    analysisId: number;
    
    @IsEnum(AnalysisStatus)
    status: number;
}
