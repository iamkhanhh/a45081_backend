import { ApiPropertyOptional } from "@nestjs/swagger"
import { IsOptional, IsString } from "class-validator"

export class CreateAccountDto {
    @ApiPropertyOptional({ example: 'John', description: 'First name' })
    @IsOptional()
    @IsString()
    first_name: string

    @ApiPropertyOptional({ example: 'Doe', description: 'Last name' })
    @IsOptional()
    @IsString()
    last_name: string

    @ApiPropertyOptional({ example: '123 Main St, New York, NY', description: 'Address' })
    @IsOptional()
    @IsString()
    address: string

    @ApiPropertyOptional({ example: 'MIT', description: 'Institution or organization' })
    @IsOptional()
    @IsString()
    institution: string

    @ApiPropertyOptional({ example: '+1234567890', description: 'Phone number' })
    @IsOptional()
    @IsString()
    phone_number: string
}
