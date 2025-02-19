import { IsNotEmpty, IsString } from "class-validator";

export class GenerateSinglePresignedUrl {
    @IsNotEmpty()
    @IsString()
    fileName: string
}