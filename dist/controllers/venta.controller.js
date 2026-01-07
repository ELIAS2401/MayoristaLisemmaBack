import { VentaService } from '../services/venta.service.js';
import { VentaRepository } from '../repository/venta.repository.js';
const ventaRepository = new VentaRepository();
const ventaService = new VentaService(ventaRepository);
export class VentaController {
    constructor() {
        this.crearVenta = async (req, res) => {
            try {
                const { clienteId, total, detalles } = req.body;
                if (!detalles || detalles.length === 0) {
                    return res.status(400).json({ message: "La venta debe tener al menos un producto" });
                }
                const venta = await ventaService.crearVenta({
                    clienteId,
                    total,
                    detalles
                });
                res.status(201).json(venta);
            }
            catch (error) {
                res.status(400).json({
                    message: error.message || "Error al registrar la venta"
                });
            }
        };
        this.getVentas = async (req, res) => {
            try {
                const ventas = await ventaService.obtenerVentas();
                res.status(200).json(ventas);
            }
            catch (error) {
                res.status(500).json({
                    message: 'Error al obtener ventas',
                    error
                });
            }
        };
        this.anularVenta = async (req, res) => {
            try {
                const ventaId = Number(req.params.id);
                await ventaService.anularVenta(ventaId);
                res.json({ message: 'Venta anulada correctamente' });
            }
            catch (error) {
                res.status(500).json({
                    message: 'Error al anular venta',
                    error
                });
            }
        };
    }
}
