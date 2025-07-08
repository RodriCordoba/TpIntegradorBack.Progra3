import express from "express";
import environments from "./src/api/config/environments.js";
import cors from "cors";
import { productRoutes } from "./src/api/routes/index.js";
import { loggerUrl } from "./src/api/middlewares/middlewares.js";

const app = express();
const PORT = environments.port;

app.use(express.json()); 

app.use(cors()); 

app.use(loggerUrl);

app.get("/", (req, res) => {
    res.send("Hola mundo");
});

app.use("/api/products", productRoutes);


app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})