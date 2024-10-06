import express from "express";
import {
  signupUser,
  loginUser,
  logoutUser,
  getAllUsers,
  deleteUser,
} from "../controllers/userController.js";

const userRoutes = express.Router();

// Signup route
userRoutes.post("/signup", signupUser);

// Login route
userRoutes.post("/login", loginUser);

// Logout route
userRoutes.get("/logout", logoutUser);

// Get all users
userRoutes.get("/users", getAllUsers);

// Delete user
userRoutes.delete("/users/:id", deleteUser);

export default userRoutes;
