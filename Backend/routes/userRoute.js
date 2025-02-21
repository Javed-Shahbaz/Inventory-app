const {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  loginStatus,
  updateUser,
  changePassword,
} = require("../controllers/userController.js");

const express = require("express");
const protect = require("../middleWare/authMiddleware.js");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/getuser", protect, getUser);
router.get("/loggedIn", loginStatus);
router.patch("/update", protect, updateUser);
router.patch("/changePassword", protect, changePassword);

module.exports = router;
