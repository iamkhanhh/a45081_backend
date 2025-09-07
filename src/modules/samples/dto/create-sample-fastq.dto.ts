import { Type } from "class-transformer";
import { IsArray, IsDate, IsOptional, IsString, ValidateNested } from "class-validator";

export class FastqFileDto {
    @IsString()
    uploadId: number;

    @IsString()
    uploadName: string;
}

export class CreateSampleFastQDto {
    @IsString()
    sampleName: string;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @Type(() => Date)
    @IsDate()
    dob: Date;

    @IsOptional()
    @IsString()
    phenotype?: string;

    @IsString()
    file_type: string;

    @IsString()
    file_size: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => FastqFileDto)
    forward: FastqFileDto[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => FastqFileDto)
    reverse: FastqFileDto[];
}
