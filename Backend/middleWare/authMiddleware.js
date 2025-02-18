const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// Middleware to protect routes from unauthorized access
const protect = asyncHandler(async (req, res, next) => {
  try {
    // Extract token from HTTP-only cookie
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Not Authorized, Please login" });
    }

    // Verify token
    const verified = jwt.verify(token, process.env.JWT_KEY);

    // Get user from token (excluding password)
    const user = await User.findById(verified.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not Found" });
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized access" });
  }
});

module.exports = protect;
