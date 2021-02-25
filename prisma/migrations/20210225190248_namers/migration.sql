-- CreateTable
CREATE TABLE "namers" (
    "id" TEXT NOT NULL,
    "fullname" TEXT,
    "gorilla" TEXT NOT NULL,
    "year" INTEGER NOT NULL DEFAULT 2021,
    "comment" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "namers" ADD FOREIGN KEY ("gorilla") REFERENCES "npmg"("id") ON DELETE CASCADE ON UPDATE CASCADE;
