/*
  Warnings:

  - You are about to drop the `_CategoryToMedia` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `poster` to the `medias` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_CategoryToMedia" DROP CONSTRAINT "_CategoryToMedia_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToMedia" DROP CONSTRAINT "_CategoryToMedia_B_fkey";

-- DropIndex
DROP INDEX "users_email_idx";

-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "medias" ADD COLUMN     "poster" TEXT NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- DropTable
DROP TABLE "_CategoryToMedia";

-- CreateTable
CREATE TABLE "media_to_category" (
    "id" TEXT NOT NULL,
    "mediaId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "media_to_category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "media_to_category_mediaId_categoryId_key" ON "media_to_category"("mediaId", "categoryId");

-- AddForeignKey
ALTER TABLE "media_to_category" ADD CONSTRAINT "media_to_category_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "medias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "media_to_category" ADD CONSTRAINT "media_to_category_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
