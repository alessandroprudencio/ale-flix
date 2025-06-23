FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache openssl

# Copia somente a pasta da API
COPY apps/api/package.json apps/api/yarn.lock ./

# Instala as dependências locais da API (inclusive @nestjs/cli)
RUN yarn install

# Copia o restante da API
COPY apps/api .

# Expõe a porta (caso use)
EXPOSE 3000

# Inicia
CMD ["sh", "-c", "npx prisma migrate dev && npx prisma generate && yarn prisma:seed && yarn start:dev"]
