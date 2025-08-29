/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."user" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "username" TEXT NOT NULL DEFAULT '10d3';

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "public"."user"("username");
