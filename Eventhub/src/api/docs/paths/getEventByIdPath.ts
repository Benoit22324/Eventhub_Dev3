/**
 * @swagger
 * /event/{id}:
 *   get:
 *     summary: Récupérer un événement par son id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: L'id d'un événement
 *     tags:
 *       - Event
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Informations de l'événement récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EventResponseSchema'
 *       500:
 *         description: An error as occured
 */