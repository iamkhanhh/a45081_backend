import { PartialType } from '@nestjs/mapped-types';
import { CreateUploadDto } from './create-upload.dto';
import { IsEnum, IsNumber } from 'class-validator';
import { UploadStatus } from '@/enums/uploads.enum';

export class UpdateUploadDto extends PartialType(CreateUploadDto) {
    @IsEnum(UploadStatus)
    @IsNumber()
    upload_status: number
}
