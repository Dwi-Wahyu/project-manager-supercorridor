/*
  Warnings:

  - Added the required column `category` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `project` ADD COLUMN `bep` VARCHAR(191) NULL,
    ADD COLUMN `category` ENUM('ftth', 'backbone') NOT NULL,
    ADD COLUMN `client_id` INTEGER NULL,
    ADD COLUMN `home_connected` INTEGER NULL,
    ADD COLUMN `home_pass` VARCHAR(191) NULL,
    ADD COLUMN `home_port` VARCHAR(191) NULL,
    ADD COLUMN `investment_value` VARCHAR(191) NULL,
    ADD COLUMN `mitra` VARCHAR(191) NULL,
    ADD COLUMN `mos` VARCHAR(191) NULL,
    ADD COLUMN `occ` VARCHAR(191) NULL,
    ADD COLUMN `pop` VARCHAR(191) NULL,
    ADD COLUMN `regional` VARCHAR(191) NULL,
    ADD COLUMN `remaining` INTEGER NULL,
    ADD COLUMN `revenue` VARCHAR(191) NULL,
    ADD COLUMN `rfs_date` VARCHAR(191) NULL,
    ADD COLUMN `spk_number` VARCHAR(191) NULL,
    ADD COLUMN `status` VARCHAR(191) NULL,
    ADD COLUMN `toc` VARCHAR(191) NULL,
    MODIFY `project_number` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `task` ADD COLUMN `lop` VARCHAR(191) NULL,
    ADD COLUMN `port` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Client` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ClientToProject` (
    `A` INTEGER NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ClientToProject_AB_unique`(`A`, `B`),
    INDEX `_ClientToProject_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ClientToProject` ADD CONSTRAINT `_ClientToProject_A_fkey` FOREIGN KEY (`A`) REFERENCES `Client`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ClientToProject` ADD CONSTRAINT `_ClientToProject_B_fkey` FOREIGN KEY (`B`) REFERENCES `Project`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
