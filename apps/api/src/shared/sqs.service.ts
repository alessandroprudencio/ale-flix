import { Injectable } from '@nestjs/common'
import {
  SQSClient,
  SendMessageCommand,
  ReceiveMessageCommand,
  DeleteMessageCommand,
  Message,
} from '@aws-sdk/client-sqs'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class SqsService {
  private sqs: SQSClient
  private queueUrl: string

  constructor(private readonly configService: ConfigService) {
    const region = this.configService.get<string>('AWS_REGION') || 'us-east-1'
    const accessKeyId = this.configService.get<string>('AWS_ACCESS_KEY_ID') || ''
    const secretAccessKey = this.configService.get<string>('AWS_SECRET_ACCESS_KEY') || ''
    const endpoint = this.configService.get<string>('AWS_SQS_ENDPOINT') || undefined
    this.sqs = new SQSClient({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
      endpoint,
    })
    this.queueUrl = this.configService.get<string>('AWS_SQS_URL') || ''
  }

  async sendMessage(messageBody: unknown, queueUrl?: string): Promise<void> {
    let body: string

    if (typeof messageBody === 'string') {
      body = messageBody
    } else if (typeof messageBody === 'object' && messageBody !== null) {
      try {
        body = JSON.stringify(messageBody)
      } catch {
        throw new Error('Failed to stringify messageBody')
      }
    } else {
      throw new Error('Invalid messageBody type for SQS')
    }

    await this.sqs.send(
      new SendMessageCommand({
        QueueUrl: queueUrl || this.queueUrl,
        MessageBody: body,
      }),
    )
  }

  async receiveMessages(maxNumberOfMessages = 1, queueUrl?: string): Promise<Message[]> {
    const result = await this.sqs.send(
      new ReceiveMessageCommand({
        QueueUrl: queueUrl || this.queueUrl,
        MaxNumberOfMessages: maxNumberOfMessages,
      }),
    )
    return result.Messages ?? []
  }

  async deleteMessage(receiptHandle: string, queueUrl?: string): Promise<void> {
    await this.sqs.send(
      new DeleteMessageCommand({
        QueueUrl: queueUrl || this.queueUrl,
        ReceiptHandle: receiptHandle,
      }),
    )
  }
}
