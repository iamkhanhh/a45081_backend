import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateUploadDto {
    @ApiProperty({ example: 'sample_001.fastq.gz', description: 'Original file name' })
    @IsString()
    original_name: string;

    @ApiProperty({ example: 1048576, description: 'File size in bytes' })
    @IsNumber()
    file_size: number;

    @ApiProperty({ example: 'fastq', description: 'File type' })
    @IsString()
    file_type: string;

    @ApiProperty({ example: 'upload_abc123.fastq.gz', description: 'Upload file name' })
    @IsString()
    upload_name: string;

    @ApiProperty({ example: 1, description: 'ID of the user who created the upload' })
    @IsNumber()
    user_created: number;

    @ApiProperty({ example: '/uploads/sample_001.fastq.gz', description: 'File storage path' })
    @IsString()
    file_path: string;

    @ApiProperty({ example: 1, description: 'FASTQ pair index (1 or 2)' })
    @IsNumber()
    fastq_pair_index: number
}
