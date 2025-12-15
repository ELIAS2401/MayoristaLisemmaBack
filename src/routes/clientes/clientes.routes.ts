import { Router } from "express";
import { ClienteController } from "../../controllers/cliente.controller.ts";

const clienteRouter = Router();
const clienteController = new ClienteController();

clienteRouter.get('/', clienteController.getClientes.bind(clienteController));
clienteRouter.get('/:id', clienteController.getClientePorId.bind(clienteController));
clienteRouter.delete('/:id', clienteController.eliminarCliente.bind(clienteController));
clienteRouter.put('/:id', clienteController.updateCliente.bind(clienteController));
clienteRouter.post('/', clienteController.agregarCliente.bind(clienteController));

export default clienteRouter;