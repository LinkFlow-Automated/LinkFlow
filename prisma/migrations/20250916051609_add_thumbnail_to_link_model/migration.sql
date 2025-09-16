/*
  Warnings:

  - You are about to drop the column `icon` on the `Link` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."ThumbnailType" AS ENUM ('icon', 'image');

-- AlterTable
ALTER TABLE "public"."Link" DROP COLUMN "icon",
ADD COLUMN     "thumbnail" TEXT,
ADD COLUMN     "type" "public"."ThumbnailType";
