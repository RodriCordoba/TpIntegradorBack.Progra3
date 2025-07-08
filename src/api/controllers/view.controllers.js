import Products from "../models/product.models.js";

export const vistaIndex = async (req, res) => {
    
    try {
        const respuestaProductos = await Products.selectAllProducts();

        res.render("index", {
            title: "Listado de productos",
            products: respuestaProductos[0]
        });

    } catch (error) {
        console.error("Error obteniendo la informacion", error.message);
        res.status(500).json({
            error: "Error interno al obtener la informacion"
        })
    }
}

export const vistaConsultar = (req, res) => {
    res.render("consultar", {
        title: "Consultar producto",
        about: "Consultar producto por id"
    })
}

export const vistaCrear = (req, res) => {
    res.render("crear", {
        title: "Crear producto"
    })
}

export const vistaModificar = (req, res) => {
    res.render("modificar", {
        title: "Modificar producto",
        about: "Primero buscamos el id, luego generamos un formulario para actualizar los campos"
    })
}

export const vistaEliminar = (req, res) => {
    res.render("eliminar", {
        title: "Eliminar producto",
        about: "Primero buscamos el id, luego generamos un boton para eliminar y un prompt para confirmar"
    })
}