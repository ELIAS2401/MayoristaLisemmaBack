/*
  Warnings:

  - You are about to drop the column `ventaId` on the `nota_credito` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `nota_credito` DROP FOREIGN KEY `nota_credito_ventaId_fkey`;

-- AlterTable
ALTER TABLE `nota_credito` DROP COLUMN `ventaId`;

-- AlterTable
ALTER TABLE `venta` ADD COLUMN `montoNotaUsado` DECIMAL(10, 2) NULL,
    ADD COLUMN `notaCreditoId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `venta` ADD CONSTRAINT `venta_notaCreditoId_fkey` FOREIGN KEY (`notaCreditoId`) REFERENCES `nota_credito`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
