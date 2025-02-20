import { UploadStatus } from "@/enums/uploads.enum";
import { IsEnum, IsNumber, IsString } from "class-validator";

export class CreateUploadForSample {
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

    @IsEnum(UploadStatus)
    @IsNumber()
    upload_status: number
}