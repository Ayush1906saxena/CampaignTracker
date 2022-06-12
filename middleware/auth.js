const jwt = require("jsonwebtoken");
const chalk = require("chalk");

const User = require("../models/user.model");

// module.exports.isLoggedin = (req, res, next) => {
//   if (!req.isAuthenticated()) {
//     req.session.returnTo = req.originalUrl;
//     req.flash("error", "You must be signed in!");
//     return res.redirect("/login");
//   }
//   next();
// };

exports.userAuth = async (req, res, next) => {
  try {
    // Get the token from the header
    // const token = req.session.token;
    const token = localStorage.getItem("token");
    // const token = store.get("token");
    console.log(token);

    // Check if no token
    if (!token) {
      req.flash("error", "Login first");
      return res.redirect("/auth/login");
      // return res.status(401).json({ msg: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_BCRYPT);
    // console.log(decoded);
    const user = await User.findById(decoded.id);
    // console.log(chalk.greenBright(user));
    req.user = user;
    res.locals.user = user;
    req.session.role = user.role;
    // console.log(chalk.blueBright(req.user.role));
    return next();
  } catch (err) {
    // console.log(err);
    // return res.status(401).json({ msg: "Authorization failed" });
    req.flash("error", "Authorization failed");
    return res.redirect("/auth/login");
  }
};

// module.exports.isLoggedinAdmin = (req, res, next) => {
//   if (!req.isAuthenticated()) {
//     req.session.returnTo = req.originalUrl;
//     req.flash("error", "You must be signed in!");
//     return res.redirect("/loginAdmin");
//   }
//   next();
// };
