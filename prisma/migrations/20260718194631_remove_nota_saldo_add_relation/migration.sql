-- AddForeignKey
ALTER TABLE `producto` ADD CONSTRAINT `producto_categoriaId_fkey` FOREIGN KEY (`categoriaId`) REFERENCES `categoria`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `venta` ADD CONSTRAINT `venta_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `cliente`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `venta` ADD CONSTRAINT `venta_notaCreditoId_fkey` FOREIGN KEY (`notaCreditoId`) REFERENCES `nota_credito`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `venta` ADD CONSTRAINT `venta_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detalleventa` ADD CONSTRAINT `detalleventa_productoId_fkey` FOREIGN KEY (`productoId`) REFERENCES `producto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detalleventa` ADD CONSTRAINT `detalleventa_ventaId_fkey` FOREIGN KEY (`ventaId`) REFERENCES `venta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usuario` ADD CONSTRAINT `usuario_tipoUsuarioId_fkey` FOREIGN KEY (`tipoUsuarioId`) REFERENCES `tipo_usuario`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `nota_credito` ADD CONSTRAINT `nota_credito_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `nota_credito` ADD CONSTRAINT `nota_credito_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `nota_credito_detalle` ADD CONSTRAINT `nota_credito_detalle_notaCreditoId_fkey` FOREIGN KEY (`notaCreditoId`) REFERENCES `nota_credito`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `nota_credito_detalle` ADD CONSTRAINT `nota_credito_detalle_ventaDetalleId_fkey` FOREIGN KEY (`ventaDetalleId`) REFERENCES `detalleventa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
