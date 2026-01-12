import { NotaCreditoRepository } from '../repository/nota-credito.repository.js';

export class NotaCreditoService {

    constructor(private repo: NotaCreditoRepository) { }

    crear(
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

        return this.repo.crearNotaCredito(ventaId, usuarioId, items);
    }

    listar() {
        return this.repo.listar();
    }

    listarPorVenta(ventaId: number) {
        return this.repo.listarPorVenta(ventaId);
    }
}
