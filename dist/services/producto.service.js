export class ProductoService {
    constructor(productoRepository) {
        this.productoRepository = productoRepository;
        this.obtenerProductos = async () => {
            return this.productoRepository.obtenerProductos();
        };
        this.crearProducto = async (data) => {
            return this.productoRepository.crearProducto(data);
        };
        this.eliminarProducto = async (productoId) => {
            return this.productoRepository.eliminarProducto(productoId);
        };
        this.obtenerProductoPorId = async (productoId) => {
            return this.productoRepository.obtenerProductoPorId(productoId);
        };
        this.updateProducto = async (productoId, data) => {
            return this.productoRepository.updateProducto(productoId, data);
        };
    }
}
