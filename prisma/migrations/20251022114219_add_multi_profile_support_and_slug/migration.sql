/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `profile` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "profile_slug_key" ON "profile"("slug");
