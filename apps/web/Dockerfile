FROM node:22-bullseye-slim

WORKDIR /app

# Instala Yarn e ferramentas para compilar módulos nativos
RUN apt-get update && apt-get install -y \
  python3 \
  make \
  g++ \
  git \
  rustc \
  cargo \
  libc6-dev \
  libssl-dev \
  pkg-config \
  && rm -rf /var/lib/apt/lists/*


# Copia os arquivos de dependência primeiro (para cache de build funcionar)
COPY package.json yarn.lock ./

# Instala dependências
RUN yarn install --frozen-lockfile

# Recompila módulos nativos (essencial para better-sqlite3)
RUN npm rebuild better-sqlite3 --build-from-source

# ⚠️ Opcional — só use isso se você **realmente precisa** do binding específico
# RUN yarn add @oxc-parser/binding-linux-x64-gnu

# Copia o restante do projeto
COPY . .

# Expõe porta padrão do Nuxt
EXPOSE 3000

# Variáveis de ambiente para Nuxt Dev
ENV NODE_ENV=development
ENV HOST=0.0.0.0
ENV PORT=3000

# Comando de inicialização
CMD ["yarn", "dev"]
