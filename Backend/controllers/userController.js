const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");


const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //validation for empty field, password, duplicate email

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill blanck field/s");
  }

  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must have atleast 6 characters");
  }
  const userExists = await User.findone({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
    // creat new user
    const user = await User.create({
      name, //(name: name)
      email,
      password,
    });
  }
});

module.exports = { registerUser };
