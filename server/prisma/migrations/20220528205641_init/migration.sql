/*
  Warnings:

  - You are about to drop the column `accountType` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `parentNumber` on the `Account` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[parent_number]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `account_type` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_accountType_fkey";

-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_parentNumber_fkey";

-- DropIndex
DROP INDEX "Account_parentNumber_key";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "accountType",
DROP COLUMN "parentNumber",
ADD COLUMN     "account_type" TEXT NOT NULL,
ADD COLUMN     "parent_number" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Account_parent_number_key" ON "Account"("parent_number");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_parent_number_fkey" FOREIGN KEY ("parent_number") REFERENCES "Account"("number") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_account_type_fkey" FOREIGN KEY ("account_type") REFERENCES "AccountType"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
