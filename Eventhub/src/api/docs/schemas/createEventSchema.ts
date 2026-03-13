/**
 * @swagger
 * components:
 *   schemas:
 *     CreateEventInputs:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - startDate
 *         - capacity
 *         - price
 *         - category
 *       properties:
 *         title:
 *           type: string
 *           example: "Tournoi de Foot"
 *         description:
 *           type: string
 *           example: "La final entre l'équipe A et l'équipe B, c'est le moment tant attendu !"
 *         startDate:
 *           type: string
 *           example: "2026-04-20"
 *         capacity:
 *           type: integer
 *           example: 1500
 *         price:
 *           type: number
 *           example: 19.99
 *         category:
 *           type: string
 *           example: "Sportif"
 */