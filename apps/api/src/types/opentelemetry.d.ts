declare module '@opentelemetry/sdk-trace-base' {
  export class SimpleSpanProcessor {
    constructor(exporter: any)
  }
}

declare module '@opentelemetry/sdk-node' {
  export class NodeSDK {
    constructor(config: any)
    start(): void
    shutdown(): Promise<void>
  }
}

declare module '@opentelemetry/instrumentation-http' {
  export class HttpInstrumentation {
    constructor()
  }
}

declare module '@opentelemetry/instrumentation-express' {
  export class ExpressInstrumentation {
    constructor()
  }
}

declare module '@opentelemetry/instrumentation-nestjs-core' {
  export class NestInstrumentation {
    constructor()
  }
}

declare module '@opentelemetry/semantic-conventions' {
  export const SemanticResourceAttributes: {
    SERVICE_NAME: 'service.name'
    SERVICE_VERSION: 'service.version'
    SERVICE_NAMESPACE: 'service.namespace'
    SERVICE_INSTANCE_ID: 'service.instance.id'
    DEPLOYMENT_ENVIRONMENT: 'deployment.environment'
    CLOUD_PROVIDER: 'cloud.provider'
    CLOUD_PLATFORM: 'cloud.platform'
    CLOUD_REGION: 'cloud.region'
    CLOUD_AVAILABILITY_ZONE: 'cloud.availability_zone'
    HOST_ID: 'host.id'
    HOST_TYPE: 'host.type'
    HOST_IMAGE_NAME: 'host.image.name'
    HOST_IMAGE_VERSION: 'host.image.version'
    HOST_NAME: 'host.name'
    OS_TYPE: 'os.type'
    OS_VERSION: 'os.version'
    PROCESS_RUNTIME_NAME: 'process.runtime.name'
    PROCESS_RUNTIME_VERSION: 'process.runtime.version'
    PROCESS_RUNTIME_DESCRIPTION: 'process.runtime.description'
    TELEMETRY_SDK_NAME: 'telemetry.sdk.name'
    TELEMETRY_SDK_LANGUAGE: 'telemetry.sdk.language'
    TELEMETRY_SDK_VERSION: 'telemetry.sdk.version'
  }
}

declare module '@opentelemetry/exporter-jaeger' {
  export class JaegerExporter {
    constructor(config: { endpoint: string })
  }
}

declare module '@opentelemetry/resources' {
  export class Resource {
    constructor(attributes: Record<string, string>)
  }
}
