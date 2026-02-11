import { UploadStatus } from "@/enums/uploads.enum";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateUploadForSample {
    @ApiProperty({ example: 'sample_001.fastq.gz', description: 'Original file name' })
    @IsString()
    original_name: string;

    @ApiProperty({ example: 1048576, description: 'File size in bytes' })
    @IsNumber()
    file_size: number;

    @ApiProperty({ example: 'fastq', description: 'File type' })
    @IsString()
    file_type: string;

    @ApiPropertyOptional({ example: 'upload_abc123.fastq.gz', description: 'Upload file name' })
    @IsString()
    @IsOptional()
    upload_name: string;

    @ApiPropertyOptional({ example: 1, description: 'ID of the user who created the upload' })
    @IsNumber()
    @IsOptional()
    user_created: number;

    @ApiPropertyOptional({ example: '/uploads/sample_001.fastq.gz', description: 'File storage path' })
    @IsString()
    @IsOptional()
    file_path: string;

    @ApiPropertyOptional({ example: 0, description: 'Upload status (0: UPLOADING, 1: COMPLETED, 2: ERROR)', enum: UploadStatus })
    @IsEnum(UploadStatus)
    @IsNumber()
    @IsOptional()
    upload_status: number
}
