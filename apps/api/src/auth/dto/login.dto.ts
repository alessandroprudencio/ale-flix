import { IsEmail, IsStrongPassword, IsOptional, IsBoolean } from 'class-validator'

export class LoginDto {
  @IsEmail()
  email: string

  @IsStrongPassword()
  password: string

  @IsOptional()
  @IsBoolean()
  rememberMe?: boolean
}
