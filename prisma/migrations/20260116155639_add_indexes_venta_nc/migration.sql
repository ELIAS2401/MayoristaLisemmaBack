-- CreateIndex
CREATE INDEX `nota_credito_ventaId_idx` ON `nota_credito`(`ventaId`);

-- RenameIndex
ALTER TABLE `nota_credito` RENAME INDEX `nota_credito_clienteId_fkey` TO `nota_credito_clienteId_idx`;

-- RenameIndex
ALTER TABLE `venta` RENAME INDEX `venta_clienteId_fkey` TO `venta_clienteId_idx`;

-- RenameIndex
ALTER TABLE `venta` RENAME INDEX `venta_notaCreditoId_fkey` TO `venta_notaCreditoId_idx`;

-- RenameIndex
ALTER TABLE `venta` RENAME INDEX `venta_usuarioId_fkey` TO `venta_usuarioId_idx`;
