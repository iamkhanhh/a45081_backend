import { Type } from "class-transformer";
import { IsDate, IsNumber, IsString } from "class-validator";

export class PostFileInforDto {
    @IsString()
    original_name: string;

    @IsString()
    sample_name: string;

    @IsNumber()
    file_size: number;

    @IsString()
    file_type: string;

    @IsString()
    upload_name: string;

    @IsString()
    first_name: string;

    @IsString()
    last_name: string;

    @Type(() => Date)
    @IsDate()
    dob: Date;

    @IsString()
    phenotype: string;

    @IsString()
    assembly: string
}