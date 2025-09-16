/*
  Warnings:

  - You are about to drop the `_clienttoproject` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_clienttoproject` DROP FOREIGN KEY `_ClientToProject_A_fkey`;

-- DropForeignKey
ALTER TABLE `_clienttoproject` DROP FOREIGN KEY `_ClientToProject_B_fkey`;

-- DropForeignKey
ALTER TABLE `task` DROP FOREIGN KEY `Task_project_id_fkey`;

-- DropIndex
DROP INDEX `Task_project_id_fkey` ON `task`;

-- AlterTable
ALTER TABLE `project` ADD COLUMN `client_id` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `_clienttoproject`;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `Client`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
