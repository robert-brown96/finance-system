-- CreateEnum
CREATE TYPE "AccountCategory" AS ENUM ('ASSET', 'LIABILITY', 'EQUITY');

-- CreateTable
CREATE TABLE "Account" (
    "number" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "accountType" TEXT NOT NULL,
    "parentNumber" INTEGER NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("number")
);

-- CreateTable
CREATE TABLE "AccountType" (
    "name" TEXT NOT NULL,
    "isExternal" BOOLEAN NOT NULL DEFAULT false,
    "category" "AccountCategory" NOT NULL,

    CONSTRAINT "AccountType_pkey" PRIMARY KEY ("name")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_number_key" ON "Account"("number");

-- CreateIndex
CREATE UNIQUE INDEX "Account_parentNumber_key" ON "Account"("parentNumber");

-- CreateIndex
CREATE UNIQUE INDEX "AccountType_name_key" ON "AccountType"("name");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_parentNumber_fkey" FOREIGN KEY ("parentNumber") REFERENCES "Account"("number") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_accountType_fkey" FOREIGN KEY ("accountType") REFERENCES "AccountType"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
