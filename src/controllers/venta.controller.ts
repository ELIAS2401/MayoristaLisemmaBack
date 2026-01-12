import { Request, Response } from 'express';
import { VentaService } from '../services/venta.service.js';
import { VentaRepository } from '../repository/venta.repository.js';

const ventaRepository = new VentaRepository();
const ventaService = new VentaService(ventaRepository);

export class VentaController {

    constructor() { }

    public crearVenta = async (req: Request, res: Response) => {
        try {
            console.log("USER EN REQUEST:", req.user);
            const { clienteId, total, detalles } = req.body;
            const usuarioId = req.user.id; // 👈 VIENE DEL TOKEN

            if (!detalles || detalles.length === 0) {
                return res.status(400).json({ message: "La venta debe tener al menos un producto" });
            }

            const venta = await ventaService.crearVenta({
                clienteId,
                total,
                detalles,
                usuarioId
            });

            res.status(201).json(venta);

        } catch (error: any) {
            res.status(400).json({
                message: error.message || "Error al registrar la venta"
            });
        }
    };

    public getVentas = async (req: Request, res: Response) => {
        try {
            const ventas = await ventaService.obtenerVentas();
            res.status(200).json(ventas);
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener ventas',
                error
            });
        }
    };

    public anularVenta = async (req: Request, res: Response) => {
        try {
            const ventaId = Number(req.params.id);
            await ventaService.anularVenta(ventaId);

            res.json({ message: 'Venta anulada correctamente' });
        } catch (error) {
            res.status(500).json({
                message: 'Error al anular venta',
                error
            });
        }
    };

    public generarNotaCredito = async (req: Request, res: Response) => {
        try {
            const ventaId = Number(req.params.id);
            const usuarioId = Number(req.user.id);
            const { items } = req.body;

            if (!items || items.length === 0) {
                return res.status(400).json({ message: 'No hay productos para devolver' });
            }

            const nota = await ventaService.generarNotaCredito(ventaId, usuarioId, items);

            res.status(201).json(nota);
        } catch (error: any) {
            res.status(400).json({
                message: error.message || 'Error al generar nota de crédito'
            });
        }
    };

}
