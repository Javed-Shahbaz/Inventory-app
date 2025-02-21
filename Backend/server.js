const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoute = require("./routes/userRoute");
const errorHandler = require("./models/errorMiddleware");
const cookieParser = require("cookie-parser");

const app = express();

// Middleware (ORDER MATTERS!)
app.use(cors({ origin: "http://localhost:3000", credentials: true })); // If using frontend
app.use(express.json()); // Enables JSON parsing
app.use(express.urlencoded({ extended: true })); // Enables URL-encoded form data parsing
app.use(cookieParser()); // Parses cookies

// Routes Middleware
app.use("/api/users", userRoute);

// Home Page Route
app.get("/", (req, res) => {
  res.send("Welcome to the Home Page");
});

// Login Page Route
app.get("/login", (req, res) => {
  res.send("Login Page");
});

// Register User Route
app.get("/register", (req, res) => {
  res.send("Register Page");
});
// Get User Data Route
app.get("/getuser", (req, res) => {
  res.send("Get User Page");
});
// Update User Route
app.get("/update", (req, res) => {
  res.send("Update User Page");
});
// Register User Route
app.get("/changePassword", (req, res) => {
  res.send("Change Password Page");
});
// Error Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

// Connecting to MongoDB database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is Running on port ${PORT} \nConnected to MongoDB`);
    });
  })
  .catch((err) => {
    console.log("Server Error", err.message);
  });
