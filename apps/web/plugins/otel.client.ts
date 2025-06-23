// plugins/otel.client.ts
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web'
import { SimpleSpanProcessor, ConsoleSpanExporter } from '@opentelemetry/sdk-trace-base'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'
import { registerInstrumentations } from '@opentelemetry/instrumentation'
import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch'
import { DocumentLoadInstrumentation } from '@opentelemetry/instrumentation-document-load'
import { XMLHttpRequestInstrumentation } from '@opentelemetry/instrumentation-xml-http-request'

export default defineNuxtPlugin(() => {
  const otlpExporter = new OTLPTraceExporter({
    url: 'http://ale-flix-jaeger:4318/v1/traces',
  })
  const provider = new WebTracerProvider({
    spanProcessors: [new SimpleSpanProcessor(otlpExporter)],
  })

  provider.register()
  ;(provider as any).addSpanProcessor?.(new SimpleSpanProcessor(new ConsoleSpanExporter()))

  registerInstrumentations({
    instrumentations: [
      new DocumentLoadInstrumentation(),
      new FetchInstrumentation(),
      new XMLHttpRequestInstrumentation(),
    ],
  })

  console.log('[OTel] Tracing inicializado no client Nuxt')
})
