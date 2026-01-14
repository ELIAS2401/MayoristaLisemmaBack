import { NotaCreditoRepository } from '../repository/nota-credito.repository.js';
import { prisma } from '../prisma.js';

export class NotaCreditoService {

    constructor(private repo: NotaCreditoRepository) { }

     async crear(
        ventaId: number,
        usuarioId: number,
        items: {
            ventaDetalleId: number;
            cantidad: number;
        }[]
    ) {
        if (!items || items.length === 0) {
            throw new Error('La nota debe tener items');
        }

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

        // ✔ validar que los detalles pertenezcan a la venta
        for (const item of items) {
            const detalle = venta.detalles.find(
                d => d.id === item.ventaDetalleId
            );

            if (!detalle) {
                throw new Error('Detalle no pertenece a la venta');
            }

            const disponible =
                detalle.cantidad - detalle.cantidadAcreditada;

            if (item.cantidad > disponible) {
                throw new Error(
                    `Cantidad inválida. Disponible: ${disponible}`
                );
            }
        }

        return this.repo.crearNotaCredito({
            usuarioId,
            clienteId: venta.clienteId,
            ventaId,
            items
        });
    }

    listar() {
        return this.repo.listar();
    }
}

