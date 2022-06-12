const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const chalk = require("chalk");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const flash = require("connect-flash");
const xss = require("xss-clean");
const path = require("path");
const hpp = require("hpp");
const passport = require("passport");
const localStrategy = require("passport-local");
const bcrypt = require("bcrypt");

const User = require("./models/user.model");
const Project = require("./models/project.mongo");
const AuthRoutes = require("./routes/auth");
const MilestoneRoutes = require("./routes/milestones");
const campaignRouter = require("./routes/campaign.router");
const projectRouter = require("./routes/project.routes");
const AdminRouter = require("./routes/admin.router");
const Milestone = require("./models/milestone.model");
const { userAuth } = require("./middleware/auth");

require("dotenv").config();

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require("node-localstorage").LocalStorage;
  localStorage = new LocalStorage("./scratch");
}

const app = express();
const port = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

const sessionOptions = {
  secret: "thisIsNotAGoodSecret",
  resave: false,
  saveUninitialized: true,
};
app.use(session(sessionOptions));
app.use(flash());

//app.use(cors());
app.use(morgan("dev"));
app.use(mongoSanitize());
app.use(helmet());
app.use(hpp());
app.use(xss());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const uri = process.env.ATLAS_URI;
//here we need to pass out local database or cloud database
mongoose.connect(uri).catch((err) => {
  console.log(err.message);
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection successful");
});

app.set("view engine", "ejs");

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use("/auth", AuthRoutes);
app.use("/campaign", campaignRouter);
app.use("/project", projectRouter);
app.use("/milestone", MilestoneRoutes);
app.use("/admin", AdminRouter);

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/employee", userAuth, async (req, res) => {
  const milestoneDetails = await Milestone.find({});
  // console.log(chalk.redBright(milestoneDetails));
  const milestones = [];
  // console.log(chalk.greenBright(req.user._id));
  // console.log(chalk.greenBright(milestoneDetails[0].assigned[0]));
  milestoneDetails.forEach((milestone) => {
    for (var i = 0; i < milestone.assigned.length; i++) {
      if (
        JSON.stringify(milestone.assigned[i]) === JSON.stringify(req.user?._id)
      ) {
        milestones.push(milestone);
      }
    }
    // if (milestone.assigned.includes(JSON.stringify(req.user?._id))) {
    //   milestones.push(milestone);
    // }
  });
  res.render("employeeMilestones", { milestonesDetails: milestones });
});

app.get("/donor", userAuth, async (req, res) => {
  if (req.user.role !== "donor") {
    return res.redirect("/auth/login");
  }

  const project = await Project.findOne({ projectDonor: req.user._id });

  res.render("donor", { project });
});

app.get("/manager/", (req, res) => {
  const milestonesDetails = [
    {
      id: 1,
      name: "Milestone 1",
      description: "Some Description here",
      created: "04/06/2022",
      deadline: "31/08/2022",
      completed: "false",
      assigned: [
        {
          name: "Sakshi",
        },
        {
          name: "Aarthi",
        },
        {
          name: "Geervani",
        },
      ],
    },
    {
      id: 2,
      name: "Milestone 2",
      description:
        "Pellentesque ut neque. Sed a libero. Donec posuere vulputate arcu. Aenean commodo ligula eget dolor. Donec vitae orci sed dolor rutrum auctor.",
      created: "04/06/2022",
      deadline: "31/08/2022",
      completed: "false",
      assigned: [
        {
          name: "Sakshi",
        },
        {
          name: "Aarthi",
        },
        {
          name: "Geervani",
        },
      ],
    },
    {
      id: 3,
      name: "Milestone 3",
      description: "Some Description here",
      created: "04/06/2022",
      deadline: "31/08/2022",
      completed: "false",
      assigned: [
        {
          name: "Sakshi",
        },
        {
          name: "Aarthi",
        },
        {
          name: "Geervani",
        },
      ],
    },
    {
      id: 4,
      name: "Milestone 4",
      description: "Some Description here",
      created: "04/06/2022",
      deadline: "31/08/2022",
      completed: "false",
      assigned: [
        {
          name: "Sakshi",
        },
        {
          name: "Aarthi",
        },
        {
          name: "Geervani",
        },
      ],
    },
    {
      id: 5,
      name: "Milestone 5",
      description: "Some Description here",
      created: "04/06/2022",
      deadline: "31/08/2022",
      completed: "false",
      assigned: [
        {
          name: "Sakshi",
        },
        {
          name: "Aarthi",
        },
        {
          name: "Geervani",
        },
      ],
    },
  ];
  res.render("manager_index_milestone", { milestonesDetails });
});

app.get("/manager/project/:id/milestone/create", (req, res) => {
  res.render("manager_create_milestone", { project_id: req.params.id });
});

app.get("/manager/project/:project_id/milestone/edit/:id", (req, res) => {
  const milestoneDetails = {
    id: 1,
    name: "Milestone 1",
    description: "Some Description here",
    created: "04/06/2022",
    deadline: "31/08/2022",
    completed: "false",
    assigned: [
      {
        name: "Sakshi",
      },
      {
        name: "Geervani",
      },
    ],
  };
  res.render("manager_edit_milestone", {
    project_id: req.params.project_id,
    milestone: milestoneDetails,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
