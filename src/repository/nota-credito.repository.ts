import { prisma } from '../prisma.js';

export class NotaCreditoRepository {

  async crearNotaCredito(
    ventaId: number,
    usuarioId: number,
    items: {
      productoId: number;
      cantidad: number;
      precioUnitario: number;
    }[]
  ) {

    return prisma.$transaction(async (tx) => {

      const venta = await tx.venta.findUnique({
        where: { id: ventaId },
        include: { detalles: true }
      });

      if (!venta || venta.estado === 'ANULADA') {
        throw new Error('Venta inválida');
      }

      // validar cantidades
      for (const item of items) {
        const vendido = venta.detalles.find(
          d => d.productoId === item.productoId
        );

        if (!vendido || item.cantidad > vendido.cantidad) {
          throw new Error('Cantidad inválida para devolución');
        }
      }

      const total = items.reduce(
        (sum, i) => sum + i.cantidad * Number(i.precioUnitario),
        0
      );

      const nota = await tx.nota_credito.create({
        data: {
          ventaId,
          usuarioId,
          total,
          detalles: {
            create: items.map(i => ({
              productoId: i.productoId,
              cantidad: i.cantidad,
              precioUnitario: i.precioUnitario
            }))
          }
        }
      });

      // restaurar stock
      for (const i of items) {
        await tx.producto.update({
          where: { id: i.productoId },
          data: { stock: { increment: i.cantidad } }
        });
      }

      return nota;
    });
  }

  listar() {
    return prisma.nota_credito.findMany({
      orderBy: { fecha: 'desc' },
      include: {
        usuario: true,
        venta: true,
        detalles: { include: { producto: true } }
      }
    });
  }

  listarPorVenta(ventaId: number) {
    return prisma.nota_credito.findMany({
      where: { ventaId },
      include: {
        detalles: { include: { producto: true } }
      }
    });
  }
}
