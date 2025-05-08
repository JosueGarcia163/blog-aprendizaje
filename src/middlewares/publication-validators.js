import { body, param } from "express-validator";
import { publicationExist, namePublicationExists, courseExist } from "../helpers/db-validators.js";
import { validarCampos } from "./validate-fields.js";
import { handleErrors } from "./handle-errors.js";

export const createValidator = [
    body("title").notEmpty().withMessage("El titulo es requerido"),
    body("title").custom(namePublicationExists),
    body("description").notEmpty().withMessage("La descripcion es requerida"),

    validarCampos,
    handleErrors
]

export const getPublicationValidator = [
    validarCampos,
    handleErrors
]

export const PublicationByIdValidator = [
    param("id").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("id").custom(publicationExist),
    validarCampos,
    handleErrors
]

export const PublicationByCourseValidator = [
    param("courseId").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("courseId").custom(courseExist),
    validarCampos,
    handleErrors
]

export const deletePublicationValidator = [
    param("id").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("id").custom(publicationExist),
    validarCampos,
    handleErrors
]


export const updatePublicationValidator = [
    param("id", "No es un ID válido").isMongoId(),
    param("id").custom(publicationExist),
    body("title").custom(namePublicationExists),
    validarCampos,
    handleErrors
]