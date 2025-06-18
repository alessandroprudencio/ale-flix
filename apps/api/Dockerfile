# Etapa 1 - Build
FROM --platform=linux/amd64 node:20-alpine AS builder

WORKDIR /app

# Instala o Yarn
RUN apk add --no-cache python3 make g++ git openssl

# Copia apenas package.json e yarn.lock para instalar dependências
COPY package.json yarn.lock ./

# Instala dependências
RUN yarn install

COPY . .
RUN yarn build

# Etapa 2 - Runtime
FROM --platform=linux/amd64 node:20-alpine

WORKDIR /app

# Instala o Yarn
RUN apk add --no-cache python3 make g++ git openssl

# Copia apenas package.json e yarn.lock para instalar dependências
COPY package.json yarn.lock ./

# Instala dependências incluindo as de desenvolvimento
RUN yarn install

# Copia todo o código para dentro do container
COPY . .

RUN npx prisma generate

# Expõe a porta da API
EXPOSE 4000

# Configura variáveis de ambiente para desenvolvimento
ENV NODE_ENV=development
ENV PORT=4000

# Comando para rodar em modo dev com hot-reload
CMD ["yarn", "start:dev"]
