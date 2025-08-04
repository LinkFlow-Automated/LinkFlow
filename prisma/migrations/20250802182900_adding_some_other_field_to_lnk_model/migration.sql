/*
  Warnings:

  - You are about to drop the column `sortOrder` on the `Link` table. All the data in the column will be lost.
  - Added the required column `order` to the `Link` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."Visibility" AS ENUM ('PUBLIC', 'PRIVATE', 'SCHEDULED');

-- AlterTable
ALTER TABLE "public"."Link" DROP COLUMN "sortOrder",
ADD COLUMN     "autoSyncId" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "icon" TEXT,
ADD COLUMN     "isArchived" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "order" INTEGER NOT NULL,
ADD COLUMN     "platform" TEXT,
ADD COLUMN     "referrer" TEXT,
ADD COLUMN     "utmCampaign" TEXT,
ADD COLUMN     "utmMedium" TEXT,
ADD COLUMN     "utmSource" TEXT,
ADD COLUMN     "visibility" "public"."Visibility" NOT NULL DEFAULT 'PUBLIC';

-- CreateIndex
CREATE INDEX "Link_userId_order_idx" ON "public"."Link"("userId", "order");

-- CreateIndex
CREATE INDEX "Link_userId_autoSyncId_idx" ON "public"."Link"("userId", "autoSyncId");
