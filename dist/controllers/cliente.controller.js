import { ClienteService } from "../services/cliente.service.js";
import { ClienteRepository } from "../repository/cliente.repository.js";
const clienteRepository = new ClienteRepository();
const clienteService = new ClienteService(clienteRepository);
export class ClienteController {
    constructor() {
        this.getClientes = async (req, res) => {
            try {
                const clientes = await clienteService.obtenerClientes();
                res.status(200).json(clientes);
            }
            catch (error) {
                res.status(500).json({ message: "Error al obtener clientes", error });
            }
        };
        this.agregarCliente = async (req, res) => {
            try {
                const data = req.body;
                const cliente = await clienteService.crearCliente(data);
                // Aquí deberías agregar la lógica para guardar el nuevo cliente en la base de datos
                res.status(201).json({ message: "Cliente agregado exitosamente", cliente: cliente });
            }
            catch (error) {
                res.status(500).json({ message: "Error al agregar cliente", error });
            }
        };
        this.eliminarCliente = async (req, res) => {
            try {
                const clienteId = Number(req.params.id);
                await clienteService.eliminarCliente(clienteId);
                res.json({ message: "Cliente eliminado exitosamente" });
            }
            catch (error) {
                res.status(500).json({ message: "Error al eliminar cliente", error });
            }
        };
        this.getClientePorId = async (req, res) => {
            try {
                const clienteId = Number(req.params.id);
                const cliente = await clienteService.obtenerClientePorId(clienteId);
                if (!cliente) {
                    return res.status(404).json({ message: "Cliente no encontrado" });
                }
                res.status(200).json(cliente);
            }
            catch (error) {
                res.status(500).json({ message: "Error al obtener cliente por ID", error });
            }
        };
        this.updateCliente = async (req, res) => {
            try {
                const id = Number(req.params.id);
                const data = req.body;
                const clienteActualizado = await clienteService.updateCliente(id, data);
                res.status(200).json({
                    message: "Cliente actualizado correctamente",
                    cliente: clienteActualizado
                });
            }
            catch (error) {
                res.status(500).json({
                    message: "Error al actualizar cliente",
                    error: error.message
                });
            }
        };
    }
}
