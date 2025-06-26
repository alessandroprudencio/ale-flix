import { NodeSDK } from '@opentelemetry/sdk-node'
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http'
import { PrismaInstrumentation } from '@prisma/instrumentation'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'
import { NestInstrumentation } from '@opentelemetry/instrumentation-nestjs-core'
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus'

const traceExporter = new OTLPTraceExporter({
  url: 'http://ale-flix-jaeger:4318/v1/traces', // Porta padrão do OTLP HTTP no Jaeger
})

const prometheusExporter = new PrometheusExporter(
  { port: 9464 }, // 9464 é padrão
  () => {
    console.log('[OTEL] Prometheus scrape endpoint: http://localhost:9464/metrics')
  },
)

const otelSDK = new NodeSDK({
  serviceName: 'ale-flix-api',
  traceExporter,
  metricReader: prometheusExporter,
  instrumentations: [
    new HttpInstrumentation(),
    new NestInstrumentation(),
    new PrismaInstrumentation({ middleware: true }),
  ],
})

otelSDK.start()

process.on('SIGTERM', () => {
  otelSDK
    .shutdown()
    .then(() => console.log('[OTEL] Encerrado com sucesso'))
    .catch(err => console.error('[OTEL] Erro ao encerrar', err))
    .finally(() => process.exit(0))
})
