const router = require("express").Router();

const {
  addMilestone,
  getAllMilestones,
  updateMilestone,
  createNewMilestone,
  editMilestone,
  markCompleted,
} = require("../controller/milestone.controller");

const { userAuth } = require("../middleware/auth");

router.post("/:id", userAuth, addMilestone);
router.get("/:id", userAuth, getAllMilestones);
router.get("/create/:id", userAuth, createNewMilestone);
router.get("/edit/:id", userAuth, editMilestone);
router.post("/update/:id", userAuth, updateMilestone);
router.get("/markcompleted/:id", userAuth, markCompleted);

module.exports = router;
