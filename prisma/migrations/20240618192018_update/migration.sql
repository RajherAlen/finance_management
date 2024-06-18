/*
  Warnings:

  - You are about to drop the column `createdAt` on the `loans` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `loans` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `loans` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `loans` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `loans` DROP COLUMN `createdAt`,
    DROP COLUMN `description`,
    DROP COLUMN `status`,
    DROP COLUMN `updatedAt`;
