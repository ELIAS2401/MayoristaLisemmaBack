import { Request, Response } from 'express';
import { NotaCreditoService } from '../services/nota-credito.service.js';
import { NotaCreditoRepository } from '../repository/nota-credito.repository.js';

const repo = new NotaCreditoRepository();
const service = new NotaCreditoService(repo);

export class NotaCreditoController {

  crear = async (req: Request, res: Response) => {
    try {
      const ventaId = Number(req.params.id);
      const { items } = req.body;
      const usuarioId = req.user.id;

      const nota = await service.crear(ventaId, usuarioId, items);
      res.status(201).json(nota);

    } catch (e: any) {
      res.status(400).json({ message: e.message });
    }
  };

  listar = async (_: Request, res: Response) => {
    res.json(await service.listar());
  };

  listarPorVenta = async (req: Request, res: Response) => {
    res.json(await service.listarPorVenta(Number(req.params.ventaId)));
  };
}
