FROM node:20-alpine

WORKDIR /app

# Copie apenas os arquivos de dependências para cache eficiente
COPY package.json yarn.lock ./
COPY apps/api/package.json ./apps/api/
COPY apps/web/package.json ./apps/web/
COPY apps/video-transcoder/package.json ./apps/video-transcoder/

# Instale as dependências do monorepo
RUN yarn install

# O código será montado como volume, não precisa copiar nada aqui!

# Defina o diretório de trabalho do app específico
WORKDIR /app

# Exponha a porta adequada (ajuste conforme necessário)
EXPOSE 3000

# Comando de desenvolvimento (ajuste conforme o app)
CMD ["yarn", "dev"]