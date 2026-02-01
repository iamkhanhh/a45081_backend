import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class GeneratePresignedUrls {
    @ApiProperty({ example: 'sample_R1.fastq.gz', description: 'Name of the file to upload' })
    @IsNotEmpty()
    @IsString()
    fileName: string

    @ApiProperty({ example: 'abc123-upload-id', description: 'Multipart upload ID' })
    @IsNotEmpty()
    @IsString()
    uploadId: string

    @ApiProperty({ example: 5, description: 'Number of parts to generate URLs for' })
    @IsNotEmpty()
    @IsNumber()
    partNumbers: number
}
