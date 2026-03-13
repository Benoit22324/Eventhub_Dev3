/**
 * @swagger
 * /event/{eventId}:
 *   patch:
 *     summary: Mise à jour d'un événement
 *     parameters:
 *       - in: path
 *         name: eventId
 *         schema:
 *           type: string
 *         required: true
 *         description: L'id d'un événement
 *     tags:
 *       - Event
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EditEventInputs'
 *     responses:
 *       200:
 *         description: Mise à jour de l'événement avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EventResponseSchema'
 *       403:
 *         description: Missing authorization header
 *       500:
 *         description: An error as occured
 */