import { type Request, type Response } from "express";
import { ProductoService } from "../services/producto.service.js";
import { ProductoRepository } from "../repository/producto.repository.js";

const productoRepository = new ProductoRepository();
const productoService = new ProductoService(productoRepository);

export class ProductoController {

    constructor() { }

    public getProductos = async (req: Request, res: Response) => {
        try {
            const productos = await productoService.obtenerProductos();
            res.status(200).json(productos);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener productos", error })
        }
    }

    public agregarProducto = async (req: Request, res: Response) => {
        try {
            const data = req.body;
            const producto = await productoService.crearProducto(data);
            // Aquí deberías agregar la lógica para guardar el nuevo producto en la base de datos
            res.status(201).json({ message: "Producto agregado exitosamente", producto: producto });
        } catch (error) {
            res.status(500).json({ message: "Error al agregar producto", error });
        }
    }

    public eliminarProducto = async (req: Request, res: Response) => {
        try {
            const productoId = Number(req.params.id);

            await productoService.eliminarProducto(productoId);
            res.json({ message: "Producto eliminado exitosamente" });
        } catch (error) {
            res.status(500).json({ message: "Error al eliminar producto", error });
        }
    }

    public getProductoPorId = async (req: Request, res: Response) => {
        try {
            const productoId = Number(req.params.id);
            const producto = await productoService.obtenerProductoPorId(productoId);

            if (!producto) {
                return res.status(404).json({ message: "Producto no encontrado" });
            }

            res.status(200).json(producto);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener producto por ID", error });
        }
    }

    public updateProducto = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            const data = req.body;

            const productoActualizado = await productoService.updateProducto(id, data);

            res.status(200).json({
                message: "Producto actualizado correctamente",
                producto: productoActualizado
            });

        } catch (error: any) {
            res.status(500).json({
                message: "Error al actualizar producto",
                error: error.message
            });
        }
    }
}