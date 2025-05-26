import { Type } from "class-transformer";
import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePatientInformationDto {
    @IsString()
    first_name: string;

    @IsString()
    last_name: string;

    @Type(() => Date)
    @IsDate()
    dob: Date;

    @IsString()
    phenotype: string;

    @IsNumber()
    sample_id: number;

    @IsString()
    @IsOptional()
    gender: string;

    @IsString()
    @IsOptional()
    ethnicity: string;

    @IsString()
    @IsOptional()
    sample_type: string;
}
