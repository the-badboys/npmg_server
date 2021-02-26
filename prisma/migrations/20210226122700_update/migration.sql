/*
  Warnings:

  - You are about to drop the column `names` on the `ceremonies` table. All the data in the column will be lost.
  - Added the required column `title` to the `ceremonies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `ceremonies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ceremonies" DROP COLUMN "names",
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL;
