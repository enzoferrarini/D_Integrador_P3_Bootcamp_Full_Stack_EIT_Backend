import express from "express";
import upload from "../libs/storage.js";
import {
  createProduct,
  getProduct,
  deleteProduct,
  editProduct,
  getProductId,
} from "../controller/productsController.js";
import { productValidationRules } from "../libs/productValidations.js";

const route = express.Router();
//GET Obtener productos incluye query Search -getProduct-
route.get("/", getProduct);

//POST Crear un producto -createProduct-
route.post("/", upload.single("image"), productValidationRules, createProduct);

//GET Obtener un producto por Id -getProductId-
route.get("/:id", getProductId);

//DELETE Eliminar (eliminado lògico) un producto por Id -deleteProduct-
route.delete("/:id", deleteProduct);

//PUT Actualizar un producto por Id -editProduct-
route.put("/:id", upload.single("image"), productValidationRules, editProduct);
export default route;

// route.post("/", upload.single("image"), createProduct);
// route.get("/", getProduct);
// route.get("/:id", getProductId)
// route.delete("/:id", deleteProduct)
// route.put("/:id", upload.single("image"), editProduct)
