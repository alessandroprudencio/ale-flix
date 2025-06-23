// import { FastifyRequest } from 'fastify'
import { UserRole } from '@prisma/client'

export interface JwtPayload {
  sub: string
  email: string
  role: UserRole
}

// // Interface sem sobrescrever user
// export interface RequestWithUser extends FastifyRequest {
//   user?: JwtPayload
// }
