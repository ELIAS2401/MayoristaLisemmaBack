import { type Request, type Response } from "express";
import { ClienteService } from "../services/cliente.service.ts";
import { ClienteRepository } from "../repository/cliente.repository.ts";


const clienteRepository = new ClienteRepository();
const clienteService = new ClienteService(clienteRepository);
export class ClienteController {

    constructor() { }

    public getClientes = async (req: Request, res: Response) => {
        try {
            const clientes = await clienteService.obtenerClientes();
            res.status(200).json(clientes);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener clientes", error })
        }
    }
    public agregarCliente = async (req: Request, res: Response) => {
        try {
            const data = req.body;
            const cliente = await clienteService.crearCliente(data);
            // Aquí deberías agregar la lógica para guardar el nuevo cliente en la base de datos
            res.status(201).json({ message: "Cliente agregado exitosamente", cliente: cliente });
        } catch (error) {
            res.status(500).json({ message: "Error al agregar cliente", error });
        }
    }

    public eliminarCliente = async (req: Request, res: Response) => {
        try {
            const clienteId = Number(req.params.id);

            await clienteService.eliminarCliente(clienteId);
            res.json({ message: "Cliente eliminado exitosamente" });
        } catch (error) {
            res.status(500).json({ message: "Error al eliminar cliente", error });
        }
    }

    public getClientePorId = async (req: Request, res: Response) => {
        try {
            const clienteId = Number(req.params.id);
            const cliente = await clienteService.obtenerClientePorId(clienteId);

            if (!cliente) {
                return res.status(404).json({ message: "Cliente no encontrado" });
            }

            res.status(200).json(cliente);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener cliente por ID", error });
        }
    }
    public updateCliente = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            const data = req.body;

            const clienteActualizado = await clienteService.updateCliente(id, data);

            res.status(200).json({
                message: "Cliente actualizado correctamente",
                cliente: clienteActualizado
            });

        } catch (error: any) {
            res.status(500).json({
                message: "Error al actualizar cliente",
                error: error.message
            });
        }
    }


}