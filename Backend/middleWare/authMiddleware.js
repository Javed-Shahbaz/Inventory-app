const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// Middleware to protect routes from unauthorized access
const protect = asyncHandler(async (req, res, next) => {
  try {
    // Correct cookie access
    let token = req.cookies.token;
    if (!token) {
      res.status(401);
      throw new Error("Not Authorized, Please login");
    }

    // Verify token
    const verified = jwt.verify(token, process.env.JWT_KEY);

    // Get user from token
    const user = await User.findById(verified.id).select("-password");

    if (!user) {
      res.status(404);
      throw new Error("User not Found");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: error.message || "Unauthorized access" });
  }
});

module.exports = protect;
