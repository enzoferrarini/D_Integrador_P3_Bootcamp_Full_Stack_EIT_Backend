import { body } from "express-validator";
import { validationErrorResponse } from "../middlewares/validateResponse.js";

export const productValidationRules = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Campo Obligatorio")
    .isLength({ min: 2, max: 20 })
    .withMessage("Mínimo 2 caracteres y Máximo 20")
    .matches(/^[a-zA-ZñÑ ]+$/)
    .withMessage("Solo se permiten caracteres alfabéticos")
    .escape(), // Escapa caracteres peligrosos
  body("price")
    .trim()
    .notEmpty()
    .withMessage("Campo Obligatorio")
    .matches(/^\d+(\.\d{1,2})?$/)
    .withMessage("Solo se permiten Valores Númericos (123; 123123.00;1.21;123.02)")
    .escape(), // Escapa caracteres peligrosos
  // .matches(/^(([1-9]{1,3}(.[0-9]{3})*)|([0-9]+))(,[0-9]{1,2})?$/)
  // .withMessage("Solo se permiten Valores Númericos (123; 123.123,00)")
  // .escape(), // Escapa caracteres peligrosos
  body("stock")
    .trim()
    .notEmpty()
    .withMessage("Campo Obligatorio")
    .matches(/^[1-9]([0-9])*$/)
    .withMessage("Solo se permiten Valores Enteros Positivos mayores que 0")
    .escape(), // Escapa caracteres peligrosos,
  body("brand")
    .trim()
    .notEmpty()
    .withMessage("Campo Obligatorio")
    .isLength({ min: 2, max: 20 })
    .withMessage("Mínimo 2 caracteres y Máximo 20")
    .matches(/^[a-zA-ZñÑ ]+$/)
    .withMessage("Solo se permiten caracteres alfabéticos")
    .escape(), // Escapa caracteres peligrosos
  body("category")
    .trim()
    .notEmpty()
    .withMessage("Campo Obligatorio")
    .isLength({ min: 2, max: 20 })
    .withMessage("Mínimo 2 caracteres y Máximo 20")
    .matches(/^[a-zA-ZñÑ ]+$/)
    .withMessage("Solo se permiten caracteres alfabéticos")
    .escape(), // Escapa caracteres peligrosos
  body("shortDesc")
    .trim()
    .notEmpty()
    .withMessage("Campo Obligatorio")
    .isLength({ min: 2, max: 30 })
    .withMessage("Mínimo 2 caracteres y Máximo 30"),
  body("ageFrom")
    .trim()
    .notEmpty()
    .withMessage("Campo Obligatorio")
    .matches(/^[1-9]([0-9])*$/)
    .withMessage("Solo se permiten Valores Enteros Positivos mayores que 0")
    .escape(), // Escapa caracteres peligrosos,
  body("ageTo")
    .trim()
    .notEmpty()
    .withMessage("Campo Obligatorio")
    .matches(/^[1-9]([0-9])*$/)
    .withMessage("Solo se permiten Valores Enteros Positivos mayores que 0")
    .escape(), // Escapa caracteres peligrosos,
  validationErrorResponse,
];
