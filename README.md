# AleFlix

## Preview do App

![Preview do App](./docs/assets/app.png)

## Sobre

AleFlix é uma plataforma de streaming de vídeos com catálogo, upload, transcodificação e reprodução de mídia, construída como desafio técnico. O sistema é composto por frontend (Nuxt 3), backend (NestJS), serviço de transcodificação, infraestrutura Docker e exemplos de integração com AWS (via LocalStack).

## Principais Features

- ✅ Catálogo de filmes, séries e documentários
- ✅ Upload e transcodificação automática de vídeos
- ✅ Reprodução via HLS (streaming adaptativo)
- ✅ Autenticação JWT com "Lembrar de mim"
- ✅ Administração de mídia (CRUD)
- ✅ Sistema de categorias
- ✅ Avaliações e visualizações
- ✅ Exemplos de dados reais para testes
- ✅ Observabilidade com Jaeger
- ✅ Cache com Redis

## Tecnologias

- **Frontend:** Nuxt 3 (Vue.js) + Tailwind CSS
- **Backend:** NestJS + Fastify + Prisma
- **Transcoder:** Node.js + ffmpeg (apps/video-transcoder)
- **Banco de Dados:** PostgreSQL
- **Cache:** Redis
- **Armazenamento:** AWS S3 (simulado via LocalStack)
- **Observabilidade:** Jaeger (tracing)
- **Infraestrutura:** Docker Compose
- **Mensageria:** AWS SQS (simulado via LocalStack)

## Estrutura do Projeto

```
ale-flix/
├── apps/
│   ├── api/                # Backend NestJS
│   ├── web/                # Frontend Nuxt 3 (Vue.js)
│   └── video-transcoder/   # Serviço de transcodificação de vídeo
├── packages/               # Pacotes compartilhados (auth, types, utils)
├── docs/                   # Documentação
├── infrastructure/         # Infraestrutura (amplify, lambdas)
├── example-data/           # Exemplos de mídia e metadados
└── localstack-data/        # Dados do LocalStack
```

## Exemplos de Dados

- `example-data/movie/Jennifer.1978.mp4`
- `example-data/documentary/A_Perfect_Planet_1_Volcano.mp4`
- Metadados em `.md` e imagens de poster

## Como rodar

```bash
# Subir todos os serviços (recomendado)
docker-compose up --build

# Acesse:
# - Frontend: http://localhost:8081
# - Backend API: http://localhost:4000
# - Jaeger (tracing): http://localhost:16686
# - LocalStack: http://localhost:4566
# - Redis: localhost:6379
# - PostgreSQL: localhost:5432
```

## Variáveis de Ambiente

### API (.env)

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ale-flix"
REDIS_URL="redis://localhost:6379"
JWT_SECRET="your-jwt-secret"
COOKIE_SECRET="your-cookie-secret"
FRONTEND_URL="http://localhost:8081"
```

### Web (.env)

```bash
API_BASE_URL="http://localhost:4000"
```

### Video Transcoder (.env)

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ale-flix"
AWS_SQS_URL="http://localhost:4566/000000000000/media-processing"
AWS_S3_BUCKET="aleflix-uploads"
AWS_REGION="us-east-1"
AWS_ENDPOINT="http://localhost:4566"
AWS_ACCESS_KEY_ID="fakeAccessKeyId"
AWS_SECRET_ACCESS_KEY="fakeSecretAccessKey"
```

## Componentes e Páginas

- **Catálogo:** `/movies`, `/series`, `/documentary`
- **Player:** `/player/[id]`
- **Admin:** `/admin/media`
- **Autenticação:** `/login`, `/signup`
- **Componentes:** `media-card.vue`, `media-form.vue`, `video-player.vue`

## Funcionalidades Implementadas

### Autenticação

- ✅ Login/Logout com JWT
- ✅ "Lembrar de mim" (30 dias vs 1 dia)
- ✅ Cookies HTTP-only seguros
- ✅ Middleware de autenticação

### Mídia

- ✅ CRUD completo de mídia
- ✅ Upload de arquivos
- ✅ Transcodificação automática
- ✅ Streaming HLS
- ✅ Categorização
- ✅ Avaliações e visualizações

### Admin

- ✅ Painel administrativo
- ✅ Gerenciamento de mídia
- ✅ Upload de arquivos
- ✅ Edição de metadados

## Documentação

- [Arquitetura](./docs/architecture/README.md)
- [API](./docs/api/README.md)
- [Banco de Dados](./docs/database/README.md)
- [Variáveis de Ambiente](./docs/environment.md)
- [Testes](./docs/testing/README.md)
- [Deploy](./docs/deployment/README.md)

## Licença

MIT

## Diagrama do Fluxo de Logs e Observabilidade

O diagrama abaixo mostra como os logs, traces e métricas fluem pela aplicação AleFlix, desde a requisição do usuário até os sistemas de observabilidade e logs.

```mermaid
flowchart TD
  A[Usuário faz requisição] --> B[Nuxt 3 (web)]
  B --> C[NestJS API]
  C --> D[OpenTelemetry SDK]
  C --> E[Logger NestJS / Console]
  D -- Traces --> F[Jaeger]
  D -- Métricas --> G[Prometheus]
  E -- stdout/stderr --> H[Docker Logs / Cloud Logs]
  C -- Erros HTTP --> B
```
