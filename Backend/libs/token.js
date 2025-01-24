const jsonwebtoken = require("jsonwebtoken");

const generateToken = (userId, res) => {
  const token = jsonwebtoken.sign({ userId }, "NEW", {
    expiresIn: "7d",
  });
  console.log("token", token);
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });

  return token;
};
module.exports = generateToken;
