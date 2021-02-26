-- CreateTable
CREATE TABLE "tasks" (
    "id" TEXT NOT NULL,
    "group" TEXT NOT NULL,
    "family" TEXT NOT NULL,
    "date" TIMESTAMP(3),
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
    "date" TIMESTAMP(3),

    PRIMARY KEY ("id")
);
