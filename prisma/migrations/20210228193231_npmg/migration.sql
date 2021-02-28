/*
  Warnings:

  - You are about to drop the column `type` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `notifications` table. All the data in the column will be lost.
  - Added the required column `event_type` to the `notifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `message` to the `notifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `notifierId` to the `notifications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "notifications" DROP COLUMN "type",
DROP COLUMN "description",
ADD COLUMN     "event_type" "NotifationType" NOT NULL,
ADD COLUMN     "message" TEXT NOT NULL,
ADD COLUMN     "notifierId" TEXT NOT NULL;
