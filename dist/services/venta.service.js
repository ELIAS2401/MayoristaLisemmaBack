export class VentaService {
    constructor(ventaRepository) {
        this.ventaRepository = ventaRepository;
        this.obtenerVentas = async () => {
            return this.ventaRepository.obtenerVentas();
        };
        this.anularVenta = async (ventaId) => {
            return this.ventaRepository.anularVenta(ventaId);
        };
    }
    async crearVenta(data) {
        return this.ventaRepository.crearVentaConDetalleYStock(data);
    }
}
