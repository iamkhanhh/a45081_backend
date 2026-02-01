import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class FilterAnalysisDto {
    @ApiPropertyOptional({ example: 'Analysis_Sample01', description: 'Filter by analysis name' })
    @IsOptional()
    @IsString()
    analysisName: string;

    @ApiPropertyOptional({ example: 'Sample01', description: 'Filter by sample name' })
    @IsOptional()
    @IsString()
    sampleName: string;

    @ApiPropertyOptional({ example: 'hg19', description: 'Filter by genome assembly' })
    @IsOptional()
    @IsString()
    assembly: string;

    @ApiPropertyOptional({ example: 'ANALYZED', description: 'Filter by analysis status' })
    @IsOptional()
    @IsString()
    status: string;
}
