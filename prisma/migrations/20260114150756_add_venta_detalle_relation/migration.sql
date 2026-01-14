/*
  Warnings:

  - Added the required column `ventaDetalleId` to the `nota_credito_detalle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `detalleventa` ADD COLUMN `cantidadAcreditada` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `nota_credito` ADD COLUMN `ventaId` INTEGER NULL;

-- AlterTable
ALTER TABLE `nota_credito_detalle` ADD COLUMN `ventaDetalleId` INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX `nota_credito_detalle_ventaDetalleId_idx` ON `nota_credito_detalle`(`ventaDetalleId`);

-- AddForeignKey
ALTER TABLE `nota_credito_detalle` ADD CONSTRAINT `nota_credito_detalle_ventaDetalleId_fkey` FOREIGN KEY (`ventaDetalleId`) REFERENCES `detalleventa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
