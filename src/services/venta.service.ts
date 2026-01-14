import { VentaRepository } from "../repository/venta.repository.js";
export class VentaService {

    constructor(private ventaRepository: VentaRepository) { }

    public obtenerVentas = async () => {
        return this.ventaRepository.obtenerVentas();
    };

    async crearVenta(data: {
        clienteId?: number;
        usuarioId: number;
        total: number;
        notaCreditoId?: number;
        montoNotaUsado?: number;
        detalles: {
            productoId: number;
            cantidad: number;
            precioUnitario: number;
        }[];
    }) {
        return this.ventaRepository.crearVentaConDetalleYStock(data);
    }

    public anularVenta = async (ventaId: number) => {
        return this.ventaRepository.anularVenta(ventaId);
    };
}
