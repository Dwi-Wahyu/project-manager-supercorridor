/*
  Warnings:

  - The primary key for the `client` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `_clienttoproject` DROP FOREIGN KEY `_ClientToProject_A_fkey`;

-- AlterTable
ALTER TABLE `_clienttoproject` MODIFY `A` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `client` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `_ClientToProject` ADD CONSTRAINT `_ClientToProject_A_fkey` FOREIGN KEY (`A`) REFERENCES `Client`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
