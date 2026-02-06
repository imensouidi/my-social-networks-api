const mongoose = require("mongoose");

const discussionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["group", "event"],
      required: true
    },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      default: null
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      default: null
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Discussion", discussionSchema);
