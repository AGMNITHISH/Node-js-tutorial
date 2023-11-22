const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username required"],
    },
    email: {
      type: String,
      required: [true, "email required"],
      unique: true,
    },
    role: {
      type: String,
      required: [true, "role is required"],
      default: "Js Full Stack Dev",
    },
    password: {
      type: String,
      required: [true, "password required"],
    },
  },

  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
