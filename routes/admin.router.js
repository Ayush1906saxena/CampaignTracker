const express = require("express");
const campaignMongo = require("../models/campaign.mongo");
const projectMongo = require("../models/project.mongo");
const adminRouter = express.Router();

const { userAuth } = require("../middleware/auth");

adminRouter.get("/", userAuth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.redirect("/auth/login");
  }

  const campaignsData = await campaignMongo.find();
  const projectData = await projectMongo.find();

  res.render("admin", { campaigns: campaignsData, projects: projectData });
});

adminRouter.route("/camp-project/:id").get(userAuth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.redirect("/auth/login");
  }

  const campaignId = req.params.id;
  const campaign = await campaignMongo
    .findById(campaignId)
    .populate("projects");

  console.log(campaign);

  res.render("projects", { campaign });
});

module.exports = adminRouter;
