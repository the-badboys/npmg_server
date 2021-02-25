-- CreateEnum
CREATE TYPE "reportStatus" AS ENUM ('NSA', 'ASN', 'SAN');

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

-- AddForeignKey
ALTER TABLE "reports" ADD FOREIGN KEY ("reporter") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD FOREIGN KEY ("gorilla") REFERENCES "npmg"("id") ON DELETE CASCADE ON UPDATE CASCADE;
