const express = require("express");
const campaignRouter = express.Router();
const Campaign = require("../models/campaign.mongo");

const { userAuth } = require("../middleware/auth");
// const {
//     httpGetAllCampaigns,
//     httpAddNewCampaign,
//     httpAbortCampaign,
// } = require('../controller/campaign.controller');

// campaignRouter.get('/', httpGetAllCampaigns);
// campaignRouter.post('/', httpAddNewCampaign);
// campaignRouter.delete('/:id', httpAbortCampaign);

campaignRouter.route("/").get(userAuth, async (req, res) => {
  const campaigns = await Campaign.find({}, { __v: 0 });

  res.render("addcampaign", { campaigns });
});

//add a campaign
campaignRouter.route("/add").post(userAuth, (req, res) => {
  if (req.user.role !== "admin") {
    return res.redirect("/auth/login");
  }

  const campaignName = req.body.campaignName;
  const launchDate = new Date(req.body.launchDate);
  // const upcoming = req.body.upcoming;
  // const success = req.body.success;
  //const projects = req.body.projects;

  const newCampaign = new Campaign({
    campaignName,
    launchDate,
    //projects,
    // upcoming,
    // success,
  });

  newCampaign
    .save()
    .then(() => {
      req.flash("success", "Successful");
      res.redirect("/admin");
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

//find a campaign by id
campaignRouter.route("/:id").get((req, res) => {
  Campaign.findById(req.params.id)
    .then((campaign) => res.json(campaign))
    .catch((err) => res.status(400).json("Error: " + err));
});

//delete a campaign by id
campaignRouter.route("/:id").delete((req, res) => {
  Campaign.findByIdAndDelete(req.params.id)
    .then(() => res.json("Campaign deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

//update a project by id :  We can either say success = false or success = true
campaignRouter.route("/update/:id").post((req, res) => {
  Campaign.findById(req.params.id)
    .then((campaign) => {
      campaign.campaignName = req.body.campaignName;
      campaign.launchDate = Date.parse(req.body.launchDate);
      // campaign.upcoming = req.body.upcoming;
      campaign.success = req.body.success;

      campaign
        .save()
        .then(() => res.json("Campaign updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = campaignRouter;
