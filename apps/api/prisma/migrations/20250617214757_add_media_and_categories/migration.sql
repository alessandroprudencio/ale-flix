/*
  Warnings:

  - You are about to drop the column `cast` on the `medias` table. All the data in the column will be lost.
  - You are about to drop the column `directors` on the `medias` table. All the data in the column will be lost.
  - You are about to drop the column `genres` on the `medias` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `medias` table. All the data in the column will be lost.
  - You are about to drop the column `streamUrl` on the `medias` table. All the data in the column will be lost.
  - You are about to drop the column `trailerUrl` on the `medias` table. All the data in the column will be lost.
  - Changed the type of `releaseYear` on the `medias` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `rating` on the `medias` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropIndex
DROP INDEX "medias_genres_idx";

-- DropIndex
DROP INDEX "medias_status_idx";

-- AlterTable
ALTER TABLE "medias" DROP COLUMN "cast",
DROP COLUMN "directors",
DROP COLUMN "genres",
DROP COLUMN "status",
DROP COLUMN "streamUrl",
DROP COLUMN "trailerUrl",
ADD COLUMN     "isFeatured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isPopular" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "progress" INTEGER,
ADD COLUMN     "releaseDate" TIMESTAMP(3),
DROP COLUMN "releaseYear",
ADD COLUMN     "releaseYear" INTEGER NOT NULL,
ALTER COLUMN "type" DROP DEFAULT,
DROP COLUMN "rating",
ADD COLUMN     "rating" DOUBLE PRECISION NOT NULL;

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoryToMedia" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CategoryToMedia_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- CreateIndex
CREATE INDEX "_CategoryToMedia_B_index" ON "_CategoryToMedia"("B");

-- CreateIndex
CREATE INDEX "medias_releaseYear_idx" ON "medias"("releaseYear");

-- CreateIndex
CREATE INDEX "medias_isFeatured_idx" ON "medias"("isFeatured");

-- CreateIndex
CREATE INDEX "medias_isPopular_idx" ON "medias"("isPopular");

-- CreateIndex
CREATE INDEX "medias_releaseDate_idx" ON "medias"("releaseDate");

-- AddForeignKey
ALTER TABLE "_CategoryToMedia" ADD CONSTRAINT "_CategoryToMedia_A_fkey" FOREIGN KEY ("A") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToMedia" ADD CONSTRAINT "_CategoryToMedia_B_fkey" FOREIGN KEY ("B") REFERENCES "medias"("id") ON DELETE CASCADE ON UPDATE CASCADE;
