const e = require("express");
const Post = require("../models/post.model");

// Create a new post
const createPost = async (req, res, next) => {
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    return res.status(400).json({ message: "Invalid data" });
  }
};

// Get all posts
const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find()
      .populate({ path: "author", select: "username" })
      .populate({
        path: "comments",
        select: "content author",
        populate: { path: "author", select: "username" },
      });
    if (posts.length === 0) {
      return res.status(404).json({ message: "No posts found" });
    }
    res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
// Get a post by ID
const getPostById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id)
      .populate({ path: "author", select: "username" })
      .populate({
        path: "comments",
        select: "content author",
        populate: { path: "author", select: "username" },
      });
    if (!post) {
      return res
        .status(404)
        .json({ message: "Post not found", error: error.message });
    }
    res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getPostsByAuthorId = async (req, res, next) => {
  try {
    const { authorId } = req.params;
    const posts = await Post.find({ author: authorId })
      .populate({ path: "author", select: "username" })
      .populate({
        path: "comments",
        select: "content author",
        populate: { path: "author", select: "username" },
      });
    if (posts.length === 0) {
      return res.status(404).json({
        message: "No posts found for this author",
        error: error.message,
      });
    }
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Post Noy found", error: error.message });
  }
};

const updatePostById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedPost = await Post.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: "Invalid data", error: error.message });
  }
};

// Delete a post by ID
const deletePostById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  getPostsByAuthorId,
  updatePostById,
  deletePostById,
};
