const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    discussion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Discussion",
      required: true
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    content: {
      type: String,
      required: true
    },
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
