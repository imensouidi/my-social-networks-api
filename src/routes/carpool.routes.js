const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const Carpool = require("../models/Carpool");
const Event = require("../models/Event");

// Proposer un covoiturage
router.post("/:eventId", auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) {
      return res.status(404).json({ message: "Événement introuvable" });
    }

    const carpool = await Carpool.create({
      event: event._id,
      departurePlace: req.body.departurePlace,
      departureTime: req.body.departureTime,
      price: req.body.price,
      availableSeats: req.body.availableSeats,
      maxTimeOffset: req.body.maxTimeOffset,
      driver: req.user.id
    });

    res.status(201).json(carpool);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Lister les covoiturages d’un événement
router.get("/:eventId", async (req, res) => {
  const carpools = await Carpool.find({ event: req.params.eventId })
    .populate("driver", "firstname lastname");

  res.json(carpools);
});

module.exports = router;
