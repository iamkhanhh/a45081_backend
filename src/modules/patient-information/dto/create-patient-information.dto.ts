import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePatientInformationDto {
    @ApiProperty({ example: 'John', description: 'Patient first name' })
    @IsString()
    first_name: string;

    @ApiProperty({ example: 'Doe', description: 'Patient last name' })
    @IsString()
    last_name: string;

    @ApiProperty({ example: '2025-02-20T17:00:00.000Z', description: 'Patient date of birth' })
    @Type(() => Date)
    @IsDate()
    dob: Date;

    @ApiProperty({ example: 'HP:0001250', description: 'Patient phenotype' })
    @IsString()
    phenotype: string;

    @ApiProperty({ example: 1, description: 'Associated sample ID' })
    @IsNumber()
    sample_id: number;

    @ApiPropertyOptional({ example: 'Male', description: 'Patient gender' })
    @IsString()
    @IsOptional()
    gender: string;

    @ApiPropertyOptional({ example: 'Caucasian', description: 'Patient ethnicity' })
    @IsString()
    @IsOptional()
    ethnicity: string;

    @ApiPropertyOptional({ example: 'Blood', description: 'Sample type' })
    @IsString()
    @IsOptional()
    sample_type: string;
}