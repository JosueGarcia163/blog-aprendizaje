import { Router } from "express"
import { getCourses } from "./course.controller.js"

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Course
 *   description: API for managing courses
 */

/**
 * @swagger
 * /courses:
 *   get:
 *     summary: Retrieve all courses
 *     tags: [Course]
 *     responses:
 *       200:
 *         description: List of courses retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 courses:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "60d0fe4f5311236168a109f1"
 *                       name:
 *                         type: string
 *                         example: "Practica supervisada"
 *                       description:
 *                         type: string
 *                         example: "Este es el curso de practica supervisada"
 *                       status:
 *                         type: boolean
 *                         example: true
 *       500:
 *         description: Internal server error
 */

router.get("/", getCourses)

export default router