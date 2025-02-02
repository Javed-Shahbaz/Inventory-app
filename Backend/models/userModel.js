const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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
      //maxLength: [23, "Password not exceed 23 characters"],
    },
    photo: {
      type: String,
      default: "C:UsersJawedDesktoppic.jpg",
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

//Encrypt password before saving to Data Base
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  //hashed password
  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(this.password, salt);
  this.password = hashedpassword;
  next();
});
const User = mongoose.model("User", userSchema);

module.exports = User;
