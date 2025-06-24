import { WebTracerProvider } from '@opentelemetry/sdk-trace-web'
import { SimpleSpanProcessor, ConsoleSpanExporter } from '@opentelemetry/sdk-trace-base'
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http'
import { registerInstrumentations } from '@opentelemetry/instrumentation'
import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch'
import { DocumentLoadInstrumentation } from '@opentelemetry/instrumentation-document-load'
import { XMLHttpRequestInstrumentation } from '@opentelemetry/instrumentation-xml-http-request'
import { resourceFromAttributes } from '@opentelemetry/resources'
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions'
import { UserInteractionInstrumentation } from '@opentelemetry/instrumentation-user-interaction'

export default defineNuxtPlugin(() => {
  const otlpExporter = new OTLPTraceExporter({
    url: 'http://localhost:8082/v1/traces',
  })

  const resource = resourceFromAttributes({
    [ATTR_SERVICE_NAME]: 'ale-flix-web',
  })
  const provider = new WebTracerProvider({
    resource,
    spanProcessors: [new SimpleSpanProcessor(otlpExporter)],
  })

  provider.register()
  ;(provider as any).addSpanProcessor?.(new SimpleSpanProcessor(new ConsoleSpanExporter()))

  registerInstrumentations({
    instrumentations: [
      new UserInteractionInstrumentation(),
      new DocumentLoadInstrumentation(),
      new FetchInstrumentation(),
      new XMLHttpRequestInstrumentation(),
    ],
  })

  console.log('[OTel] Tracing inicializado no client Nuxt - Serviço: AleFlix Frontend')
})
