/**
 * @swagger
 * /event/{eventId}:
 *   delete:
 *     summary: Supprimer un événement par son id avec vérification user
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
 *     responses:
 *       200:
 *         description: Suppression de l'événement avec succès
 *       500:
 *         description: An error as occured
 */