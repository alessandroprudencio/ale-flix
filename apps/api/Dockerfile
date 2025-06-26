FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache openssl

COPY package.json yarn.lock ./
COPY apps/api/package.json ./

RUN yarn install

COPY apps/api .

# Inicia
CMD ["sh", "-c", "npx prisma migrate dev && npx prisma generate && yarn prisma:seed && yarn start:dev"]
