import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class CreatePipelineDto {
    @ApiProperty({ example: 'My Pipeline', description: 'Pipeliine name' })
    @IsNotEmpty()
    name: string

    @ApiProperty({ example: '1.0', description: 'Pipeline version' })
    @IsNotEmpty()
    version: string
}
