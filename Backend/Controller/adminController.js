const adminSchema = require("../Model/AdminModal");
const userSchema = require("../Model/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await adminSchema.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Admin Not Available" });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const token = jwt.sign(
      {
        id: admin._id,
        email: admin.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ message: "Admin Login Successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const fetchUsers = async(req, res) => {
  try {
    const users = await userSchema.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
}

const deleteUser = async(req, res) => {
  const userId = req.params.id;
  try {
    await userSchema.findByIdAndDelete({_id: userId});
    res.status(200).json({message: "User Deleted Successfully"});
    console.log("User Deleted Successfully");
  } catch (error) {
    res.status(500).json({message: "Unable to Delete User"});
  }
}

const editUser = async(req, res) => {
  const userId = req.params.id;
  const {username, email} = req.body;
  try{
    const updatedUser = await userSchema.findByIdAndUpdate({_id: userId}, {$set:{username, email}}, {new: true});
    res.status(200).json({message:"User Details Updated", updatedUser});
  }catch(error) {
    res.status(500).json({message: "Unable to Edit User"});
  }
}

module.exports = {
  login,
  fetchUsers,
  deleteUser,
  editUser
};
