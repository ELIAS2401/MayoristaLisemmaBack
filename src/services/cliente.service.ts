import { ClienteRepository } from "../repository/cliente.repository.js";
export class ClienteService {

    constructor(private clienteRepository: ClienteRepository) { }

    public obtenerClientes = async () => {
        return this.clienteRepository.obtenerClientes();
    }

    public crearCliente = async (data: any) => {
        return this.clienteRepository.crearCliente(data);
    }

    public eliminarCliente = async (clienteId: number) => {
        return this.clienteRepository.eliminarCliente(clienteId);
    }

    public obtenerClientePorId = async (clienteId: number) => {
        return this.clienteRepository.obtenerClientePorId(clienteId);
    }

    public updateCliente = async (clienteId: number, data: any) => {
        return this.clienteRepository.updateCliente(clienteId, data);
    }
}