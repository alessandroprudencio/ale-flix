declare module '@fastify/cookie' {
  import { FastifyPluginCallback } from 'fastify'

  export interface FastifyCookieOptions {
    secret?: string
    parseOptions?: {
      httpOnly?: boolean
      secure?: boolean
      path?: string
      domain?: string
      sameSite?: boolean | 'lax' | 'strict' | 'none'
      maxAge?: number
      signed?: boolean
    }
  }

  const fastifyCookie: FastifyPluginCallback<FastifyCookieOptions>
  export default fastifyCookie
}
