const mongoose = require("mongoose");

const pollSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
  question: String,
  options: [String],
  votes: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      answer: String
    }
  ]
});

module.exports = mongoose.model("Poll", pollSchema);
