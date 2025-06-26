# Variáveis de Ambiente

## Visão Geral

Este documento descreve todas as variáveis de ambiente necessárias para executar o projeto AleFlix.

## Estrutura de Arquivos

```
ale-flix/
├── apps/
│   ├── api/.env
│   ├── web/.env
│   └── video-transcoder/.env
└── .env.example
```

## API (.env)

### Banco de Dados

```bash
# URL de conexão com PostgreSQL
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ale-flix"
```

### Cache

```bash
# URL de conexão com Redis
REDIS_URL="redis://localhost:6379"
```

### Autenticação

```bash
# Chave secreta para JWT
JWT_SECRET="your-super-secret-jwt-key-change-in-production"

# Chave secreta para cookies
COOKIE_SECRET="your-super-secret-cookie-key-change-in-production"
```

### CORS

```bash
# URL do frontend para configuração de CORS
FRONTEND_URL="http://localhost:8081"
```

### Cookies

```bash
# Domínio dos cookies (opcional)
COOKIE_DOMAIN="localhost"
```

### Ambiente

```bash
# Ambiente de execução
NODE_ENV="development"
```

## Web (.env)

### API

```bash
# URL base da API
API_BASE_URL="http://localhost:4000"
```

### Ambiente

```bash
# Ambiente de execução
NODE_ENV="development"
```

## Video Transcoder (.env)

### Banco de Dados

```bash
# URL de conexão com PostgreSQL
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ale-flix"
```

### AWS (LocalStack)

```bash
# URL da fila SQS
AWS_SQS_URL="http://localhost:4566/000000000000/media-processing"

# Nome do bucket S3
AWS_S3_BUCKET="aleflix-uploads"

# Região AWS
AWS_REGION="us-east-1"

# Endpoint do LocalStack
AWS_ENDPOINT="http://localhost:4566"

# Credenciais AWS (fake para LocalStack)
AWS_ACCESS_KEY_ID="fakeAccessKeyId"
AWS_SECRET_ACCESS_KEY="fakeSecretAccessKey"
```

### Ambiente

```bash
# Ambiente de execução
NODE_ENV="development"
```

## Configuração de Desenvolvimento

### 1. Criar arquivos .env

```bash
# Na raiz do projeto
cp .env.example .env

# Para cada app
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
cp apps/video-transcoder/.env.example apps/video-transcoder/.env
```

### 2. Configurar valores

Edite cada arquivo `.env` com os valores apropriados para seu ambiente.

### 3. Verificar configuração

```bash
# Testar conexão com banco
docker-compose exec api npx prisma db push

# Testar conexão com Redis
docker-compose exec api redis-cli ping

# Testar LocalStack
curl http://localhost:4566/health
```

## Configuração de Produção

### Segurança

⚠️ **IMPORTANTE**: Em produção, sempre use:

- Senhas fortes e únicas
- Chaves secretas longas e aleatórias
- HTTPS para todas as URLs
- Domínios específicos para cookies

### Exemplo de Produção

```bash
# API
DATABASE_URL="postgresql://user:strong-password@prod-db:5432/aleflix"
REDIS_URL="redis://prod-redis:6379"
JWT_SECRET="your-very-long-and-random-secret-key-here"
COOKIE_SECRET="your-very-long-and-random-cookie-secret-here"
FRONTEND_URL="https://aleflix.com"
COOKIE_DOMAIN=".aleflix.com"
NODE_ENV="production"

# Web
API_BASE_URL="https://api.aleflix.com"
NODE_ENV="production"

# Video Transcoder
DATABASE_URL="postgresql://user:strong-password@prod-db:5432/aleflix"
AWS_SQS_URL="https://sqs.us-east-1.amazonaws.com/123456789012/media-processing"
AWS_S3_BUCKET="aleflix-uploads-prod"
AWS_REGION="us-east-1"
AWS_ACCESS_KEY_ID="your-real-aws-access-key"
AWS_SECRET_ACCESS_KEY="your-real-aws-secret-key"
NODE_ENV="production"
```

## Validação

### Script de Validação

```bash
#!/bin/bash
# validate-env.sh

echo "Validating environment variables..."

# API
if [ -z "$DATABASE_URL" ]; then
    echo "❌ DATABASE_URL is not set"
    exit 1
fi

if [ -z "$JWT_SECRET" ]; then
    echo "❌ JWT_SECRET is not set"
    exit 1
fi

if [ -z "$COOKIE_SECRET" ]; then
    echo "❌ COOKIE_SECRET is not set"
    exit 1
fi

echo "✅ All required environment variables are set"
```

### Docker Compose

O `docker-compose.yml` já está configurado para usar os arquivos `.env`:

```yaml
services:
  ale-flix-api:
    env_file:
      - ./apps/api/.env
    environment:
      - OTEL_EXPORTER_OTLP_ENDPOINT=http://nginx-cors-proxy:80/v1/traces

  ale-flix-web:
    env_file:
      - ./apps/web/.env

  ale-flix-video-transcoder:
    env_file:
      - ./apps/video-transcoder/.env
```

## Troubleshooting

### Problemas Comuns

1. **Erro de conexão com banco**

   ```bash
   # Verificar se o PostgreSQL está rodando
   docker-compose ps ale-flix-db

   # Verificar logs
   docker-compose logs ale-flix-db
   ```

2. **Erro de conexão com Redis**

   ```bash
   # Verificar se o Redis está rodando
   docker-compose ps ale-flix-redis

   # Testar conexão
   docker-compose exec ale-flix-redis redis-cli ping
   ```

3. **Erro de CORS**

   ```bash
   # Verificar se FRONTEND_URL está correto
   echo $FRONTEND_URL

   # Verificar se o nginx está rodando
   docker-compose ps nginx-cors-proxy
   ```

4. **Erro de LocalStack**

   ```bash
   # Verificar se o LocalStack está rodando
   docker-compose ps ale-flix-localstack

   # Verificar logs
   docker-compose logs ale-flix-localstack
   ```

### Logs

```bash
# Ver logs de todos os serviços
docker-compose logs

# Ver logs de um serviço específico
docker-compose logs ale-flix-api
docker-compose logs ale-flix-web
docker-compose logs ale-flix-video-transcoder
```
