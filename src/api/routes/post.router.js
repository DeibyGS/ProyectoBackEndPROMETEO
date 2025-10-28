const {
  isAuth,
  authorizeAdminOrSelf,
  authorizeAdmin,
} = require("../../middlewares/isAuth");

const {
  createPost,
  getAllPosts,
  getPostById,
  getPostsByAuthorId,
  updatePostById,
  deletePostById,
} = require("../controllers/post.controller");

const postRouter = require("express").Router();

// Create a new post
postRouter.post("/", isAuth, createPost);

// Get all posts
postRouter.get("/", isAuth, authorizeAdmin, getAllPosts);

// Get posts by author ID
postRouter.get("/author/:authorId", isAuth, authorizeAdmin, getPostsByAuthorId);

// Get a post by ID
postRouter.get("/:id", isAuth, authorizeAdmin, getPostById);

// Update a post by ID
postRouter.put("/:id", isAuth, authorizeAdminOrSelf, updatePostById);

// Delete a post by ID
postRouter.delete("/:id", isAuth, authorizeAdminOrSelf, deletePostById);

module.exports = postRouter;
