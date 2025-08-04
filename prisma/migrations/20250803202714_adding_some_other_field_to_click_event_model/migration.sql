/*
  Warnings:

  - The `geo` column on the `ClickEvent` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."ClickEvent" ADD COLUMN     "browser" TEXT,
ADD COLUMN     "os" TEXT,
DROP COLUMN "geo",
ADD COLUMN     "geo" JSONB;
