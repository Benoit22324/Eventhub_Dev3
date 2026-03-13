/**
 * @swagger
 * /event:
 *   post:
 *     summary: Créer un événement
 *     tags:
 *       - Event
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateEventInputs'
 *     responses:
 *       201:
 *         description: Création de l'événement avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EventResponseSchema'
 *       403:
 *         description: Missing authorization header
 *       500:
 *         description: An error as occured
 */