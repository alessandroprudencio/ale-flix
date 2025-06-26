import { ApiProperty } from '@nestjs/swagger'
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MinLength,
  MaxLength,
} from 'class-validator'

export class CreateUserDto {
  @ApiProperty({ example: 'user@email.com', description: 'E-mail do usuário' })
  @IsEmail()
  email: string

  @ApiProperty({ example: 'Nome do Usuário', description: 'Nome completo do usuário' })
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string

  @ApiProperty({ example: 'Senha123!', description: 'Senha forte do usuário' })
  @IsString()
  @MinLength(8)
  password: string

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  confirmPassword: string
}
