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
    const { ticketType, firstname, lastname, address } = req.body;

    const event = await Event.findById(req.params.eventId);
    if (!event || !event.isPublic) {
      return res.status(400).json({ message: "Billetterie non disponible" });
    }

    // Vérifier que le type de billet existe
    const type = event.ticketTypes.find(t => t.name === ticketType);
    if (!type || type.quantity <= 0) {
      return res.status(400).json({ message: "Billet indisponible" });
    }

    // Vérifier qu'une personne n'achète qu'un seul billet
    const existingTicket = await Ticket.findOne({
      event: event._id,
      "buyer.firstname": firstname,
      "buyer.lastname": lastname
    });

    if (existingTicket) {
      return res.status(400).json({
        message: "Une personne ne peut acheter qu’un seul billet"
      });
    }

    // Créer le billet
    const ticket = await Ticket.create({
      event: event._id,
      ticketType: type.name,
      buyer: { firstname, lastname, address }
    });

    // Décrémenter la quantité
    type.quantity -= 1;
    await event.save();

    res.status(201).json(ticket);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


module.exports = router;
