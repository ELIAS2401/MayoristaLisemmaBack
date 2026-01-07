export class ClienteService {
    constructor(clienteRepository) {
        this.clienteRepository = clienteRepository;
        this.obtenerClientes = async () => {
            return this.clienteRepository.obtenerClientes();
        };
        this.crearCliente = async (data) => {
            return this.clienteRepository.crearCliente(data);
        };
        this.eliminarCliente = async (clienteId) => {
            return this.clienteRepository.eliminarCliente(clienteId);
        };
        this.obtenerClientePorId = async (clienteId) => {
            return this.clienteRepository.obtenerClientePorId(clienteId);
        };
        this.updateCliente = async (clienteId, data) => {
            return this.clienteRepository.updateCliente(clienteId, data);
        };
    }
}
