/*
  Warnings:

  - You are about to drop the column `emailToken` on the `EmailVerificationToken` table. All the data in the column will be lost.
  - You are about to drop the column `resetToken` on the `PasswordResetToken` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[emailTokenHash]` on the table `EmailVerificationToken` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[resetTokenHash]` on the table `PasswordResetToken` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `emailTokenHash` to the `EmailVerificationToken` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resetTokenHash` to the `PasswordResetToken` table without a default value. This is not possible if the table is not empty.
  - Made the column `username` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "EmailVerificationToken" DROP CONSTRAINT "EmailVerificationToken_userId_fkey";

-- DropForeignKey
ALTER TABLE "PasswordResetToken" DROP CONSTRAINT "PasswordResetToken_userId_fkey";

-- DropForeignKey
ALTER TABLE "RefreshSession" DROP CONSTRAINT "RefreshSession_userId_fkey";

-- DropIndex
DROP INDEX "EmailVerificationToken_emailToken_key";

-- DropIndex
DROP INDEX "PasswordResetToken_resetToken_key";

-- AlterTable
ALTER TABLE "EmailVerificationToken" DROP COLUMN "emailToken",
ADD COLUMN     "emailTokenHash" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PasswordResetToken" DROP COLUMN "resetToken",
ADD COLUMN     "resetTokenHash" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "username" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "EmailVerificationToken_emailTokenHash_key" ON "EmailVerificationToken"("emailTokenHash");

-- CreateIndex
CREATE INDEX "EmailVerificationToken_userId_idx" ON "EmailVerificationToken"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetToken_resetTokenHash_key" ON "PasswordResetToken"("resetTokenHash");

-- CreateIndex
CREATE INDEX "PasswordResetToken_userId_idx" ON "PasswordResetToken"("userId");

-- CreateIndex
CREATE INDEX "RefreshSession_userId_idx" ON "RefreshSession"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "RefreshSession" ADD CONSTRAINT "RefreshSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailVerificationToken" ADD CONSTRAINT "EmailVerificationToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PasswordResetToken" ADD CONSTRAINT "PasswordResetToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
