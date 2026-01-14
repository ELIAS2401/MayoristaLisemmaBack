/*
  Warnings:

  - You are about to alter the column `estado` on the `venta` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `venta` MODIFY `estado` ENUM('ACTIVA', 'ANULADA', 'ACREDITADA', 'PARCIALMENTE_ACREDITADA') NOT NULL DEFAULT 'ACTIVA';
