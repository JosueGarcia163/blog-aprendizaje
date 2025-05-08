import { Router } from "express"
import { getPublication,getPublicationById, createPublication, updatePublication, deletePublication, getPublicationsByCourse } from "./publication.controller.js"
import { createValidator, getPublicationValidator, deletePublicationValidator, updatePublicationValidator, PublicationByIdValidator, PublicationByCourseValidator } from "../middlewares/publication-validators.js"

const router = Router()

router.post("/createPublication", createValidator, createPublication)

router.get("/", getPublicationValidator, getPublication)

router.get("/:id", PublicationByIdValidator, getPublicationById)

router.get("/byCourse/:courseId", PublicationByCourseValidator, getPublicationsByCourse)

router.put("/updatePublication/:id", updatePublicationValidator, updatePublication)

router.delete("/deletePublication/:id", deletePublicationValidator, deletePublication)


export default router