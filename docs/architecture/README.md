# Arquitetura do AleFlix

> [Diagrama Arquitetural no Draw.io](https://drive.google.com/file/d/1n1EI1ALYbC7QeQhSTsSwan5wOXlSah0r/view?usp=sharing)

## Visão Geral

O AleFlix é uma plataforma de streaming construída com uma arquitetura distribuída e serverless, focada em escalabilidade, resiliência e observabilidade.

## Diagrama de Arquitetura

```mermaid
graph TB
    subgraph Frontend
        Web[Nuxt.js Frontend]
    end

    subgraph Backend
        API[NestJS API]
        Auth[Auth Service]
        Media[Media Service]
    end

    subgraph Infraestrutura
        Lambda[AWS Lambda]
        SQS[AWS SQS]
        RDS[PostgreSQL RDS]
        Cache[ElastiCache]
    end

    subgraph Observabilidade
        OTEL[OpenTelemetry]
        Jaeger[Jaeger]
        Grafana[Grafana]
    end

    Web --> API
    API --> Auth
    API --> Media
    API --> Lambda
    API --> SQS
    API --> RDS
    API --> Cache
    API --> OTEL
    OTEL --> Jaeger
    OTEL --> Grafana
```

## Componentes Principais

### Frontend (Nuxt.js)

- Interface responsiva com Vue 3 e Nuxt 3
- Gerenciamento de estado com Pinia
- Estilização com Tailwind CSS e ShadCN-Vue
- Internacionalização (i18n)
- SSR para melhor performance e SEO

### Backend (NestJS)

- API RESTful com Fastify
- Autenticação JWT
- WebSockets para comunicação em tempo real
- Integração com serviços AWS
- Mensageria com SQS

### Infraestrutura

- Serverless com AWS Lambda
- Banco de dados PostgreSQL no RDS
- Cache com ElastiCache
- Mensageria com SQS
- CI/CD com GitHub Actions

### Observabilidade

- Rastreamento distribuído com OpenTelemetry
- Visualização de traces com Jaeger
- Dashboards com Grafana
- Logs estruturados

## Fluxos Principais

### Autenticação

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant API
    participant Auth
    participant DB

    User->>Frontend: Login
    Frontend->>API: POST /auth/login
    API->>Auth: Validate Credentials
    Auth->>DB: Check User
    DB-->>Auth: User Data
    Auth-->>API: JWT Token
    API-->>Frontend: Token + User Data
    Frontend-->>User: Welcome
```

### Streaming de Vídeo

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant API
    participant Media
    participant SQS
    participant Lambda

    User->>Frontend: Request Video
    Frontend->>API: GET /media/stream/:id
    API->>Media: Get Stream URL
    Media->>SQS: Queue Processing
    SQS->>Lambda: Process Video
    Lambda-->>Media: Stream Ready
    Media-->>API: Stream URL
    API-->>Frontend: Video Player
    Frontend-->>User: Play Video
```

## Decisões Arquiteturais

1. **Serverless First**

   - Escalabilidade automática
   - Pay-per-use
   - Menor overhead operacional

2. **Event-Driven Architecture**

   - Baixo acoplamento
   - Alta resiliência
   - Processamento assíncrono

3. **Observabilidade**

   - Rastreamento distribuído
   - Métricas em tempo real
   - Logs estruturados

4. **Segurança**
   - Autenticação JWT
   - HTTPS everywhere
   - Rate limiting
   - CORS configurado

## Escalabilidade

- Auto-scaling com Lambda
- Cache distribuído
- CDN para assets estáticos
- Load balancing
- Database sharding ready

## Resiliência

- Circuit breakers
- Retry policies
- Fallback mechanisms
- Health checks
- Backup strategies

## Monitoramento

- APM com OpenTelemetry
- Dashboards Grafana
- Alertas configurados
- Log aggregation
- Performance metrics
