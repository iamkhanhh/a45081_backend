import { PartialType } from '@nestjs/swagger';
import { CreateUploadDto } from './create-upload.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber } from 'class-validator';
import { UploadStatus } from '@/enums/uploads.enum';

export class UpdateUploadDto extends PartialType(CreateUploadDto) {
    @ApiProperty({ example: 1, description: 'Upload status (0: UPLOADING, 1: COMPLETED, 2: ERROR)', enum: UploadStatus })
    @IsEnum(UploadStatus)
    @IsNumber()
    upload_status: number
}
