# AleFlix - Movie Catalog and Streaming

## About

AleFlix is a modern movie streaming platform that offers a complete catalog of movies, trailers, and content streaming. The application is built with modern technologies and follows the best development practices.

## Features

- Complete movie catalog
- Movie trailers
- Movie streaming
- Advanced search system
- Favorites and history
- Personalized recommendations
- User profiles
- Ratings and comments

## Tecnologias Principais

- **Frontend**: Next.js 14 (App Router) + Vue.js 3
- **Backend**: NestJS
- **Banco de Dados**: PostgreSQL
- **Cache**: Redis
- **Armazenamento**: AWS S3
- **Streaming**: AWS CloudFront + MediaLive
- **Autenticação**: JWT + OAuth2
- **Monitoramento**: Prometheus + Grafana
- **Logs**: ELK Stack

## Estrutura do Projeto

```
aleflix/
├── apps/
│   ├── api/                 # Backend NestJS
│   ├── web/                 # Frontend Next.js
│   └── admin/              # Painel Admin Vue.js
├── libs/                    # Bibliotecas compartilhadas
├── docs/                    # Documentação
└── infrastructure/         # Infraestrutura IaC
```

## Documentação Detalhada

- [Arquitetura](./docs/architecture/README.md)
- [API](./docs/api/README.md)
- [Banco de Dados](./docs/database/README.md)
- [Testes](./docs/testing/README.md)
- [Deploy](./docs/deployment/README.md)

## Diagramas Visuais

- [Diagrama Arquitetural (Miro)](https://drive.google.com/file/d/1n1EI1ALYbC7QeQhSTsSwan5wOXlSah0r/view?usp=sharing)

## Requisitos

- Node.js 18+
- Docker
- AWS CLI
- Terraform

## Instalação

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env

# Iniciar em desenvolvimento
npm run dev
```

## Desenvolvimento

```bash
# Iniciar todos os serviços
npm run dev

# Iniciar apenas o backend
npm run dev:api

# Iniciar apenas o frontend
npm run dev:web

# Iniciar apenas o admin
npm run dev:admin
```

## Testes

```bash
# Executar todos os testes
npm test

# Executar testes específicos
npm run test:api
npm run test:web
npm run test:admin
```

## Deploy

```bash
# Deploy em staging
npm run deploy:staging

# Deploy em produção
npm run deploy:prod
```

## Contribuição

1. Fork o projeto
2. Crie sua branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## Licença

MIT
