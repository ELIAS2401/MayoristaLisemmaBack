-- AddForeignKey
ALTER TABLE `nota_credito`
ADD CONSTRAINT `nota_credito_ventaId_fkey`
FOREIGN KEY (`ventaId`)
REFERENCES `venta`(`id`)
ON DELETE SET NULL
ON UPDATE CASCADE;