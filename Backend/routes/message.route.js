const express = require("express");
const {
  getUsers,
  getMessages,
  sendMessages,
} = require("../controllers/message.controller");
const protectedRoute = require("../middlewares/auth.middleware");
const router = express.Router();

router.get("/message", protectedRoute, getUsers);
router.get("/:id", protectedRoute, getMessages);
router.post("/send/:id", protectedRoute, sendMessages);

module.exports = router;
