FROM node:20-alpine

WORKDIR /app

COPY package.json yarn.lock ./
COPY apps/video-transcoder/package.json ./

RUN yarn install

COPY apps/video-transcoder .

CMD ["sh", "-c", "npx prisma generate && yarn start"]

