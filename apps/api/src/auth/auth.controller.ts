import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Res,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common'
import { AuthService, FastifyReplyWithCookie } from './auth.service'
import { CreateUserDto } from './dto/create-user.dto'
import { LoginDto } from './dto/login.dto'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { FastifyRequest } from 'fastify'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { RolesGuard } from './guards/roles.guard'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Registrar novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário registrado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  signup(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: FastifyReplyWithCookie,
  ) {
    return this.authService.signup(createUserDto, res)
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Autenticar usuário' })
  @ApiResponse({ status: 200, description: 'Login bem-sucedido' })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
  login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: FastifyReplyWithCookie) {
    return this.authService.login(loginDto, res)
  }

  @Get('me')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Informacoes do usuario' })
  @ApiResponse({ status: 200, description: 'Sucesso' })
  me(@Req() req: FastifyRequest) {
    return this.authService.me(req)
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Res({ passthrough: true }) res: FastifyReplyWithCookie) {
    return this.authService.logout(res)
  }
}
