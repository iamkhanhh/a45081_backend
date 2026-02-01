import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class GenerateSinglePresignedUrl {
    @ApiProperty({ example: 'sample_R1.fastq.gz', description: 'Name of the file to generate presigned URL for' })
    @IsNotEmpty()
    @IsString()
    fileName: string
}
