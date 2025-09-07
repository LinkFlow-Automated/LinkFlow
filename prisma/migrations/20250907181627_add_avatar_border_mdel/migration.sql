-- CreateTable
CREATE TABLE "public"."AvatarBorder" (
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

    CONSTRAINT "AvatarBorder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserAvatarBorder" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "borderId" TEXT NOT NULL,
    "owned" BOOLEAN NOT NULL DEFAULT false,
    "equipped" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UserAvatarBorder_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."UserAvatarBorder" ADD CONSTRAINT "UserAvatarBorder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserAvatarBorder" ADD CONSTRAINT "UserAvatarBorder_borderId_fkey" FOREIGN KEY ("borderId") REFERENCES "public"."AvatarBorder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
