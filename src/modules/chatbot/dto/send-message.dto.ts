import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class SendMessageDto {
    @ApiProperty({ example: 'VCF là gì?', description: 'Message content to send to chatbot' })
    @IsNotEmpty()
    @IsString()
    content: string
}
