import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class GeneratePresignedUrls {
    @IsNotEmpty()
    @IsString()
    fileName: string

    @IsNotEmpty()
    @IsString()
    uploadId: string

    @IsNotEmpty()
    @IsNumber()
    partNumbers: number
}