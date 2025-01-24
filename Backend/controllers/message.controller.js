const { cloudinary } = require("../libs/cloudinary");
const { Message } = require("../models/message.model.js");
const { User } = require("../models/user.model.js");

const getUsers = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const filteredUser = await User.find({ _id: { $ne: loggedInUser } }).select(
      "-password"
    );

    res.status(200).json(filteredUser);
  } catch (error) {}
};

const getMessages = async (req, res) => {
  try {
    const { id: userToChat } = req.params;
    const myId = req.user._id;
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChat },
        { senderId: userToChat, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error while getting the messages::", error);
    res.status(400).json({ message: "Error in getting the messages" });
  }
};

const sendMessages = async (req, res) => {
  try {
    const { message, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;

    if (image) {
      const cloudinaryUpload = await cloudinary.uploader.upload(image);
      imageUrl = cloudinaryUpload.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
      image: imageUrl,
    });

    await newMessage.save();

    res.status(200).json(newMessage);
  } catch (error) {
    console.log("Error while sending the message::", error);
    res.status(400).json({ message: "Errr in sending the message" });
  }
};

module.exports = { getUsers, getMessages, sendMessages };
