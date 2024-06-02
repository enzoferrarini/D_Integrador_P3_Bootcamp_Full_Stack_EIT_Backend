import { body } from "express-validator";
import { validationErrorResponse } from "../middlewares/validateResponse.js";

export const commentValidationsRules = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Campo Obligatorio")
    .isLength({ min: 2, max: 30 })
    .withMessage("Mínimo 2 caracteres y Máximo 30")
    .matches(/^[a-zA-ZñÑ ]+$/)
    .withMessage("Solo se permiten caracteres alfabéticos")
    .escape(), // Escapa caracteres peligrosos
  body("mail")
    .trim()
    .notEmpty()
    .withMessage("Campo Obligatorio")
    .isEmail()
    .withMessage("E-mail inválido."),
  body("comment").trim().notEmpty().withMessage("Campo Obligatorio"),
  validationErrorResponse,
];
