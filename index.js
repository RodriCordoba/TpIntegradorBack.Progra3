import express from "express";
import environments from "./src/api/config/environments.js";
import connection from "./src/api/database/db.js";
import cors from "cors";

const app = express();
const PORT = environments.port;

app.use(express.json()); 

app.use(cors()); 

app.use((req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
    next();
});

const validateId = (req, res, next) => {
    const id = req.params.id; 

    if(!id || isNaN(id)) {
        return res.status(400).json({
            error: "El ID debe ser un numero"
        })
    }

    req.id = parseInt(id, 10);

    next();
}

app.get("/", (req, res) => {
    res.send("HolaMundo");
});

//GET products
app.get("/products", async (req, res) => {
    
    try{
        let sql = `SELECT * FROM products`;
    
        let [rows] = await connection.query(sql);
    
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
});

app.get("/products/:id", async (req, res) => {
    try {
        let { id } = req.params;

        let sql  = `SELECT * FROM products where id = ?`;

        let [rows] = await connection.query(sql, [id]);

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
});

app.post("/products", async (req, res) => {

    try {
        let { category, image, name, price } = req.body;


        if(!category || !image || !name || !price) {
            return res.status(400).json({
                message: "Datos invalidos. Asegurate de enviar categoria, imagen, nombre y precio"
            });
        }

        let sql = `INSERT INTO products (category, image, name, price) VALUES (?, ?, ?, ?)`;

        let [rows] = await connection.query(sql, [category, image, name, price]);

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
});

app.put("/products", async (req, res) => {
    try {
        let { id, category, image, name, price } = req.body;

        if(!id || !category || !image || !name || !price) {
            return res.status(400).json({
                message: "Faltan campos requeridos"
            });
        }

        let sql = `
            UPDATE products
            SET name = ?, image = ?, price = ?, category = ?
            WHERE id = ?
        `;

        let [result] = await connection.query(sql, [name, image, price, category, id]);

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
});

app.delete("/products/:id", async (req, res) =>{
    try {
        let { id } = req.params;

        if(!id) {
            return res.status(400).json({
                message: "Se requiere un id para eliminar un producto"
            })
        }

        let sql = `DELETE FROM products WHERE id = ?`;

        let [result] = await connection.query(sql, [id]);

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
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})