-- CreateEnum
CREATE TYPE "Providers" AS ENUM ('HDFC_BANK', 'AXIS_BANK', 'SBI', 'PJN_BANK');

-- AlterTable
ALTER TABLE "OnRampTransaction" ALTER COLUMN "startTime" SET DEFAULT CURRENT_TIMESTAMP;
