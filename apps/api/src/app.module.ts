import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MediaModule } from './media/media.module'
import { PrismaModule } from './prisma/prisma.module'
import { AuthModule } from './auth/auth.module'
import { S3Service } from './shared/s3.service'
import { SqsService } from './shared/sqs.service'
import { CacheModule } from '@nestjs/cache-manager'
import * as redisStore from 'cache-manager-ioredis'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    MediaModule,
    CacheModule.registerAsync({
      useFactory: () => ({
        store: redisStore,
        url: process.env.REDIS_URL || 'redis://localhost:6379',
        ttl: 60 * 5, // 5 minutos padrão
      }),
    }),
  ],
  controllers: [],
  providers: [S3Service, SqsService],
})
export class AppModule {}
