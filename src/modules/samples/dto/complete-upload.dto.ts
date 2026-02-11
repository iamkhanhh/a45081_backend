import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, ArrayNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class PartDto {
  @ApiProperty({ example: 'd41d8cd98f00b204e9800998ecf8427e', description: 'ETag returned from the part upload' })
  @IsString()
  @IsNotEmpty()
  etag: string;
}

export class CompleteUploadDto {
  @ApiProperty({ example: 'sample_R1.fastq.gz', description: 'Name of the file being uploaded' })
  @IsString()
  @IsNotEmpty()
  fileName: string;

  @ApiProperty({ example: 'abc123-upload-id', description: 'Multipart upload ID from S3' })
  @IsString()
  @IsNotEmpty()
  uploadId: string;

  @ApiProperty({ type: [PartDto], description: 'List of completed upload parts with ETags' })
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => PartDto)
  parts: PartDto[];
}
