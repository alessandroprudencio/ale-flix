import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { PrismaService } from '../prisma/prisma.service'
import { CreateUserDto } from './dto/create-user.dto'
import { LoginDto } from './dto/login.dto'
import { FastifyRequest } from 'fastify'
import { FastifyReply } from 'fastify'
import '@fastify/cookie'
import { UserRole } from '@prisma/client'

export type FastifyReplyWithCookie = FastifyReply & {
  setCookie: (name: string, value: string, options?: any) => void
  clearCookie: (name: string, options?: any) => void
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(dto: CreateUserDto, res: FastifyReplyWithCookie) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    })

    if (existingUser) {
      throw new BadRequestException('E-mail já registrado.')
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10)

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        password: hashedPassword,
        role: UserRole.USER,
      },
    })

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    }

    const accessToken = await this.jwtService.signAsync(payload)

    res.setCookie('auth_token', accessToken, {
      httpOnly: true,
      path: '/',
      secure: false,
      sameSite: 'None',
      maxAge: 1000 * 60 * 60 * 24, // 1 dia
      domain: process.env.COOKIE_DOMAIN || undefined,
    })

    return {
      message: 'Usuário registrado com sucesso.',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    }
  }

  async login(dto: LoginDto, res: FastifyReplyWithCookie) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    })

    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    }

    // Define a duração do token baseado no "Lembrar de mim"
    const tokenExpiration = dto.rememberMe
      ? 1000 * 60 * 60 * 24 * 30 // 30 dias
      : 1000 * 60 * 60 * 24 // 1 dia

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: dto.rememberMe ? '30d' : '1d',
    })

    res.setCookie('auth_token', accessToken, {
      httpOnly: true,
      path: '/',
      secure: true,
      sameSite: 'None',
      maxAge: tokenExpiration,
      // domain: process.env.COOKIE_DOMAIN || undefined,
    })

    return {
      accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    }
  }

  me(req: FastifyRequest) {
    const user = req.user

    if (!user) {
      throw new UnauthorizedException('User not authenticated')
    }

    return user
  }

  logout(res: FastifyReplyWithCookie) {
    const cookieOptions = {
      httpOnly: true,
      path: '/',
      secure: true, // Deve ser igual ao usado no login
      sameSite: 'None', // Deve ser igual ao usado no login
      domain: process.env.COOKIE_DOMAIN || undefined,
    }

    res.clearCookie('auth_token', {
      ...cookieOptions,
      expires: new Date(0), // Data no passado para expirar imediatamente
    })

    return { message: 'Logout realizado com sucesso' }
  }
}
