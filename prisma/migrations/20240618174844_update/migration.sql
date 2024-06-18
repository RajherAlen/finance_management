/*
  Warnings:

  - Added the required column `interestRate` to the `loans` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalInstalments` to the `loans` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `loans` ADD COLUMN `interestRate` DOUBLE NOT NULL,
    ADD COLUMN `totalInstalments` DOUBLE NOT NULL;
