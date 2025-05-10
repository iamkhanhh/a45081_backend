import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

export class FilterVariantsDto {
    @IsOptional()
    @IsArray()
    chrom: string[];

    @IsOptional()
    @IsString()
    AFSign: string;

    @IsOptional()
    @IsNumber()
    alleleFraction: number;

    @IsOptional()
    @IsArray()
    annotation: string[];

    @IsOptional()
    @IsArray()
    classification: string[];

    @IsOptional()
    @IsArray()
    gene: string[];

    @IsOptional()
    @IsNumber()
    gnomAd: number;

    @IsOptional()
    @IsString()
    gnomAdSign: string;

    @IsOptional()
    @IsNumber()
    readDepth: number;

    @IsOptional()
    @IsString()
    readDepthSign: string;
}