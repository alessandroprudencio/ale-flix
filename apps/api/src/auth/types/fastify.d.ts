import { User } from '@prisma/client'

declare module 'fastify' {
  interface FastifyRequest {
    user?: User
  }

  interface FastifyRequestWithCookies extends FastifyRequest {
    cookies: Record<string, string | undefined>
  }
}
