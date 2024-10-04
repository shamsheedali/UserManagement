const userSchema = require("../Model/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await userSchema.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userSchema({
      username,
      email,
      password: hashedPassword,
    });

    // Save user to database
    await newUser.save();

    const token = jwt.sign(
      {
        id: newUser._id,
        email: newUser.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({ message: "Signup successful", token, newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User Not Available" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ message: "Login Successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const profile = (req, res) => {
  res.status(200).json({ message: "Token verified, Profile Page Success" });
};

const update = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  try {
    const imageBuffer = req.file.buffer.toString("base64");
    const userId = req.user.id;

    await userSchema.findByIdAndUpdate(userId, { profileImage: imageBuffer });
    res.status(200).json({ message: "Profile image uploaded successfully!" });
    console.log("Profile image uploaded successfully!");
  } catch (error) {
    res.status(500).json({ error: "Error uploading profile image" });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await userSchema
      .findById(req.user.id)
      .select("username profileImage");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ username: user.username, profileImage: user.profileImage });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user profile" });
  }
};

module.exports = {
  registerUser,
  login,
  profile,
  update,
  getUserProfile,
};
