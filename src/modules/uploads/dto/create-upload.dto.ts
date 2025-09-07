import { IsNumber, IsString } from "class-validator";

export class CreateUploadDto {
    @IsString()
    original_name: string;

    @IsNumber()
    file_size: number;

    @IsString()
    file_type: string;

    @IsString()
    upload_name: string;

    @IsNumber()
    user_created: number;

    @IsString()
    file_path: string;

    @IsNumber()
    fastq_pair_index: number
}
