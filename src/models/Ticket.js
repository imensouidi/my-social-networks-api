const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true
    },
    ticketType: {
      type: String,
      required: true
    },
    buyer: {
      firstname: { type: String, required: true },
      lastname: { type: String, required: true },
      address: { type: String, required: true }
    },
    purchaseDate: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ticket", ticketSchema);
