const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const routes = require("./routes/auth.route");
const connectDB = require("./libs/db");
const messageRoutes = require("./routes/message.route");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cookieParser());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", routes);
app.use("/api", messageRoutes);

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(PORT, () => {
  console.log(`Runssning on ${PORT}`);
  connectDB();
});
