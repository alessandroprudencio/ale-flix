import { IsEmail, IsStrongPassword, IsOptional, IsBoolean } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class LoginDto {
  @ApiProperty({ example: 'user@email.com', description: 'E-mail do usuário' })
  @IsEmail()
  email: string

  @ApiProperty({ example: 'Senha123!', description: 'Senha forte do usuário' })
  @IsStrongPassword()
  password: string

  @ApiProperty({
    required: false,
    type: Boolean,
    description: 'Se true, token expira em 30 dias. Se false, expira em 1 dia.',
  })
  @IsOptional()
  @IsBoolean()
  rememberMe?: boolean
}
