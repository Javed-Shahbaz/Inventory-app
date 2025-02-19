const {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  loginStatus,
  updateUser,
} = require("../controllers/userController.js");

const express = require("express");
const protect = require("../middleWare/authMiddleware.js");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/getuser", protect, getUser);
router.get("/loggedin", loginStatus);
router.patch("/update", protect, updateUser);

module.exports = router;
