import { Router } from "express"
import { getPublication,getPublicationById, createPublication, updatePublication, deletePublication, getPublicationsByCourse } from "./publication.controller.js"
import { createValidator, getPublicationValidator, deletePublicationValidator, updatePublicationValidator, PublicationByIdValidator, PublicationByCourseValidator } from "../middlewares/publication-validators.js"
import { uploadProfilePicture } from "../middlewares/multer-uploads.js"

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Publication
 *   description: API for managing publications
 */

/**
 * @swagger
 * /createPublication:
 *   post:
 *     summary: Create a new publication
 *     tags: [Publication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the publication
 *                 example: "Introduction to Node.js"
 *               description:
 *                 type: string
 *                 description: Description of the publication
 *                 example: "This publication covers the basics of Node.js"
 *               course:
 *                 type: string
 *                 description: ID of the course associated with the publication
 *                 example: "60d0fe4f5311236168a109f1"
 *     responses:
 *       201:
 *         description: Publication created successfully
 *       400:
 *         description: Invalid data or missing information
 *       500:
 *         description: Internal server error
 */

router.post("/createPublication", uploadProfilePicture.single("profilePicture"),
createValidator, createPublication)


/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve all publications
 *     tags: [Publication]
 *     responses:
 *       200:
 *         description: List of publications retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 publicacion:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "60d0fe4f5311236168a109f1"
 *                       title:
 *                         type: string
 *                         example: "Introduction to Node.js"
 *                       description:
 *                         type: string
 *                         example: "This publication covers the basics of Node.js"
 *                       course:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                             example: "Node.js Course"
 *                           description:
 *                             type: string
 *                             example: "Learn Node.js from scratch"
 *                       comments:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             content:
 *                               type: string
 *                               example: "Great publication!"
 *                       status:
 *                         type: boolean
 *                         example: true
 *       500:
 *         description: Internal server error
 */

router.get("/", getPublicationValidator, getPublication)

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Retrieve a publication by ID
 *     tags: [Publication]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ID of the publication
 *     responses:
 *       200:
 *         description: Publication retrieved successfully
 *       404:
 *         description: Publication not found
 *       500:
 *         description: Internal server error
 */

router.get("/:id", PublicationByIdValidator, getPublicationById)

/**
 * @swagger
 * /byCourse/{courseId}:
 *   get:
 *     summary: Retrieve publications by course ID
 *     tags: [Publication]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ID of the course
 *     responses:
 *       200:
 *         description: Publications retrieved successfully
 *       404:
 *         description: Course not found
 *       500:
 *         description: Internal server error
 */

router.get("/byCourse/:courseId", PublicationByCourseValidator, getPublicationsByCourse)



/**
 * @swagger
 * /updatePublication/{id}:
 *   put:
 *     summary: Update a publication by ID
 *     tags: [Publication]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ID of the publication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Updated title of the publication
 *                 example: "Advanced Node.js"
 *               description:
 *                 type: string
 *                 description: Updated description of the publication
 *                 example: "This publication covers advanced topics in Node.js"
 *     responses:
 *       200:
 *         description: Publication updated successfully
 *       404:
 *         description: Publication not found
 *       500:
 *         description: Internal server error
 */

router.put("/updatePublication/:id", updatePublicationValidator, updatePublication)


/**
 * @swagger
 * /deletePublication/{id}:
 *   delete:
 *     summary: Delete a publication by ID
 *     tags: [Publication]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ID of the publication
 *     responses:
 *       200:
 *         description: Publication deleted successfully
 *       404:
 *         description: Publication not found
 *       500:
 *         description: Internal server error
 */

router.delete("/deletePublication/:id", deletePublicationValidator, deletePublication)


export default router