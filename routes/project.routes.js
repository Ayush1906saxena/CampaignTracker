const express = require("express");
const campaignMongo = require("../models/campaign.mongo");
const projectMongo = require("../models/project.mongo");
const Project = require("../models/project.mongo");
const User = require("../models/user.model");

const projectRouter = express.Router();

const { userAuth } = require("../middleware/auth");

// projectRouter.route("/").get(async (req, res) => {
//   const projects = await Project.find().populate("projectDonor");

//   return res.render("admin");
// });

projectRouter
  .route("/campaign/projects/:id")
  .get(userAuth, async (req, res) => {
    if (req.user.role !== "manager" && req.user.role !== "admin") {
      return res.redirect("/auth/login");
    }

    const campaignId = req.params.id;
    return res.render("addproject", {
      campaignId,
    });
  });

//add a project
projectRouter
  .route("/campaign/projects/create/:id")
  .post(userAuth, (req, res) => {
    if (req.user.role !== "manager" && req.user.role !== "admin") {
      return res.redirect("/auth/login");
    }

    const projectName = req.body.projectName;
    const projectDonor = req.body.projectDonor;
    // const projectDeadline = req.body.projectDeadline;
    // const location = req.body.location;
    // const financialYear = req.body.financialYear;
    const fundsDisbursed = req.body.fundsDisbursed;
    // const fundsUtilized = req.body.fundsUtilized;
    const campaignId = req.params.id;

    const newProject = new Project({
      campaignId,
      projectName,
      projectDonor,
      // projectDeadline,
      // location,
      // financialYear,
      fundsDisbursed,
      // fundsUtilized,
    });

    newProject
      .save()
      .then((project) => {
        campaignMongo.findByIdAndUpdate(
          campaignId,
          {
            $push: {
              projects: project._id,
            },
          },
          (err, campaign) => {
            if (err) {
              console.log(err);
              res.redirect("/campaign/projects/" + campaignId);
            }
            req.flash("success", "Project added");
            return res.redirect("/admin/camp-project/" + campaignId);
          }
        );
        // res.json('Project Added!')
      })
      .catch((err) => res.status(400).json("Error: " + err));
  });

//find a project by id
projectRouter.route("/:id").get((req, res) => {
  Project.findById(req.params.id)
    .then((project) => res.json(project))
    .catch((err) => res.status(400).json("Error: " + err));
});

//delete an project by id
projectRouter.route("/:id").delete((req, res) => {
  Project.findByIdAndDelete(req.params.id)
    .then(() => res.json("Project deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

//update a project by id
projectRouter
  .route("/campaign/project/update/:id")
  .post(userAuth, (req, res) => {
    if (req.user.role !== "manager" && req.user.role !== "admin") {
      return res.redirect("/auth/login");
    }

    Project.findById(req.params.id)
      .then((project) => {
        project.projectName = req.body.projectName;
        project.projectDonor = req.body.projectDonor;
        // project.projectDeadline = Date.parse(req.body.projectDeadline);
        // project.location = req.body.location;
        // project.financialYear = req.body.financialYear;
        project.fundsDisbursed = req.body.fundsDisbursed;
        // project.fundsUtilized = req.body.fundsUtilized;

        project
          .save()
          .then(() => {
            // res.json('Project updated!')
            req.flash("success", "Project Updated");
            return res.redirect("/project/managers/projects");
          })
          .catch((err) => res.status(400).json("Error: " + err));
      })
      .catch((err) => res.status(400).json("Error: " + err));
  });

/**************************** Projects frontend ***********************/
projectRouter.route("/managers/projects").get(userAuth, async (req, res) => {
  if (req.user.role !== "manager" && req.user.role !== "admin") {
    return res.redirect("/auth/login");
  }
  const projectsDetails = await Project.find().populate("projectDonor");
  // console.log(projectsDetails[4]);
  res.render("index", { projectsDetails: projectsDetails });
});

projectRouter
  .route("/managers/campaign/project/create")
  .get(userAuth, async (req, res) => {
    if (req.user.role !== "manager" && req.user.role !== "admin") {
      return res.redirect("/auth/login");
    }
    const employees = await User.find({ role: "donor" });
    res.render("create", { employees });
  });

projectRouter.route("/edit/:id").get(userAuth, async (req, res) => {
  if (req.user.role !== "manager" && req.user.role !== "admin") {
    return res.redirect("/auth/login");
  }
  const projectId = req.params.id;
  const project = await Project.findById(projectId);

  const employees = await User.find({ role: "donor" });
  res.render("edit", {
    project_id: req.params.id,
    project: project,
    employees,
  });
});

module.exports = projectRouter;
