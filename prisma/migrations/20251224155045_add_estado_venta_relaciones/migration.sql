-- DropIndex
DROP INDEX `Producto_categoriaId_fkey` ON `producto`;

-- DropIndex
DROP INDEX `Usuario_tipoUsuarioId_fkey` ON `usuario`;

-- DropIndex
DROP INDEX `Venta_clienteId_fkey` ON `venta`;

-- DropIndex
DROP INDEX `Venta_usuarioId_fkey` ON `venta`;

-- AlterTable
ALTER TABLE `venta` ADD COLUMN `estado` VARCHAR(191) NOT NULL DEFAULT 'ACTIVA';

-- AddForeignKey
ALTER TABLE `producto` ADD CONSTRAINT `producto_categoriaId_fkey` FOREIGN KEY (`categoriaId`) REFERENCES `categoria`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `venta` ADD CONSTRAINT `venta_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `cliente`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `venta` ADD CONSTRAINT `venta_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detalleventa` ADD CONSTRAINT `detalleventa_ventaId_fkey` FOREIGN KEY (`ventaId`) REFERENCES `venta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detalleventa` ADD CONSTRAINT `detalleventa_productoId_fkey` FOREIGN KEY (`productoId`) REFERENCES `producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usuario` ADD CONSTRAINT `usuario_tipoUsuarioId_fkey` FOREIGN KEY (`tipoUsuarioId`) REFERENCES `tipo_usuario`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `cliente` RENAME INDEX `Cliente_cuit_key` TO `cliente_cuit_key`;

-- RenameIndex
ALTER TABLE `detalleventa` RENAME INDEX `DetalleVenta_productoId_fkey` TO `detalleventa_productoId_idx`;

-- RenameIndex
ALTER TABLE `detalleventa` RENAME INDEX `DetalleVenta_ventaId_fkey` TO `detalleventa_ventaId_idx`;

-- RenameIndex
ALTER TABLE `usuario` RENAME INDEX `Usuario_dni_key` TO `usuario_dni_key`;
