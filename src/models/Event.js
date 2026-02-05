const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: String,
  description: String,
  startDate: Date,
  endDate: Date,
  location: String,
  isPublic: Boolean,
  organizers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  ticketTypes: [
    {
      name: String,
      price: Number,
      quantity: Number
    }
  ]
});

module.exports = mongoose.model("Event", eventSchema);
