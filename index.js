import express from "express";
import environments from "./src/api/config/environments.js";

const app = express();
const PORT = environments.port;

app.get("/", (req, res) => {
    res.send("HolaMundo");
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})