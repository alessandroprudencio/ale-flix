import { NodeSDK } from '@opentelemetry/sdk-node'
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http'
import { PrismaInstrumentation } from '@prisma/instrumentation'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'

const traceExporter = new OTLPTraceExporter({
  url: 'http://ale-flix-jaeger:4318/v1/traces', // Porta padrão do OTLP HTTP no Jaeger
})

const otelSDK = new NodeSDK({
  serviceName: 'aleflix-transcoder',
  traceExporter,
  instrumentations: [
    new HttpInstrumentation(),
    new PrismaInstrumentation({ middleware: true }),
  ],
})

otelSDK.start()

process.on('SIGTERM', () => {
  otelSDK.shutdown()
    .then(() => console.log('[OTEL] Encerrado com sucesso'))
    .catch((err) => console.error('[OTEL] Erro ao encerrar', err))
    .finally(() => process.exit(0))
})
