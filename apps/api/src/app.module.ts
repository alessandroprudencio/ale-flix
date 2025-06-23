import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MediaModule } from './media/media.module'
import { PrismaModule } from './prisma/prisma.module'
import { AuthModule } from './auth/auth.module'
import { S3Service } from './shared/s3.service'
import { SqsService } from './shared/sqs.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    MediaModule,
  ],
  controllers: [],
  providers: [S3Service, SqsService],
})
export class AppModule {}
