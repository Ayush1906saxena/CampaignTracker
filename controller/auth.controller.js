const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var store = require("store");

const User = require("../models/user.model");
const Milestone = require("../models/milestone.model");

const signup = async (req, res) => {
  try {
    const { name, username, role, password } = req.body;

    const user = await User.findOne({ username });
    if (user) {
      req.flash("error", "User Already Exists");
      res.redirect("/auth/login");
    }

    const saltPassword = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(password, saltPassword);

    new User({
      username,
      name,
      password: securePassword,
      role,
    })
      .save()
      .then((newUser) => {
        //   console.log("new user is:", newUser);

        const token = jwt.sign(
          { id: newUser._id, username: newUser.username },
          process.env.JWT_SECRET_BCRYPT
        );

        // store.set("token", token);
        localStorage.setItem("token", token);

        req.flash("success", "Registered");
        if (role == "manager") {
          res.redirect("/milestone");
        } else if (role == "admin") {
          res.redirect("/admin");
        } else if (role == "donor") {
          res.redirect("/donor");
        } else if (role == "employee") {
          res.redirect("/employee");
        }
      })
      .catch((error) => {
        req.flash("error", error.message);
        console.log(error);
        res.redirect("/auth/register");
      });
    // bcrypt.genSalt(10, function (err, salt) {
    //   if (err) return next(err);
    //   bcrypt.hash(password, salt, async function (err, hash) {
    //     if (err) return next(err);
    //     const user = new User({ name, username, role, password: hash });
    //     const registeredUser = await User.register(user, hash);
    //     req.login(registeredUser, (err) => {
    //       req.flash("success", "Registered");
    //       res.redirect("/dashboard");
    //     });
    //   });
    // });
  } catch (e) {
    req.flash("error", e.message);
    console.log(e);
    res.redirect("/auth/register");
  }
};

const login = async (req, res) => {
  try {
    const { password, username } = req.body;
    const user = await User.findOne({
      username,
    });

    if (!user) {
      return res.send({ status: "error", msg: "Invalid username/password" });
    }

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET_BCRYPT
      );

      // req.session.token = token;
      // store.set("token", token);
      localStorage.setItem("token", token);

      req.flash("success", "Registered");
      if (user.role === "manager") {
        const lastmilestone = await Milestone.findOne({ assigned: user._id });
        if (lastmilestone) {
          return res.redirect("/milestone/" + lastmilestone._id);
        }
        return res.redirect("/milestone/629b581d076eadae5be0f224");
      } else if (user.role === "admin") {
        res.redirect("/admin");
      } else if (user.role === "donor") {
        res.redirect("/donor");
      } else {
        res.redirect("/employee");
      }

      //   return res.send({
      //     status: "ok",
      //     data: token,
      //     success: true,
      //   });
    }

    // return res.send({
    //   status: "error",
    //   msg: "Invalid username/password",
    //   success: false,
    // });
  } catch (err) {
    // return res.status(500).json({ success: false, msg: "Server error", err });
    req.flash("error", err.message);
    console.log(err);
    res.redirect("/auth/register");
  }
  //   req.flash("success", "Welcome Back!");
  //   const redirectUrl =
  //     req.session.returnTo || "/milestone/629b581d076eadae5be0f224";
  //   delete req.session.returnTo;
  //   res.redirect(redirectUrl);
  //res.status(200).json('logged in');
};

module.exports = { signup, login };
