import { Router } from "express"
import { createComment, getComment, getCommentsByPublication } from "./comment.controller.js"
import { createValidator, getCommentValidator, getCommentByIdValidator } from "../middlewares/comment-validators.js"

const router = Router()



/**
 * @swagger
 * tags:
 *   name: Comment
 *   description: API for managing comments
 */

/**
 * @swagger
 * /createComment:
 *   post:
 *     summary: Create a new comment on a publication
 *     tags: [Comment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 maxLength: 25
 *                 description: Name of the user creating the comment
 *                 example: "JohnDoe"
 *               content:
 *                 type: string
 *                 maxLength: 75
 *                 description: Content of the comment
 *                 example: "This is a test comment"
 *               publication:
 *                 type: string
 *                 description: ID of the publication where the comment will be added
 *                 example: "60d0fe4f5311236168a109f1"
 *     responses:
 *       201:
 *         description: Comment created successfully
 *       400:
 *         description: Invalid data or missing information
 *       403:
 *         description: Unauthorized to create comments
 *       500:
 *         description: Internal server error
 */
router.post("/createComment", createValidator, createComment)

/**
 * @swagger
 * /comments:
 *   get:
 *     summary: Get all available comments
 *     tags: [Comment]
 *     responses:
 *       200:
 *         description: List of comments retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "60d0fe4f5311236168a109f1"
 *                   username:
 *                     type: string
 *                     example: "JohnDoe"
 *                   content:
 *                     type: string
 *                     example: "This is a comment"
 *                   publication:
 *                     type: string
 *                     description: ID of the publication the comment belongs to
 *                     example: "60d0fe4f5311236168a109f1"
 *                   status:
 *                     type: boolean
 *                     description: Status of the comment (active/inactive)
 *                     example: true
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-02-21T00:00:00Z"
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */


router.get("/", getCommentValidator, getComment)

/**
 * @swagger
 * /comments/{publicationId}:
 *   get:
 *     summary: Get all comments for a specific publication
 *     tags: [Comment]
 *     parameters:
 *       - in: path
 *         name: publicationId
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ID of the publication
 *     responses:
 *       200:
 *         description: Comments retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "60d0fe4f5311236168a109f1"
 *                   username:
 *                     type: string
 *                     example: "JohnDoe"
 *                   content:
 *                     type: string
 *                     example: "This is a comment"
 *                   publication:
 *                     type: string
 *                     description: ID of the publication the comment belongs to
 *                     example: "60d0fe4f5311236168a109f1"
 *                   status:
 *                     type: boolean
 *                     description: Status of the comment (active/inactive)
 *                     example: true
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-02-21T00:00:00Z"
 *       400:
 *         description: Bad request
 *       404:
 *         description: Publication not found
 *       500:
 *         description: Internal server error
 */


router.get("/:publicationId", getCommentByIdValidator, getCommentsByPublication)




export default router