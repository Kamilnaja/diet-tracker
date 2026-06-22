/*
  Warnings:

  - Changed the type of `nutriScore` on the `Food` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "NutriScore" AS ENUM ('A', 'B', 'C', 'D', 'E');

-- AlterTable
ALTER TABLE "Food" DROP COLUMN "nutriScore",
ADD COLUMN     "nutriScore" "NutriScore" NOT NULL;
