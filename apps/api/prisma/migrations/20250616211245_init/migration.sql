-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('MOVIE', 'SERIES', 'DOCUMENTARY');

-- CreateEnum
CREATE TYPE "MediaStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "MediaRating" AS ENUM ('G', 'PG', 'PG13', 'R', 'NC17');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "medias" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "releaseYear" TEXT NOT NULL,
    "type" "MediaType" NOT NULL DEFAULT 'MOVIE',
    "rating" "MediaRating" NOT NULL DEFAULT 'PG13',
    "genres" TEXT[],
    "directors" TEXT[],
    "cast" TEXT[],
    "thumbnailUrl" TEXT NOT NULL,
    "trailerUrl" TEXT NOT NULL,
    "streamUrl" TEXT NOT NULL,
    "status" "MediaStatus" NOT NULL DEFAULT 'DRAFT',
    "userRating" DOUBLE PRECISION DEFAULT 0,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "medias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "medias_userId_idx" ON "medias"("userId");

-- CreateIndex
CREATE INDEX "medias_genres_idx" ON "medias"("genres");

-- CreateIndex
CREATE INDEX "medias_releaseYear_idx" ON "medias"("releaseYear");

-- CreateIndex
CREATE INDEX "medias_type_idx" ON "medias"("type");

-- CreateIndex
CREATE INDEX "medias_status_idx" ON "medias"("status");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- AddForeignKey
ALTER TABLE "medias" ADD CONSTRAINT "medias_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
