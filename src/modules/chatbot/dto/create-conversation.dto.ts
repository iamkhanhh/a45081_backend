import { ApiPropertyOptional } from "@nestjs/swagger"
import { IsOptional, IsString } from "class-validator"

export class CreateConversationDto {
    @ApiPropertyOptional({ example: 'Tìm hiểu về VCF', description: 'Conversation title' })
    @IsOptional()
    @IsString()
    title?: string
}
