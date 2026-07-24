-- CreateTable
CREATE TABLE "ab_exposure" (
    "id" TEXT NOT NULL,
    "linkId" TEXT NOT NULL,
    "variant" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ab_exposure_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ab_exposure_linkId_variant_idx" ON "ab_exposure"("linkId", "variant");

-- AddForeignKey
ALTER TABLE "ab_exposure" ADD CONSTRAINT "ab_exposure_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "link"("id") ON DELETE CASCADE ON UPDATE CASCADE;
