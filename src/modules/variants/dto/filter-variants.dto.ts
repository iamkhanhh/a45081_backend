import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

export class FilterVariantsDto {
    @ApiPropertyOptional({ example: ['chr1', 'chr2'], description: 'Filter by chromosome(s)' })
    @IsOptional()
    @IsArray()
    chrom: string[];

    @ApiPropertyOptional({ example: '>=', description: 'Allele fraction comparison sign (>=, <=, =)' })
    @IsOptional()
    @IsString()
    AFSign: string;

    @ApiPropertyOptional({ example: 0.5, description: 'Allele fraction value' })
    @IsOptional()
    @IsNumber()
    alleleFraction: number;

    @ApiPropertyOptional({ example: ['missense_variant', 'frameshift_variant'], description: 'Filter by variant annotation(s)' })
    @IsOptional()
    @IsArray()
    annotation: string[];

    @ApiPropertyOptional({ example: ['Pathogenic', 'Likely_pathogenic'], description: 'Filter by clinical classification(s)' })
    @IsOptional()
    @IsArray()
    classification: string[];

    @ApiPropertyOptional({ example: ['BRCA1', 'TP53'], description: 'Filter by gene name(s)' })
    @IsOptional()
    @IsArray()
    gene: string[];

    @ApiPropertyOptional({ example: 0.01, description: 'gnomAD allele frequency value' })
    @IsOptional()
    @IsNumber()
    gnomAd: number;

    @ApiPropertyOptional({ example: '<=', description: 'gnomAD comparison sign (>=, <=, =)' })
    @IsOptional()
    @IsString()
    gnomAdSign: string;

    @ApiPropertyOptional({ example: 30, description: 'Read depth value' })
    @IsOptional()
    @IsNumber()
    readDepth: number;

    @ApiPropertyOptional({ example: '>=', description: 'Read depth comparison sign (>=, <=, =)' })
    @IsOptional()
    @IsString()
    readDepthSign: string;
}
