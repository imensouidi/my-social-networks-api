const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const Event = require("../models/Event");

/**
 * @swagger
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       required:
 *         - name
 *         - startDate
 *         - endDate
 *         - location
 *       properties:
 *         name:
 *           type: string
 *           example: Soirée IA
 *         description:
 *           type: string
 *           example: Event test backend
 *         startDate:
 *           type: string
 *           example: 2026-03-01
 *         endDate:
 *           type: string
 *           example: 2026-03-02
 *         location:
 *           type: string
 *           example: Paris
 *         isPublic:
 *           type: boolean
 *           example: true
 */

/**
 * @swagger
 * /events:
 *   post:
 *     summary: Créer un événement
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       201:
 *         description: Événement créé
 *       401:
 *         description: Non autorisé
 */
router.post("/", auth, async (req, res) => {
  try {
    const event = await Event.create({
      ...req.body,
      organizers: [req.user.id],
      participants: [req.user.id]
    });

    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Récupérer tous les événements
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: Liste des événements
 */
router.get("/", async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

/**
 * @swagger
 * /events/{id}/join:
 *   post:
 *     summary: Rejoindre un événement
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Participation validée
 *       400:
 *         description: Déjà participant
 *       404:
 *         description: Événement introuvable
 */
router.post("/:id/join", auth, async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    return res.status(404).json({ message: "Événement introuvable" });
  }

  if (event.participants.includes(req.user.id)) {
    return res.status(400).json({ message: "Déjà participant" });
  }

  event.participants.push(req.user.id);
  await event.save();

  res.json({ message: "Participation validée" });
});

module.exports = router;
