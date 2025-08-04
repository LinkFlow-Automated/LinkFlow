/*
  Warnings:

  - You are about to drop the column `referrer` on the `Link` table. All the data in the column will be lost.
  - You are about to drop the column `utmCampaign` on the `Link` table. All the data in the column will be lost.
  - You are about to drop the column `utmMedium` on the `Link` table. All the data in the column will be lost.
  - You are about to drop the column `utmSource` on the `Link` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."ClickEvent" ADD COLUMN     "referrer" TEXT,
ADD COLUMN     "utmCampaign" TEXT,
ADD COLUMN     "utmMedium" TEXT,
ADD COLUMN     "utmSource" TEXT;

-- AlterTable
ALTER TABLE "public"."Link" DROP COLUMN "referrer",
DROP COLUMN "utmCampaign",
DROP COLUMN "utmMedium",
DROP COLUMN "utmSource";
