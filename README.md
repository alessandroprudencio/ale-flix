# AleFlix (Watch Brasil Challenge)

## Sobre

AleFlix é uma plataforma de streaming de vídeos com catálogo, upload, transcodificação e reprodução de mídia, construída como desafio técnico. O sistema é composto por frontend (Nuxt 3), backend (NestJS), serviço de transcodificação, infraestrutura Docker e exemplos de integração com AWS (via LocalStack).

## Principais Features

- Catálogo de filmes, séries e documentários
- Upload e transcodificação automática de vídeos
- Reprodução via HLS (streaming adaptativo)
- Autenticação JWT
- Administração de mídia (CRUD)
- Exemplos de dados reais para testes

## Tecnologias

- **Frontend:** Nuxt 3 (Vue.js)
- **Backend:** NestJS
- **Transcoder:** Node.js + ffmpeg (apps/video-transcoder)
- **Banco de Dados:** PostgreSQL
- **Cache:** Redis
- **Armazenamento:** AWS S3 (simulado via LocalStack)
- **Observabilidade:** Jaeger (tracing)
- **Infraestrutura:** Docker Compose

## Estrutura do Projeto

```
watch-brasil-challenge/
├── apps/
│   ├── api/                # Backend NestJS
│   ├── web/                # Frontend Nuxt 3 (Vue.js)
│   └── video-transcoder/   # Serviço de transcodificação de vídeo
├── packages/               # Pacotes compartilhados (auth, types, utils)
├── docs/                   # Documentação
├── infrastructure/         # Infraestrutura (amplify, lambdas)
└── example-data/           # Exemplos de mídia e metadados
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
```

## Componentes e Páginas

- Catálogo: `/movies`, `/series`, `/documentary`
- Player: `/player/[id]`
- Admin: `/admin/media`
- Autenticação: `/login`, `/signup`
- Componentes: `media-card.vue`, `media-form.vue`, `video-player.vue`

## Documentação

- [Arquitetura](./docs/architecture/README.md)
- [API](./docs/api/README.md)
- [Banco de Dados](./docs/database/README.md)
- [Testes](./docs/testing/README.md)
- [Deploy](./docs/deployment/README.md)

## Licença

MIT
