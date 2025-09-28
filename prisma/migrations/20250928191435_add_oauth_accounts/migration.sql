-- CreateTable
CREATE TABLE "public"."ProviderAcc" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "refreshToken" TEXT,
    "expiresAt" TIMESTAMP(3),
    "scope" TEXT,

    CONSTRAINT "ProviderAcc_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProviderAcc_provider_providerAccountId_key" ON "public"."ProviderAcc"("provider", "providerAccountId");

-- AddForeignKey
ALTER TABLE "public"."ProviderAcc" ADD CONSTRAINT "ProviderAcc_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
