import Products from "../models/product.models.js";

export const getAllProducts = async (req, res) => {
    try { 

        let [rows] = await Products.selectAllProducts()

        res.status(200).json({
            payload: rows,
            message: rows.length === 0 ? "No se encontraron productos" : "Productos encontrados"
        });
    } catch (error) {
        console.error("Error obteniendo productos", error);

        res.status(500).json({
            error: "Error interno del servidor al obtener productos"
        })
    }    
}

export const getProductById = async (req, res) => {
    try {
        let { id } = req.params;

        const [rows] = await Products.selectProductFromId(id);

        if(rows.length === 0) {
            return res.status(404).json({
                error: `No se encontro el producto con id: ${id}`
            });
        }

        res.status(200).json({
            payload: rows
        })
    } catch(error) {
        console.error(`Error obteniendo producto con id ${id}`, error.message);

        res.status(500).json({
            error: "Error interno al obtener un producto por id"
        });
    }
}

export const createProduct = async (req, res) => {

    try {
        let { category, image, name, price } = req.body;

        if(!category || !image || !name || !price) {
            return res.status(400).json({
                message: "Datos invalidos. Asegurate de enviar categoria, imagen, nombre y precio"
            });
        }

        const [rows] = await Products.insertNewProduct(category, image, name, price);

        res.status(201).json({
            message: "Producto creado con exito",
            productId: rows.insertId
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Error interno del servidor",
            error: error.message
        });
    }
}

export const modifyProduct = async (req, res) => {
    try {
        let { id, category, image, name, price } = req.body;

        if(!id || !category || !image || !name || !price) {
            return res.status(400).json({
                message: "Faltan campos requeridos"
            });
        }

        const [result] = await Products.updateProduct(id, category, image, name, price);

        res.status(200).json({
            message: "Producto actualizado correctamente"
        });
    } catch (error) {
        console.error("Error al actualizar el producto", error);

        res.status(500).json({
            message: "Error interno del servidor",
            error: error.message
        });
    }
}

export const removeProduct = async (req, res) =>{
    try {
        let { id } = req.params;

        if(!id) {
            return res.status(400).json({
                message: "Se requiere un id para eliminar un producto"
            })
        }

        const [result] = await Products.deleteProduct(id);

        if(result.affectedRows === 0) {
            return res.status(404).json({
                message: `No se encontro un producto con id ${id}`
            });
        }

        return res.status(200).json({
            message: `Producto con id ${id} eliminado correctamente`
        });
    } catch (error) {
        console.error("Error en DELETE /products/:id", error);

        res.status(500).json({
            message: `Error al eliminar producto con id ${id}`, error,
            error: error.message
        });
    }
}