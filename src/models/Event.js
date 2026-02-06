const mongoose = require("mongoose");

const ticketTypeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    quantity: { type: Number, required: true }
  },
  { _id: false }
);

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    coverPhoto: {
      type: String
    },
    isPublic: {
      type: Boolean,
      default: true
    },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group"
    },
    organizers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      }
    ],
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    ticketTypes: [ticketTypeSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
