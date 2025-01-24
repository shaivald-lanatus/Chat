const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model");

const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(400).json({ message: "Login first" });
    }
    const newww = jwt.verify(token, "NEW");
    if (!newww) {
      return res.status(401).json({ message: "Unauthorized token" });
    }

    const user = await User.findById(newww.userId).select("-password");
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = protectedRoute;
