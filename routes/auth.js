const router = require("express").Router();
const passport = require("passport");

const { signup, login } = require("../controller/auth.controller");

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", signup);

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", login);

router.get("/logout", (req, res) => {
  localStorage.removeItem("token");
  req.flash("success", "See you soon!");
  res.redirect("/auth/login");
});

module.exports = router;
