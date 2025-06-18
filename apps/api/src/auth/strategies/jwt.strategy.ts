import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { ConfigService } from '@nestjs/config'
import { FastifyRequest, FastifyRequestWithCookies } from 'fastify'
import { JwtPayload } from '../types/jwt-payload.interface'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(readonly configService: ConfigService) {
    const secret = configService.get<string>('JWT_SECRET')
    if (!secret) {
      throw new Error('JWT_SECRET is not defined')
    }

    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: FastifyRequest) => {
          const req = request as FastifyRequestWithCookies

          return req.cookies?.auth_token || null
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: secret,
      passReqToCallback: true,
    })
  }

  validate(_request: FastifyRequest, payload: JwtPayload) {
    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
    }
  }
}
