/*
  Warnings:

  - Added the required column `currentInstalment` to the `loans` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instalmentAmount` to the `loans` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `loans` ADD COLUMN `currentInstalment` INTEGER NOT NULL,
    ADD COLUMN `instalmentAmount` DOUBLE NOT NULL,
    MODIFY `interestRate` DOUBLE NULL;
