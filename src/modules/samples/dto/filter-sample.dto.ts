import { ApiPropertyOptional } from "@nestjs/swagger"
import { IsOptional, IsString } from "class-validator"

export class FilterSampleDto {
    @ApiPropertyOptional({ example: 'fastq', description: 'Filter by file type' })
    @IsString()
    @IsOptional()
    type: string

    @ApiPropertyOptional({ example: 'Sample_001', description: 'Search by sample name or patient name' })
    @IsString()
    @IsOptional()
    searchTerm: string

    @ApiPropertyOptional({ example: 'hg19', description: 'Filter by genome assembly' })
    @IsString()
    @IsOptional()
    assembly: string
}
