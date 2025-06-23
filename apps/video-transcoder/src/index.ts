
import './tracing'
import { SQSClient, ReceiveMessageCommand, DeleteMessageCommand } from '@aws-sdk/client-sqs'
import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'
import { PrismaClient, MediaStatus } from '@prisma/client'
import ffmpegPath from 'ffmpeg-static'
import ffmpeg from 'fluent-ffmpeg'
import * as fs from 'fs'
import * as path from 'path'

ffmpeg.setFfmpegPath(ffmpegPath!)

const SQS_QUEUE_URL = process.env.AWS_SQS_URL
const S3_BUCKET = process.env.AWS_S3_BUCKET || ''
const REGION = process.env.AWS_REGION || ''
const ENDPOINT = process.env.AWS_ENDPOINT
const ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || ''
const SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY || ''

const sqs = new SQSClient({
  region: REGION,
  endpoint: ENDPOINT,
  credentials: { accessKeyId: ACCESS_KEY_ID, secretAccessKey: SECRET_ACCESS_KEY },
})
const s3 = new S3Client({
  region: REGION,
  endpoint: ENDPOINT,
  credentials: { accessKeyId: ACCESS_KEY_ID, secretAccessKey: SECRET_ACCESS_KEY },
  forcePathStyle: true,
})
const prisma = new PrismaClient()

async function downloadFromS3(s3Key: string, dest: string) {
  const command = new GetObjectCommand({ Bucket: S3_BUCKET, Key: s3Key })
  const data = await s3.send(command)
  const stream = data.Body as NodeJS.ReadableStream
  return new Promise<void>((resolve, reject) => {
    const file = fs.createWriteStream(dest)
    stream.pipe(file)
    file.on('finish', () => resolve())
    file.on('error', reject)
  })
}

async function uploadDirToS3(dir: string, s3Prefix: string) {
  const files = fs.readdirSync(dir)
  for (const file of files) {
    const filePath = path.join(dir, file)
    const fileContent = fs.readFileSync(filePath)
    await s3.send(
      new PutObjectCommand({
        Bucket: S3_BUCKET,
        Key: `${s3Prefix}/${file}`,
        Body: fileContent,
      }),
    )
  }
}

function getS3Url(bucket: string, key: string): string {
  const endpoint = process.env.AWS_ENDPOINT
  const region = process.env.AWS_REGION
  const isLocal = !!endpoint || process.env.NODE_ENV === 'development'

  if (isLocal) {
    return `http://localhost:4566/${bucket}/${key}`
  }

  return `https://${bucket}.s3.${region}.amazonaws.com/${key}`
}


async function processVideo(mediaId: string, s3Key: string) {
  console.log('Starting process video')

  const inputPath = '/tmp/input.mp4'
  const outputDir = '/tmp/hls-output'
  if (!fs.existsSync('/tmp')) fs.mkdirSync('/tmp')
  if (fs.existsSync(inputPath)) fs.unlinkSync(inputPath)
  if (fs.existsSync(outputDir)) fs.rmSync(outputDir, { recursive: true, force: true })
  fs.mkdirSync(outputDir)

  // 1. Baixar vídeo do S3
  console.log('Baixar vídeo do S3')
  await downloadFromS3(s3Key, inputPath)

  // 2. Gerar HLS com ffmpeg
  console.log('Gerar HLS com ffmpeg')
  await new Promise<void>((resolve, reject) => {
    ffmpeg(inputPath)
      .outputOptions([
        '-profile:v baseline',
        '-level 3.0',
        '-start_number 0',
        '-hls_time 10',
        '-hls_list_size 0',
        '-f hls',
      ])
      .output(path.join(outputDir, 'index.m3u8'))
      .on('end', () => resolve())
      .on('error', reject)
      .run()
  })

  // 3. Upload dos arquivos HLS para o S3
  const hlsPrefix = `hls/${mediaId}`
  console.log('Upload dos arquivos HLS para o S3')
  await uploadDirToS3(outputDir, hlsPrefix)

  // 4. Atualizar banco: status READY e URL HLS
  console.log('Atualizar banco: status READY e URL HLS')

  const hlsUrl = `${getS3Url(S3_BUCKET, `${hlsPrefix}/index.m3u8`)}`

  console.log(hlsUrl)
  await prisma.media.update({
    where: { id: mediaId },
    data: {
      status: MediaStatus.PUBLISHED,
      streamUrl: hlsUrl,
    },
  })

  // 5. Limpar arquivos temporários
  fs.unlinkSync(inputPath)
  fs.rmSync(outputDir, { recursive: true, force: true })
  console.log('5. Limpar arquivos temporários')
}

async function main() {
  console.log('Video transcoder worker iniciado.')

  while (true) {
    const { Messages } = await sqs.send(
      new ReceiveMessageCommand({
        QueueUrl: SQS_QUEUE_URL,
        MaxNumberOfMessages: 1,
        WaitTimeSeconds: 10,
      }),
    )
    if (!Messages || Messages.length === 0) continue
    for (const msg of Messages) {
      try {
        const { mediaId, s3Key } = JSON.parse(msg.Body!)
        await prisma.media.update({
          where: { id: mediaId },
          data: {
            status: MediaStatus.PROCESSING,
          },
        })

        await processVideo(mediaId, s3Key)

        await sqs.send(
          new DeleteMessageCommand({
            QueueUrl: SQS_QUEUE_URL,
            ReceiptHandle: msg.ReceiptHandle!,
          }),
        )

        console.log(`Processado e publicado: ${mediaId}`)
      } catch (err) {
        console.error('Erro ao processar mensagem:', err)
      }
    }
  }
}

main().catch(err => {
  console.error('Erro no worker:', err)
  process.exit(1)
})


