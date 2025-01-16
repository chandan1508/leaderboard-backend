import jwt from "jsonwebtoken";
import User from "../models/Users.js";

const JWT_SECRET = process.env.JWT_SECRET;

// get single user
export const getSingleUser = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(403).json({
        message: "Please Login",
      });
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decodedData.id).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching user", error: err.message });
  }
};

// Get All Users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ totalPoints: -1 });
    res.status(200).json(users);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: err.message });
  }
};

export const claimPoints = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(403).json({
        message: "Please Login",
      });
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decodedData.id);

    // Generate random points between 1 and 10
    const points = Math.floor(Math.random() * 10) + 1;

    // Find the user by ID
    // const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update the user's total points
    user.totalPoints += points;
    await user.save();

    // Fetch and sort updated users by total points
    const updatedUsers = await User.find()
      .select("-password")
      .sort({ totalPoints: -1 });

    // Respond with the awarded points and updated leaderboard
    res.status(200).json({ points, updatedUsers });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error claiming points", error: err.message });
  }
};
