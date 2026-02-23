/*
  Warnings:

  - You are about to drop the `Recuring` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Recuring" DROP CONSTRAINT "Recuring_userId_fkey";

-- DropTable
DROP TABLE "Recuring";
