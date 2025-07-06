import express from "express";
import environments from "./src/api/config/environments.js";
import connection from "./src/api/database/db.js";
import cors from "cors";

const app = express();
const PORT = environments.port;

app.use(cors());

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

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})