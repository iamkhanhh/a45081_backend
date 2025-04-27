import { IsOptional, IsString } from "class-validator"

export class CreateAccountDto {
    @IsOptional()
    @IsString()
    first_name: string

    @IsOptional()
    @IsString()
    last_name: string

    @IsOptional()
    @IsString()
    address: string

    @IsOptional()
    @IsString()
    institution: string

    @IsOptional()
    @IsString()
    phone_number: string
}
