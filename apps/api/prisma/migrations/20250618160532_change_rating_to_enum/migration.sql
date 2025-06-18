/*
  Warnings:

  - Changed the type of `rating` on the `medias` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "medias" DROP COLUMN "rating",
ADD COLUMN     "rating" "MediaRating" NOT NULL;
