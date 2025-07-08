import { Router } from "express";
import { validateId } from "../middlewares/middlewares.js";
import { createProduct, getAllProducts, getProductById, modifyProduct, removeProduct } from "../controllers/product.controllers.js";

const router = Router();

router.get("/", getAllProducts);

router.get("/:id", validateId, getProductById);

router.post("/", createProduct);

router.put("/", modifyProduct);

router.delete("/:id", removeProduct);

export default router;