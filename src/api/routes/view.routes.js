import { Router } from "express";
import { vistaConsultar, vistaCrear, vistaEliminar, vistaIndex, vistaModificar } from "../controllers/view.controllers.js";

const router = Router(); 

router.get("/login", (req, res) => {
    res.render("index", {
        title: "Login administrador",
        products: [] 
    });
});

router.get("/", vistaIndex);

router.get("/consultar", vistaConsultar);

router.get("/crear", vistaCrear);

router.get("/modificar", vistaModificar);

router.get("/eliminar", vistaEliminar);

export default router;
