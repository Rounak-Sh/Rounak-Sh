import bcrypt from "bcrypt";
import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";

// User signup controller
export const signupUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists." });
    }

    const hashpassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashpassword,
    });

    await newUser.save();
    return res
      .status(201)
      .json({ status: true, message: "User registered successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Error during user registration." });
  }
};

// User login controller
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User is not registered." });
    }

    const validpassword = await bcrypt.compare(password, user.password);
    if (!validpassword) {
      return res.status(401).json({ message: "Password is incorrect." });
    }

    // Role-based token creation
    const token = jwt.sign(
      { username: user.username, role: user.role },
      process.env.KEY,
      { expiresIn: "1h" }
    );
    res.cookie("token", token, { httpOnly: true, maxAge: 360000 });

    const roleMessage =
      user.role === "admin"
        ? "Admin login successful"
        : "User login successful";
    return res.json({
      status: true,
      message: roleMessage,
      role: user.role,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error during login." });
  }
};

// User logout controller
export const logoutUser = (req, res) => {
  res.clearCookie("token");
  return res.json({ status: true });
};

// Get all users controller
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).select(
      "username email role"
    );
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching users" });
  }
};

// Delete user controller
export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    await User.findByIdAndDelete(userId);
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting user" });
  }
};
