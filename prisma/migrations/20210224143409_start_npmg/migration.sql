-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'RANGER', 'DOCTOR');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "npmg" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mother" TEXT NOT NULL,
    "father" TEXT NOT NULL,
    "family" TEXT NOT NULL,
    "dob" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isSilverBacked" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "families" (
    "id" TEXT NOT NULL,
    "family_name" TEXT NOT NULL,
    "leader" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users.email_unique" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "npmg.name_unique" ON "npmg"("name");

-- CreateIndex
CREATE UNIQUE INDEX "families.family_name_unique" ON "families"("family_name");

-- CreateIndex
CREATE UNIQUE INDEX "families.leader_unique" ON "families"("leader");
