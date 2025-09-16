/*
  Warnings:

  - You are about to drop the column `client_id` on the `project` table. All the data in the column will be lost.
  - You are about to drop the column `mitra` on the `project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `project` DROP COLUMN `client_id`,
    DROP COLUMN `mitra`;
