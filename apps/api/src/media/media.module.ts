import { Module } from '@nestjs/common'
import { MediaController } from './media.controller'
import { MediaService } from './media.service'
import { PrismaModule } from '../prisma/prisma.module'
import { S3Service } from 'src/shared/s3.service'
import { SqsService } from 'src/shared/sqs.service'

@Module({
  imports: [PrismaModule],
  controllers: [MediaController],
  providers: [MediaService, S3Service, SqsService],
  exports: [MediaService],
})
export class MediaModule {}
