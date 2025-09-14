-- AlterTable
ALTER TABLE "public"."Link" ADD COLUMN     "isHadRedirectLink" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "redirectTo" TEXT;
