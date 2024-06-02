import express from "express";
import { createComment, getComment } from "../controller/commentController.js";
import { commentValidationsRules } from "../libs/commentValidations.js";

const route = express.Router();

//GET Obtener comentarios -getComment-
route.get("/", getComment);

//POST Crear un comentario -createComment-
route.post("/", commentValidationsRules, createComment);

export default route;
