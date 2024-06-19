/*
  Warnings:

  - You are about to drop the column `interestRate` on the `loans` table. All the data in the column will be lost.
  - You are about to drop the column `paid` on the `loans` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `loans` DROP COLUMN `interestRate`,
    DROP COLUMN `paid`;
