const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const Ticket = require("../models/Ticket");
const Event = require("../models/Event");

// Créer un type de billet (organisateur)
router.post("/:eventId/types", auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);

    if (!event) {
      return res.status(404).json({ message: "Événement introuvable" });
    }

    if (!event.organizers.includes(req.user.id)) {
      return res.status(403).json({ message: "Non autorisé" });
    }

    const ticketType = {
      name: req.body.name,
      price: req.body.price,
      quantity: req.body.quantity
    };

    event.ticketTypes = event.ticketTypes || [];
    event.ticketTypes.push(ticketType);
    await event.save();

    res.status(201).json(ticketType);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Acheter un billet (public)
router.post("/:eventId/buy", async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);

    if (!event || !event.isPublic) {
      return res.status(400).json({ message: "Billetterie non disponible" });
    }

    const ticket = await Ticket.create({
      event: event._id,
      type: req.body.type,
      price: req.body.price,
      buyer: {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        address: req.body.address
      }
    });

    res.status(201).json(ticket);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
