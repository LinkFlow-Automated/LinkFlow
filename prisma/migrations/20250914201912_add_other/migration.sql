-- AlterTable
ALTER TABLE "public"."Link" ADD COLUMN     "animation" TEXT,
ADD COLUMN     "layout" TEXT,
ADD COLUMN     "metadata" JSONB,
ADD COLUMN     "themeOverrides" JSONB;
