-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "MediaStatus" ADD VALUE 'PROCESSING';
ALTER TYPE "MediaStatus" ADD VALUE 'READY';
ALTER TYPE "MediaStatus" ADD VALUE 'ERROR';

-- AlterTable
ALTER TABLE "medias" ADD COLUMN     "status" "MediaStatus" NOT NULL DEFAULT 'DRAFT',
ADD COLUMN     "streamUrl" TEXT;
