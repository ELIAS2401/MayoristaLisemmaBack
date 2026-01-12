/*
  Warnings:

  - Added the required column `usuarioId` to the `nota_credito` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `nota_credito` ADD COLUMN `usuarioId` INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX `nota_credito_usuarioId_idx` ON `nota_credito`(`usuarioId`);

-- AddForeignKey
ALTER TABLE `nota_credito` ADD CONSTRAINT `nota_credito_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
