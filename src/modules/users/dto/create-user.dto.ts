import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MinLength } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{5,}$/, {
      message: 'Minimum five characters, at least one letter, one number and one special character',
  }) 
  password: string

  @IsOptional()
  @IsString()
  first_name: string

  @IsOptional()
  @IsString()
  last_name: string

  @IsOptional()
  @IsString()
  phone_number: string

  @IsOptional()
  @IsString()
  role: string

  @IsOptional()
  @IsString()
  status: string
}
