-- CreateTable
CREATE TABLE "ceremonies" (
    "id" TEXT NOT NULL,
    "ceremony_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "names" INTEGER NOT NULL,
    "babies" INTEGER NOT NULL,
    "venue" TEXT NOT NULL,

    PRIMARY KEY ("id")
);
