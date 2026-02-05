const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const Poll = require("../models/Poll");
const Event = require("../models/Event");

// Créer un sondage (organisateur uniquement)
router.post("/:eventId", auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);

    if (!event) {
      return res.status(404).json({ message: "Événement introuvable" });
    }

    if (!event.organizers.includes(req.user.id)) {
      return res.status(403).json({ message: "Non autorisé" });
    }

    const poll = await Poll.create({
      event: event._id,
      question: req.body.question,
      options: req.body.options
    });

    res.status(201).json(poll);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Voter à un sondage
router.post("/:pollId/vote", auth, async (req, res) => {
  const poll = await Poll.findById(req.params.pollId);

  if (!poll) {
    return res.status(404).json({ message: "Sondage introuvable" });
  }

  const alreadyVoted = poll.votes.find(
    v => v.user.toString() === req.user.id
  );

  if (alreadyVoted) {
    return res.status(400).json({ message: "Vote déjà enregistré" });
  }

  poll.votes.push({
    user: req.user.id,
    answer: req.body.answer
  });

  await poll.save();
  res.json({ message: "Vote enregistré" });
});

module.exports = router;
