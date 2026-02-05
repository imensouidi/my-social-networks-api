const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  name: String,
  description: String,
  type: { type: String, enum: ["public", "private", "secret"] },
  admins: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  allowPost: Boolean,
  allowEventCreation: Boolean
});

module.exports = mongoose.model("Group", groupSchema);
