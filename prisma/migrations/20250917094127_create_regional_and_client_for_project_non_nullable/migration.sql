/*
  Warnings:

  - Made the column `client_id` on table `project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `regional_id` on table `project` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `project` DROP FOREIGN KEY `project_client_id_fkey`;

-- DropForeignKey
ALTER TABLE `project` DROP FOREIGN KEY `project_regional_id_fkey`;

-- DropIndex
DROP INDEX `project_client_id_fkey` ON `project`;

-- DropIndex
DROP INDEX `project_regional_id_fkey` ON `project`;

-- AlterTable
ALTER TABLE `project` MODIFY `client_id` VARCHAR(191) NOT NULL,
    MODIFY `regional_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `project` ADD CONSTRAINT `project_client_id_fkey` FOREIGN KEY (`client_id`) REFERENCES `client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `project` ADD CONSTRAINT `project_regional_id_fkey` FOREIGN KEY (`regional_id`) REFERENCES `regional`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
