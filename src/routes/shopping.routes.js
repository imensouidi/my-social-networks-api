const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const ShoppingItem = require("../models/ShoppingItem");
const Event = require("../models/Event");

// Ajouter un objet à la shopping list
router.post("/:eventId", auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) {
      return res.status(404).json({ message: "Événement introuvable" });
    }

    const item = await ShoppingItem.create({
      event: event._id,
      name: req.body.name,
      quantity: req.body.quantity,
      arrivalTime: req.body.arrivalTime,
      user: req.user.id
    });

    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Récupérer la shopping list d’un événement
router.get("/:eventId", async (req, res) => {
  const items = await ShoppingItem.find({ event: req.params.eventId })
    .populate("user", "firstname lastname");

  res.json(items);
});

module.exports = router;
