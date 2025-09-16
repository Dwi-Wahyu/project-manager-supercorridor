/*
  Warnings:

  - You are about to drop the column `tahun` on the `project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `project` DROP COLUMN `tahun`,
    ADD COLUMN `year` VARCHAR(191) NULL;
