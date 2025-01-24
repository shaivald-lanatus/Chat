const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(
      "mongodb+srv://shaival:shaival123@cluster0.ngaay.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );

    console.log("Connected Successfully::", connect.connection.host);
  } catch (error) {
    console.log("Error find::", error);
  }
};
module.exports = connectDB;
