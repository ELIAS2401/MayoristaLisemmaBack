/*
  Warnings:

  - You are about to drop the column `productoId` on the `nota_credito_detalle` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `nota_credito_detalle` DROP FOREIGN KEY `nota_credito_detalle_productoId_fkey`;

-- AlterTable
ALTER TABLE `nota_credito_detalle` DROP COLUMN `productoId`;
