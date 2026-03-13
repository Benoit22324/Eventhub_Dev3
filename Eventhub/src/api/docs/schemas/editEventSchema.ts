/**
 * @swagger
 * components:
 *   schemas:
 *     EditEventInputs:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - startDate
 *         - capacity
 *         - price
 *       properties:
 *         title:
 *           type: string
 *           example: "Mini Tournoi de Foot"
 *         description:
 *           type: string
 *           example: "La final entre l'équipe A et l'équipe B, c'est le moment tant attendu !"
 *         startDate:
 *           type: string
 *           example: "2026-08-01"
 *         capacity:
 *           type: integer
 *           example: 800
 *         price:
 *           type: number
 *           example: 14.49
 */