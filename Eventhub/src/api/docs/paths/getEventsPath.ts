/**
 * @swagger
 * /event:
 *   get:
 *     summary: Récupérer tous les événements
 *     tags:
 *       - Event
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Informations des événements récupérées avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/EventResponseSchema'
 *       500:
 *         description: An error as occured
 */