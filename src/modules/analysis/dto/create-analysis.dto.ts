import { AnalysisSequencingType } from "@/enums"
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateAnalysisDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    sample_id: number

    @IsNotEmpty()
    project_id: number

    @IsNotEmpty()
    @IsString()
    p_type: string

    @IsOptional()
    size: number

    @IsOptional()
    @IsString()
    description: string

    @IsNotEmpty()
    pipeline_id: number

    @IsNotEmpty()
    @IsString()
    assembly: string

    @IsNotEmpty()
    @IsString()
    @IsEnum(AnalysisSequencingType)
    sequencing_type: AnalysisSequencingType;
}
