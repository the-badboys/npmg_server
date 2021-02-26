/*
  Warnings:

  - Added the required column `added_by` to the `tasks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tasks" ADD COLUMN     "added_by" TEXT NOT NULL,
ADD COLUMN     "isCompleted" BOOLEAN NOT NULL DEFAULT false;
