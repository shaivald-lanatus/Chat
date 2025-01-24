const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    message: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Message = new mongoose.model("Message", messageSchema);
module.exports = { Message };
