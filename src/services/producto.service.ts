import { ProductoRepository } from "../repository/producto.repository.ts";
export class ProductoService {

    constructor(private productoRepository: ProductoRepository) { }

    public obtenerProductos = async () => {
        return this.productoRepository.obtenerProductos();
    }
}