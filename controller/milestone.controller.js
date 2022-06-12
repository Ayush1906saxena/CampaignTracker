const Milestone = require("../models/milestone.model");
const Project = require("../models/project.mongo");
const User = require("../models/user.model");

exports.addMilestone = async (req, res) => {
  if (req.user.role !== "manager") {
    return res.redirect("/auth/login");
  }

  const projectId = req.params.id;
  const { name, deadline, description, employees } = req.body;
  const now = Date.now();
  // deadline logic
  const newMilestone = new Milestone({
    projectId,
    name,
    // deadline,
    description,
    assigned: employees,
  });
  newMilestone
    .save()
    .then((val) => {
      Project.findByIdAndUpdate(
        projectId,
        {
          $push: {
            milestones: val._id,
          },
        },
        (err, project) => {
          if (err) {
            console.log(err);
            // res.status(401).send({ msg: "Failed to update" });
            req.flash("error", "Failed");
            res.redirect("/milestone/create/" + projectId);
          }
          // res.send({ msg: "Milestone added" });
          req.flash("success", "Milestone added");
          res.redirect("/milestone/" + projectId);
        }
      );
    })
    .catch((err) => {
      // res.status(400).send({ err, msg: "Internal Server Error" })
      req.flash("error", "Failed");
      res.redirect("/milestone/create/" + projectId);
    });
};

exports.getAllMilestones = async (req, res) => {
  const projectId = req.params.id;

  const milestones = await Milestone.find({ projectId });
  //return res.status(200).send({ milestones });
  return res.render("manager_index_milestone", {
    milestonesDetails: milestones,
    projectId,
  });
};

exports.createNewMilestone = async (req, res) => {
  const projectId = req.params.id;

  if (req.user.role !== "manager") {
    return res.redirect("/milestone/" + projectId);
  }

  // const milestones = await Milestone.find({ projectId });
  //return res.status(200).send({ milestones });

  const employees = await User.find({ role: "employee" });
  // console.log(typeof employees);

  return res.render("manager_create_milestone", { projectId, employees });
};

exports.editMilestone = async (req, res) => {
  if (req.user.role !== "manager") {
    return res.redirect("/auth/login");
  }

  const milestoneId = req.params.id;

  const milestone = await Milestone.findById(milestoneId);

  const employees = await User.find({ role: "employee" });

  return res.render("manager_edit_milestone", {
    milestoneId,
    employees,
    milestone,
  });
};

exports.updateMilestone = async (req, res) => {
  if (req.user.role !== "manager") {
    return res.redirect("/auth/login");
  }

  const milestoneId = req.params.id;
  const milestoneDetails = req.body;

  Milestone.findByIdAndUpdate(
    milestoneId,
    {
      $set: milestoneDetails,
    },
    (err, milestone) => {
      if (err) {
        console.log(err);
        // return res.status(401).send({ msg: "Milestone update failed" });
        req.flash("error", "Update failed");
        return res.redirect("/milestone/edit/" + milestoneId);
      }
      // return res.status(200).send({ msg: "Milestone updated" });
      req.flash("success", "Milestone added");
      return res.redirect("/milestone/edit/" + milestoneId);
    }
  );
};

exports.markCompleted = async (req, res) => {
  if (req.user.role !== "employee") {
    return res.redirect("/auth/login");
  }

  const milestoneId = req.params.id;
  Milestone.findByIdAndUpdate(
    milestoneId,
    {
      $set: {
        completed: true,
      },
    },
    (err, result) => {
      if (err) {
        console.log(err);
        return res.redirect("/employee");
      }
      req.flash("success", "Milestone completed");
      return res.redirect("/employee");
    }
  );
};
