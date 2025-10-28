const e = require("express");
const Comment = require("../models/comment.model");

// Create a new comment
const createComment = async (req, res, next) => {
  try {
    const newComment = new Comment(req.body);
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    return res.status(400).json({ message: "Invalid data" });
  }
};

// Get all comments
const getAllComments = async (req, res, next) => {
  try {
    const comments = await Comment.find()
      .populate({ path: "author", select: "username -_id" })
      .populate({
        path: "post",
        select: "title content -_id",
        populate: { path: "author", select: "username -_id" },
      });

    if (comments.length === 0) {
      return res.status(404).json({ message: "No comments found" });
    }
    res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
// Get a comment by ID
const getCommentById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findById(id)
      .populate({ path: "post", select: "title content" })
      .populate({ path: "author", select: "username" });
    if (!comment) {
      return res
        .status(404)
        .json({ message: "Comment not found", error: error.message });
    }
    res.status(200).json(comment);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getCommentsByPostId = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ post: postId })
      .populate({ path: "post", select: "title content -_id" })
      .populate({ path: "author", select: "username -_id" });
    if (comments.length === 0) {
      return res.status(404).json({
        message: "No comments found for this post",
        error: error.message,
      });
    }
    res.status(200).json(comments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Comments Not found", error: error.message });
  }
};

const updateCommentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedComment = await Comment.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json(updatedComment);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete a comment by ID
const deleteCommentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedComment = await Comment.findByIdAndDelete(id);
    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  createComment,
  getAllComments,
  getCommentById,
  getCommentsByPostId,
  updateCommentById,
  deleteCommentById,
};
