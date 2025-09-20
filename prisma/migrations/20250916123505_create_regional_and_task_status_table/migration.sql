/*
  Warnings:

  - You are about to drop the column `regional` on the `project` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `project` DROP COLUMN `regional`,
    ADD COLUMN `regional_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `task` DROP COLUMN `status`,
    ADD COLUMN `status_id` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `regional` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `task_status` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `label` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `task` ADD CONSTRAINT `task_status_id_fkey` FOREIGN KEY (`status_id`) REFERENCES `task_status`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `project` ADD CONSTRAINT `project_regional_id_fkey` FOREIGN KEY (`regional_id`) REFERENCES `regional`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
