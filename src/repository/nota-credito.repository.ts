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

      // ✔ validar que los productos pertenezcan a la venta
      for (const item of items) {
        const vendido = venta.detalles.find(
          d => d.productoId === item.productoId
        );

        if (!vendido) {
          throw new Error('Producto no pertenece a la venta');
        }

        if (item.cantidad > vendido.cantidad) {
          throw new Error('Cantidad inválida para devolver');
        }
      }

      const total = items.reduce(
        (sum, i) => sum + i.cantidad * Number(i.precioUnitario),
        0
      );

      const nota = await tx.nota_credito.create({
        data: {
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

      // ✔ restaurar stock
      for (const i of items) {
        await tx.producto.update({
          where: { id: i.productoId },
          data: { stock: { increment: i.cantidad } }
        });
      }

      return nota;
    });
  }

  async listar() {
    return prisma.nota_credito.findMany({
      orderBy: { fecha: 'desc' },
      include: {
        usuario: true,
        detalles: {
          include: { producto: true }
        }
      }
    });
  }
}
