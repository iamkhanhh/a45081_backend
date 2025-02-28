import { IsString, IsNotEmpty, ArrayNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class PartDto {
  @IsString()
  @IsNotEmpty()
  etag: string;
}

export class CompleteUploadDto {
  @IsString()
  @IsNotEmpty()
  fileName: string;

  @IsString()
  @IsNotEmpty()
  uploadId: string;

  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => PartDto)
  parts: PartDto[];
}
