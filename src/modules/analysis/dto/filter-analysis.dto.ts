import { IsOptional, IsString } from "class-validator";

export class FilterAnalysisDto {
    @IsOptional()
    @IsString()
    analysisName: string;

    @IsOptional()
    @IsString()
    sampleName: string;

    @IsOptional()
    @IsString()
    assembly: string;

    @IsOptional()
    @IsString()
    status: string;
}