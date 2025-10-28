const e = require("express");
const User = require("../models/user.model");
const deleteFiles = require("../../utils/deleteFiles");

// Get all users
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
// Get a user by ID
const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

//get comments and posts of user by ID

const getUserWithPostsAndCommentsById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id)
      .select("username posts comments")
      .populate({
        path: "posts",
        select: "title content",
      })
      .populate({
        path: "comments",
        select: "content author",
        populate: {
          path: "author",
          select: "username",
        },
      });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// Update a user by ID
const updateUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};
// Delete a user by ID
const deleteUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    deleteFiles(deletedUser.image);

    return res
      .status(200)
      .json({ user: deletedUser, message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  getUserWithPostsAndCommentsById,
  updateUserById,
  deleteUserById,
};
