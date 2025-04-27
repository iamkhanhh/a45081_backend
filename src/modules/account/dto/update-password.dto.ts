import { IsNotEmpty, IsOptional, IsString, Matches, MinLength } from "class-validator"

export class UpdatePasswordDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
      message: 'Minimum five characters, at least one letter, one number and one special character',
  }) 
  password: string

  @IsNotEmpty()
  @IsString()
  oldPassword: string
}