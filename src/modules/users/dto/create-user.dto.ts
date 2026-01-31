import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MinLength } from "class-validator";

export class CreateUserDto {
  @ApiProperty({ example: 'user@example.com', description: 'User email address' })
  @IsNotEmpty()
  @IsEmail()
  email: string

  @ApiProperty({ example: 'Pass@123', description: 'Minimum 5 characters, at least one letter, one number and one special character' })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{5,}$/, {
      message: 'Minimum five characters, at least one letter, one number and one special character',
  })
  password: string

  @ApiPropertyOptional({ example: 'John', description: 'User first name' })
  @IsOptional()
  @IsString()
  first_name: string

  @ApiPropertyOptional({ example: 'Doe', description: 'User last name' })
  @IsOptional()
  @IsString()
  last_name: string

  @ApiPropertyOptional({ example: '0123456789', description: 'User phone number' })
  @IsOptional()
  @IsString()
  phone_number: string

  @ApiPropertyOptional({ example: 'user', description: 'User role' })
  @IsOptional()
  @IsString()
  role: string

  @ApiPropertyOptional({ example: 'active', description: 'User status' })
  @IsOptional()
  @IsString()
  status: string
}
