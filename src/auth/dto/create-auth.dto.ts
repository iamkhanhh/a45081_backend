import { IsNotEmpty, IsOptional } from "class-validator"

export class CreateAuthDto {
  @IsNotEmpty()
  email: string

  @IsNotEmpty()
  password: string

  @IsOptional()
  first_name: string

  @IsOptional()
  last_name: string

  @IsOptional()
  phone_number: string
}
