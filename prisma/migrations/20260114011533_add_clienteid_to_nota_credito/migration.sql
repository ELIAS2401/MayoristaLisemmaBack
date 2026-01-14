/*
  Warnings:

  - Added the required column `clienteId` to the `nota_credito` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `nota_credito` ADD COLUMN `clienteId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `nota_credito` ADD CONSTRAINT `nota_credito_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
