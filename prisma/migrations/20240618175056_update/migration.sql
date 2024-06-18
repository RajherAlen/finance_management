/*
  Warnings:

  - The values [APPROVED,REJECTED] on the enum `loans_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `loans` MODIFY `status` ENUM('PENDING', 'COMPLETED') NOT NULL DEFAULT 'PENDING';
