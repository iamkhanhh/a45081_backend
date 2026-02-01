import { ApiProperty } from '@nestjs/swagger';
import { AnalysisStatus } from '@/enums';
import { IsEnum, IsNumber } from 'class-validator';

export class UpdateAnalysisStatusDto {
    @ApiProperty({ example: 1, description: 'Analysis ID' })
    @IsNumber()
    analysisId: number;

    @ApiProperty({ example: 2, description: 'Analysis status', enum: AnalysisStatus })
    @IsEnum(AnalysisStatus)
    status: number;
}
