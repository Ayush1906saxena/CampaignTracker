const mongoose = require("mongoose");
const ProjectSchema = new mongoose.Schema(
  {
    campaignId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Campaign",
    },
    projectDescription : {
      type : String,
    },
    projectName: {
      type: String,
      required: true,
    },
    projectDonor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      //required : true,
    },
    projectDeadline: {
      type: Date,
      default: Date.now,
    },
    location: {
      type: String,
    },
    financialYear: {
      type: String,
    },
    fundsDisbursed: {
      type: Number,
      required: true,
    },
    fundsUtilized: {
      type: Number,
    },
    milestones: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "milestone",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Project", ProjectSchema);
