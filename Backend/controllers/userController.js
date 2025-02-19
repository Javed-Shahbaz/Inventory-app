const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Generating Token for Authentication
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: "7d" });
};

// Register User
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill all fields");
  }

  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be at least 6 characters long");
  }

  // Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Create new user
  const user = await User.create({
    name,
    email,
    password,
  });

  // Generate Token
  const token = generateToken(user._id);

  // Send HTTP-Only cookie
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 24 * 60 * 60), // 1 day
    //sameSite: "none",
    //secure: true,
  });

  if (user) {
    const { _id, name, email, photo, phone, bio } = user;
    res.status(201).json({
      id: _id,
      name,
      email,
      photo,
      phone,
      bio,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// Login User
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // Validate request
  if (!email || !password) {
    res.status(400);
    throw new Error("Please Enter Email & Password");
  }
  // Check whether user exists or not
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("User doesn't exist, Please Signup");
  }
  // User Exists, Check if password correct or not
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  // Generate Token
  const token = generateToken(user._id);

  // Send HTTP-Only cookie
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 24 * 60 * 60), // 1 day
    sameSite: "none",
    secure: false,
  });

  if (user && isPasswordCorrect) {
    const { _id, name, email, photo, phone, bio } = user;
    res.status(200).json({
      id: _id,
      name,
      email,
      photo,
      phone,
      bio,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

// Logout User
const logoutUser = asyncHandler(async (req, res) => {
  // Clear HTTP-Only cookie
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0), // Expire cookie immediately
    // sameSite: "none",
    // secure: true,
  });

  return res.status(200).json({ message: "Successfully Logged out" });
});

const getUser = asyncHandler(async (req, res) => {
  // Fetch user from database
  const user = await User.findById(req.body.id);

  // If user is not found, return an error
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Generate Token
  const token = generateToken(user._id);

  // Send HTTP-Only Cookie (Check if it's being set properly)
  res.cookie("token", token, {
    path: "/getuser",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 24 * 60 * 60), // 1 day
    sameSite: "none",
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
  });

  // Return user data
  const { _id, name, email, photo, phone, bio } = user;
  res.status(200).json({ _id, name, email, photo, phone, bio });
});

// Getting LoggedIn Status
const loginStatus = asyncHandler(async (req, res) => {
  const token = req.cookies.token;

  // Log token value for debugging
  console.log("Token received:", token);

  if (!token) {
    return res.status(401).json({ message: "Not Logged In" });
  }

  res.status(200).json({ message: "User is Logged In", token });
});

// Update User
const updateUser = asyncHandler(async (req, res) => {
  res.send("User updated Successfully");
});
module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  loginStatus,
  updateUser,
};
