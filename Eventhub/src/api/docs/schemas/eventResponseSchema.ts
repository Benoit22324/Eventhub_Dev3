/**
 * @swagger
 * components:
 *   schemas:
 *     EventResponseSchema:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               example: "2687cb5a-3d60-4ce6-86c1-354b0d598bf7"
 *             title:
 *               type: string
 *               example: "Concert"
 *             description:
 *               type: string
 *               example: "Venez assiter avec un célèbre chanteur"
 *             startDate:
 *               type: array
 *               format: date-time
 *               example: "2025-04-23T11:56:57.065Z"
 *             capacity:
 *               type: number
 *               example: 200
 *             price:
 *               type: number
 *               example: 5.99
 *             organizer:
 *               type: string
 *               example: "Monica"
 *             category:
 *               type: string
 *               example: "Concert"
 *             createdAt:
 *               type: string
 *               format: date-time
 *               example: "2025-04-23T11:56:57.065Z"
 *             updatedAt:
 *               type: string
 *               format: date-time
 *               example: "2025-04-23T11:56:57.065Z"
 */