import { ProductoRepository } from "../repository/producto.repository.ts";
export class ProductoService {

    constructor(private productoRepository: ProductoRepository) { }

    public obtenerProductos = async () => {
        return this.productoRepository.obtenerProductos();
    }

    public crearProducto = async (data: any) => {
        return this.productoRepository.crearProducto(data);
    }

    public eliminarProducto = async (productoId: number) => {
        return this.productoRepository.eliminarProducto(productoId);
    }

    public obtenerProductoPorId = async (productoId: number) => {
        return this.productoRepository.obtenerProductoPorId(productoId);
    }

    public updateProducto = async (productoId: number, data: any) => {
        return this.productoRepository.updateProducto(productoId, data);
    }
}