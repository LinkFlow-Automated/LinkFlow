/*
  Warnings:

  - A unique constraint covering the columns `[provider,providerAccountId,userId]` on the table `ProviderAcc` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."ProviderAcc_provider_providerAccountId_key";

-- CreateIndex
CREATE UNIQUE INDEX "ProviderAcc_provider_providerAccountId_userId_key" ON "public"."ProviderAcc"("provider", "providerAccountId", "userId");
