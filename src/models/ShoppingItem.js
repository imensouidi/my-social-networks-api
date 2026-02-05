const mongoose = require("mongoose");

const shoppingItemSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true
  },
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  arrivalTime: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

// Un objet doit être unique par événement
shoppingItemSchema.index({ event: 1, name: 1 }, { unique: true });

module.exports = mongoose.model("ShoppingItem", shoppingItemSchema);
