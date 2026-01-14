import { NotaCreditoRepository } from '../repository/nota-credito.repository.js';
import { prisma } from '../prisma.js';

export class NotaCreditoService {

    constructor(private repo: NotaCreditoRepository) { }

    async crear(
        ventaId: number,
        usuarioId: number,
        items: {
            productoId: number;
            cantidad: number;
            precioUnitario: number;
        }[]
    ) {
        if (!items || items.length === 0) {
            throw new Error('La nota debe tener items');
        }

        // 🔎 validar venta y cliente
        const venta = await prisma.venta.findUnique({
            where: { id: ventaId },
            include: { detalles: true }
        });

        if (!venta) {
            throw new Error('Venta inexistente');
        }

        if (!venta.clienteId) {
            throw new Error('La venta no tiene cliente');
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

        return this.repo.crearNotaCredito({
            usuarioId,
            clienteId: venta.clienteId,
            items
        });
    }

    listar() {
        return this.repo.listar();
    }
}

