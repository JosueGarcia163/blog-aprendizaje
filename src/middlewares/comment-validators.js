import { body, param } from "express-validator";
import { commentExist, publicationExist } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";


export const createValidator = [
    body("username").notEmpty().withMessage("El nombre de usuario es requerido")
        .isLength({ max: 25 }).withMessage("El nombre no puede exceder los 25 caracteres"),
    body("content").notEmpty().withMessage("El Contenido es requerido"),
    validarCampos,
    handleErrors
]

export const getCommentValidator = [
    validarCampos,
    handleErrors
]

export const getCommentByIdValidator = [
    param("publicationId").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("publicationId").custom(publicationExist),
    validarCampos,
    handleErrors
]

export const deleteCommentValidator = [
    param("id").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("id").custom(commentExist),
    validarCampos,
    handleErrors
]


export const updateCommentValidator = [
    param("id", "No es un ID válido").isMongoId(),
    param("id").custom(commentExist),
    validarCampos,
    handleErrors
]