const { cloudinary } = require("../libs/cloudinary");
const generateToken = require("../libs/token");
const { User } = require("../models/user.model.js");
const bcrypt = require("bcryptjs");

const signup = async (req, res) => {
  const { fullName, password, email } = req.body;
  try {
    if (!fullName || !password || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePhoto: newUser.profilePhoto,
      });
    } else {
      return res.status(400).json({ message: "Enter the valid data" });
    }
  } catch (error) {
    console.log("Error while signing");
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!email || !password) {
      return res.status(400).json({
        message: "Enter all credentials",
      });
    }

    if (!user) {
      return res.status(400).json({ message: "User dont exists" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Incorrect Password" });
    }

    generateToken(user._id, res);

    res.status(200).json({
      //   _id: user._id,
      //   fullName: user.fullName,
      //   email: user.email,
      //   profilePic: user.profilePic,

      message: "Successful",
    });
  } catch (error) {
    console.log("Not the correct way");
    return res
      .status(500)
      .json({ message: "Internal Server Error while logging" });
  }
};

const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Problem in logging out::", error);
  }
};

const updateProfile = async (req, res) => {
  try {
    const { profilePhoto, fullName, email } = req.body;
    const userId = req.user._id;

    if (!fullName || !email) {
      return res.status(401).json({ message: "Profile Photo is required" });
    }
    const cloudinaryUpload = await cloudinary.uploader.upload(profilePhoto);
    const updateUser = await User.findByIdAndUpdate(
      userId,
      {
        profilePhoto: cloudinaryUpload.secure_url,
        fullName: fullName,
        email: email,
      },
      { new: true }
    );

    res.status(200).json(updateUser);
  } catch (error) {
    console.log("Error in updating", error);
    return res.status(400).json({ message: "Error while updating this" });
  }
};

const updateDetails = async (req, res) => {
  try {
    const { fullName, email } = req.body;
    const userId = req.user._id;

    if (!fullName || !email) {
      return res
        .status(400)
        .json({ message: "Fullname and Email are required" });
    }

    const updateUser = await User.findByIdAndUpdate(
      userId,
      {
        fullName: fullName,
        email: email,
      },
      { new: true }
    );

    if (!updateUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      fullName: updateUser.fullName,
      email: updateUser.email,
    });
  } catch (error) {
    console.log("Error", error);
    return res
      .status(400)
      .json({ message: "Error while updating the user details" });
  }
};

const checkProfile = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checking in ", error);
    return res.status(400).json({ message: "Error while checking this" });
  }
};

module.exports = {
  signup,
  login,
  logout,
  updateProfile,
  checkProfile,
  updateDetails,
};
