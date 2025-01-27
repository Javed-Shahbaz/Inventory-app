const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Your Name"],
    },
    email: {
      type: String,
      required: [true, "Please Enter Your Email"],
      unique: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please Enter Valid Email"],
    },
    password: {
      type: String,
      required: [true, "Please Enter a Password"],
      minLength: [6, "Password must contains 6 characters"],
      maxLength: [23, "Password not exceed 23 characters"],
    },
    photo: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "+92",
    },
    bio: {
      type: String,
      maxLength: [250, "Biography not exceed 250 characters"],
      default: "Biography",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
