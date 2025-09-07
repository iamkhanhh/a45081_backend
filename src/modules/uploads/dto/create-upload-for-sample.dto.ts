import { UploadStatus } from "@/enums/uploads.enum";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateUploadForSample {
    @IsString()
    original_name: string;

    @IsNumber()
    file_size: number;

    @IsString()
    file_type: string;

    @IsString()
    @IsOptional()
    upload_name: string;

    @IsNumber()
    @IsOptional()
    user_created: number;

    @IsString()
    @IsOptional()
    file_path: string;

    @IsEnum(UploadStatus)
    @IsNumber()
    @IsOptional()
    upload_status: number
}