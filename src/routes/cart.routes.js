import express from "express";
import {
  createCart,
  editCart,
  getById,
} from "../controller/cartController.js";

const route = express.Router();

//POST Crear un carrito -createCart-
route.post("/", createCart);

//GET Obtener un carrito por Id -getById-
route.get("/:id", getById);

//PUT Actualizar un producto por Id -editCart-
route.put("/:id", editCart);

export default route;
