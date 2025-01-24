const express = require("express");
const {
  signup,
  login,
  logout,
  updateProfile,
  checkProfile,
} = require("../controllers/auth.controller");
const protectedRoute = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.put("/update", protectedRoute, updateProfile);
router.get("/checkData", protectedRoute, checkProfile);

module.exports = router;
