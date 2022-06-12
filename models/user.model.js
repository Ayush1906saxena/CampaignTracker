const mongoose = require("mongoose");
// const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["donor", "manager", "admin", "employee"],
      required: true,
    },
    username: {
      // email == username (passport requires a username)
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("user", UserSchema);
