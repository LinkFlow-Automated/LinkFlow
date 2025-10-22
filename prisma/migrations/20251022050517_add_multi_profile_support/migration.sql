/*
  Warnings:

  - You are about to drop the column `bio` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `AvatarBorder` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ClickEvent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Link` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProviderAcc` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Theme` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserAvatarBorder` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."ClickEvent" DROP CONSTRAINT "ClickEvent_linkId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Link" DROP CONSTRAINT "Link_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ProviderAcc" DROP CONSTRAINT "ProviderAcc_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Theme" DROP CONSTRAINT "Theme_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserAvatarBorder" DROP CONSTRAINT "UserAvatarBorder_borderId_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserAvatarBorder" DROP CONSTRAINT "UserAvatarBorder_userId_fkey";

-- DropIndex
DROP INDEX "public"."user_username_key";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "bio",
DROP COLUMN "username";

-- DropTable
DROP TABLE "public"."AvatarBorder";

-- DropTable
DROP TABLE "public"."ClickEvent";

-- DropTable
DROP TABLE "public"."Link";

-- DropTable
DROP TABLE "public"."ProviderAcc";

-- DropTable
DROP TABLE "public"."Theme";

-- DropTable
DROP TABLE "public"."UserAvatarBorder";

-- CreateTable
CREATE TABLE "profile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "displayName" TEXT,
    "bio" TEXT,
    "image" TEXT,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "customDomain" TEXT,
    "backgroundColor" TEXT,
    "textColor" TEXT,
    "buttonStyle" TEXT,
    "fontFamily" TEXT,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "metaImage" TEXT,
    "socialLinks" JSONB,
    "views" INTEGER NOT NULL DEFAULT 0,
    "totalClicks" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "avatar_border" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "previewUrl" TEXT NOT NULL,
    "config" JSONB NOT NULL,
    "rarity" TEXT NOT NULL,
    "price" DOUBLE PRECISION,
    "currency" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "avatar_border_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profile_avatar_border" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "borderId" TEXT NOT NULL,
    "owned" BOOLEAN NOT NULL DEFAULT false,
    "equipped" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "profile_avatar_border_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "theme" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "settings" JSONB NOT NULL,
    "type" "ThemeType" NOT NULL DEFAULT 'USER',
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "profileId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "theme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "link" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "url" TEXT NOT NULL,
    "isHadRedirectLink" BOOLEAN NOT NULL DEFAULT false,
    "redirectTo" TEXT,
    "category" TEXT,
    "order" INTEGER NOT NULL,
    "clicks" INTEGER NOT NULL DEFAULT 0,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "autoSyncId" TEXT,
    "platform" TEXT,
    "thumbnail" TEXT,
    "type" "ThumbnailType",
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "visibility" "Visibility" NOT NULL DEFAULT 'PUBLIC',
    "scheduledAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3),
    "rules" JSONB,
    "layout" TEXT,
    "animation" TEXT,
    "themeOverrides" JSONB,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "link_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "click_event" (
    "id" TEXT NOT NULL,
    "linkId" TEXT NOT NULL,
    "profileId" TEXT,
    "userAgent" TEXT NOT NULL,
    "geo" JSONB,
    "device" TEXT,
    "browser" TEXT,
    "os" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "utmSource" TEXT,
    "utmMedium" TEXT,
    "utmCampaign" TEXT,
    "referrer" TEXT,

    CONSTRAINT "click_event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "provider_account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "refreshToken" TEXT,
    "expiresAt" TIMESTAMP(3),
    "scope" TEXT,

    CONSTRAINT "provider_account_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profile_username_key" ON "profile"("username");

-- CreateIndex
CREATE UNIQUE INDEX "profile_customDomain_key" ON "profile"("customDomain");

-- CreateIndex
CREATE INDEX "profile_userId_idx" ON "profile"("userId");

-- CreateIndex
CREATE INDEX "profile_username_idx" ON "profile"("username");

-- CreateIndex
CREATE INDEX "profile_customDomain_idx" ON "profile"("customDomain");

-- CreateIndex
CREATE UNIQUE INDEX "profile_avatar_border_profileId_borderId_key" ON "profile_avatar_border"("profileId", "borderId");

-- CreateIndex
CREATE INDEX "link_profileId_order_idx" ON "link"("profileId", "order");

-- CreateIndex
CREATE INDEX "link_profileId_autoSyncId_idx" ON "link"("profileId", "autoSyncId");

-- CreateIndex
CREATE INDEX "click_event_linkId_idx" ON "click_event"("linkId");

-- CreateIndex
CREATE INDEX "click_event_profileId_idx" ON "click_event"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "provider_account_provider_userId_key" ON "provider_account"("provider", "userId");

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile_avatar_border" ADD CONSTRAINT "profile_avatar_border_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile_avatar_border" ADD CONSTRAINT "profile_avatar_border_borderId_fkey" FOREIGN KEY ("borderId") REFERENCES "avatar_border"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "theme" ADD CONSTRAINT "theme_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "link" ADD CONSTRAINT "link_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "click_event" ADD CONSTRAINT "click_event_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "link"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "click_event" ADD CONSTRAINT "click_event_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "provider_account" ADD CONSTRAINT "provider_account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
