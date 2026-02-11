import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNumber, IsString } from "class-validator";

export class PostFileInforDto {
    @ApiProperty({ example: 'patient_sample.fastq.gz', description: 'Original file name' })
    @IsString()
    original_name: string;

    @ApiProperty({ example: 'Sample_001', description: 'Sample name' })
    @IsString()
    sample_name: string;

    @ApiProperty({ example: 1048576, description: 'File size in bytes' })
    @IsNumber()
    file_size: number;

    @ApiProperty({ example: 'fastq', description: 'File type' })
    @IsString()
    file_type: string;

    @ApiProperty({ example: 'upload_sample_001.fastq.gz', description: 'Uploaded file name in storage' })
    @IsString()
    upload_name: string;

    @ApiProperty({ example: 'John', description: 'Patient first name' })
    @IsString()
    first_name: string;

    @ApiProperty({ example: 'Doe', description: 'Patient last name' })
    @IsString()
    last_name: string;

    @ApiProperty({ example: '1990-01-15', description: 'Patient date of birth' })
    @Type(() => Date)
    @IsDate()
    dob: Date;

    @ApiProperty({ example: 'HP:0001263', description: 'Patient phenotype' })
    @IsString()
    phenotype: string;

    @ApiProperty({ example: 'hg19', description: 'Genome assembly version' })
    @IsString()
    assembly: string
}
