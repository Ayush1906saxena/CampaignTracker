const mongoose = require("mongoose");
 
const MilestoneSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
    name: {
      type: String,
      required: true,
    },
    deadline: {
      type: Date,
      default: Date.now,
    },
    description: {
      type: String,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    assigned: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("milestone", MilestoneSchema);
