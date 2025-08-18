const mongoose = require("mongoose");

/**
 * Log Schema
 */
const logSchema = new mongoose.Schema(
  {
    actor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    actionType: {
      type: String,
      required: true,
    },
    entityType: {
      type: String,
      required: true, // e.g. 'todo', 'team'
    },
    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Log", logSchema);
