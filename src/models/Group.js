const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema(
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
    icon: {
      type: String
    },
    coverPhoto: {
      type: String
    },
    type: {
      type: String,
      enum: ["public", "private", "secret"],
      default: "public"
    },
    admins: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      }
    ],
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      }
    ],
    allowPost: {
      type: Boolean,
      default: true
    },
    allowEventCreation: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Group", groupSchema);
