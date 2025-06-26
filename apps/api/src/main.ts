import '../tracing'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'
import fastifyCookie from '@fastify/cookie'
import multipart from '@fastify/multipart'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      // bodyLimit: 600 * 1024 * 1024, // 600MB
    }),
  )

  await app.register(multipart)

  const config = new DocumentBuilder()
    .setTitle('AleFlix API')
    .setDescription('API da plataforma de streaming AleFlix')
    .setVersion('1.0')
    .addTag('auth', 'Endpoints de autenticação')
    .addTag('media', 'Endpoints de mídia')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  )

  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  })

  await app.register(fastifyCookie, {
    secret: process.env.COOKIE_SECRET || 'my-secret-key',
    parseOptions: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    },
  })

  await app.listen(4000, '0.0.0.0')
}
bootstrap()
