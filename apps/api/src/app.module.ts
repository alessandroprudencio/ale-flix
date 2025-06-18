import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MediaModule } from './media/media.module'
import { PrismaModule } from './prisma/prisma.module'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    MediaModule,
  ],
})
export class AppModule {}
