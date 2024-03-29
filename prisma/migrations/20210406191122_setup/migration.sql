-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('REPORT_CHECKED', 'ACCOUNT_UPDATED', 'VERIFY_ACCOUNT', 'NEW_GORRILLA', 'ERROR');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'RANGER', 'DOCTOR');

-- CreateEnum
CREATE TYPE "reportStatus" AS ENUM ('NSA', 'ASN', 'SAN');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "groupId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "npmg" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mother" TEXT NOT NULL DEFAULT E'',
    "father" TEXT NOT NULL DEFAULT E'',
    "family" TEXT NOT NULL DEFAULT E'',
    "gender" TEXT NOT NULL DEFAULT E'male',
    "dob" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isSilverBacked" BOOLEAN NOT NULL DEFAULT false,
    "ceremonyId" TEXT NOT NULL DEFAULT E'',
    "ceremoniesId" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "families" (
    "id" TEXT NOT NULL,
    "family_name" TEXT NOT NULL,
    "leader" TEXT NOT NULL DEFAULT E'',

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "namers" (
    "id" TEXT NOT NULL,
    "fullname" TEXT,
    "gorilla" TEXT NOT NULL,
    "ceremonyId" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reports" (
    "id" TEXT NOT NULL,
    "gorilla" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reporter" TEXT NOT NULL,
    "lungs" "reportStatus" NOT NULL DEFAULT E'NSA',
    "heart" "reportStatus" NOT NULL DEFAULT E'NSA',
    "legs" "reportStatus" NOT NULL DEFAULT E'NSA',
    "head" "reportStatus" NOT NULL DEFAULT E'NSA',
    "eyes" "reportStatus" NOT NULL DEFAULT E'NSA',
    "stomach" "reportStatus" NOT NULL DEFAULT E'NSA',

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ceremonies" (
    "id" TEXT NOT NULL,
    "ceremony_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "venue" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tasks" (
    "id" TEXT NOT NULL,
    "group" TEXT NOT NULL,
    "family" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "added_by" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attendance" (
    "id" TEXT NOT NULL,
    "attendant" TEXT NOT NULL,
    "added_by" TEXT NOT NULL,
    "isPresent" BOOLEAN NOT NULL DEFAULT true,
    "date" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notification_type" "NotificationType" NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "emailTo" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rangerGroups" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "leaderId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users.email_unique" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "npmg.name_unique" ON "npmg"("name");

-- CreateIndex
CREATE UNIQUE INDEX "families.family_name_unique" ON "families"("family_name");

-- AddForeignKey
ALTER TABLE "npmg" ADD FOREIGN KEY ("ceremoniesId") REFERENCES "ceremonies"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "namers" ADD FOREIGN KEY ("gorilla") REFERENCES "npmg"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "namers" ADD FOREIGN KEY ("ceremonyId") REFERENCES "ceremonies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD FOREIGN KEY ("reporter") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD FOREIGN KEY ("gorilla") REFERENCES "npmg"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rangerGroups" ADD FOREIGN KEY ("leaderId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
