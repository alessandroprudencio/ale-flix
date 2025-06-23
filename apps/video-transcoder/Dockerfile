FROM node:20-alpine

WORKDIR /app

COPY apps/video-transcoder/package.json apps/video-transcoder/yarn.lock ./

RUN yarn install

COPY apps/video-transcoder .

# CMD ["yarn", "start"]

CMD ["sh", "-c", "npx prisma generate && yarn start"]

