# Arquitetura do AleFlix

> [Diagrama Arquitetural no Draw.io](https://drive.google.com/file/d/1n1EI1ALYbC7QeQhSTsSwan5wOXlSah0r/view?usp=sharing)

## Visão Geral

O AleFlix é uma plataforma de streaming construída com uma arquitetura distribuída, focada em escalabilidade, resiliência e observabilidade.

## Diagrama de Arquitetura

```mermaid
graph TB
    subgraph Frontend
        Web[Nuxt.js Frontend<br/>Porta: 8081]
    end

    subgraph Backend
        API[NestJS API<br/>Porta: 4000]
        Auth[Auth Service]
        Media[Media Service]
        Prisma[Prisma ORM]
    end

    subgraph Services
        Transcoder[Video Transcoder<br/>Node.js + ffmpeg]
        SQS[AWS SQS<br/>LocalStack: 4566]
        S3[AWS S3<br/>LocalStack: 4566]
    end

    subgraph Infrastructure
        DB[(PostgreSQL<br/>Porta: 5432)]
        Redis[(Redis<br/>Porta: 6379)]
        Jaeger[Jaeger<br/>Porta: 16686]
    end

    subgraph Proxy
        Nginx[Nginx CORS Proxy<br/>Porta: 8082]
    end

    Web --> API
    API --> Auth
    API --> Media
    API --> Prisma
    API --> SQS
    API --> S3
    API --> Redis
    API --> Jaeger
    Prisma --> DB
    Transcoder --> SQS
    Transcoder --> S3
    Transcoder --> DB
    Nginx --> Jaeger
```

## Componentes Principais

### Frontend (Nuxt.js)

- **Porta**: 8081
- Interface responsiva com Vue 3 e Nuxt 3
- Gerenciamento de estado com Pinia
- Estilização com Tailwind CSS
- Internacionalização (i18n)
- SSR para melhor performance e SEO
- Middleware de autenticação

### Backend (NestJS)

- **Porta**: 4000
- API RESTful com Fastify
- Autenticação JWT com cookies HTTP-only
- Funcionalidade "Lembrar de mim" (30 dias vs 1 dia)
- Upload de arquivos multipart
- Integração com serviços AWS (LocalStack)
- Mensageria com SQS
- ORM Prisma para PostgreSQL

### Video Transcoder

- **Tecnologia**: Node.js + ffmpeg
- Processamento assíncrono de vídeos
- Conversão para HLS (streaming adaptativo)
- Integração com SQS para filas de processamento
- Upload para S3

### Infraestrutura

- **PostgreSQL**: Porta 5432 (banco principal)
- **Redis**: Porta 6379 (cache e sessões)
- **Jaeger**: Porta 16686 (observabilidade)
- **LocalStack**: Porta 4566 (simulação AWS)
- **Nginx**: Porta 8082 (proxy CORS)

## Fluxos Principais

### Autenticação

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant API
    participant Auth
    participant DB

    User->>Frontend: Login (com rememberMe)
    Frontend->>API: POST /auth/login
    API->>Auth: Validate Credentials
    Auth->>DB: Check User
    DB-->>Auth: User Data
    Auth-->>API: JWT Token (1d ou 30d)
    API-->>Frontend: Token + User Data
    Frontend-->>User: Welcome
```

### Upload e Transcodificação

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant API
    participant SQS
    participant Transcoder
    participant S3

    User->>Frontend: Upload Video
    Frontend->>API: POST /media (multipart)
    API->>S3: Upload Original
    API->>SQS: Queue Processing
    API-->>Frontend: Media Created
    SQS->>Transcoder: Process Video
    Transcoder->>S3: Upload HLS Files
    Transcoder->>API: Update Status
```

### Streaming de Vídeo

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant API
    participant S3

    User->>Frontend: Request Video
    Frontend->>API: GET /media/:id
    API->>S3: Get Stream URL
    S3-->>API: HLS Playlist
    API-->>Frontend: Video Data
    Frontend-->>User: Play Video
```

## Decisões Arquiteturais

### 1. **Microserviços Lightweight**

- Backend monolítico com NestJS (simplicidade)
- Serviço separado para transcodificação (processamento pesado)
- Comunicação via SQS (desacoplamento)

### 2. **Event-Driven Architecture**

- Processamento assíncrono de vídeos
- Baixo acoplamento entre serviços
- Alta resiliência

### 3. **Observabilidade**

- Rastreamento distribuído com OpenTelemetry
- Visualização de traces com Jaeger
- Logs estruturados

### 4. **Segurança**

- Autenticação JWT com cookies HTTP-only
- "Lembrar de mim" configurável
- HTTPS everywhere em produção
- CORS configurado

## Escalabilidade

### Horizontal

- Múltiplas instâncias da API
- Load balancing
- Sharding de banco de dados

### Vertical

- Auto-scaling com recursos
- Cache distribuído
- CDN para assets estáticos

## Resiliência

### Circuit Breakers

- Timeout para operações externas
- Retry policies configuráveis
- Fallback mechanisms

### Health Checks

- Endpoints de health check
- Monitoramento de dependências
- Auto-recovery

## Monitoramento

### Métricas

- Tempo de resposta da API
- Taxa de erro
- Uso de recursos
- Cache hit ratio

### Alertas

- Latência alta (> 500ms)
- Taxa de erro (> 1%)
- Uso de CPU/Memory
- Espaço em disco

## Configuração de Ambiente

### Desenvolvimento

```bash
# Portas
Frontend: 8081
API: 4000
PostgreSQL: 5432
Redis: 6379
Jaeger: 16686
LocalStack: 4566
Nginx: 8082
```

### Produção

```bash
# Variáveis de ambiente
DATABASE_URL=postgresql://user:pass@host:5432/db
REDIS_URL=redis://host:6379
JWT_SECRET=your-secret
COOKIE_SECRET=your-cookie-secret
FRONTEND_URL=https://aleflix.com
```

## Performance

### Otimizações

- Cache Redis para queries frequentes
- Índices otimizados no PostgreSQL
- Lazy loading de componentes
- CDN para assets estáticos

### Benchmarks

- Tempo de resposta API: < 200ms
- Upload de vídeo: < 30s (100MB)
- Transcodificação: < 5min (1080p)
- Cache hit ratio: > 80%
