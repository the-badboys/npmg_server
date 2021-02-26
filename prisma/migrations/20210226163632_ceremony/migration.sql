/*
  Warnings:

  - You are about to drop the column `babies` on the `ceremonies` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ceremonies" DROP COLUMN "babies";

-- AlterTable
ALTER TABLE "npmg" ADD COLUMN     "ceremoniesId" TEXT;

-- CreateTable
CREATE TABLE "babies" (
    "id" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "npmg" ADD FOREIGN KEY ("ceremoniesId") REFERENCES "ceremonies"("id") ON DELETE SET NULL ON UPDATE CASCADE;
