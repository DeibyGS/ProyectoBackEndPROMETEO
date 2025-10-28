const {
  isAuth,
  authorizeAdminOrSelf,
  authorizeAdmin,
} = require("../../middlewares/isAuth");

const {
  createComment,
  getAllComments,
  getCommentById,
  getCommentsByPostId,
  updateCommentById,
  deleteCommentById,
} = require("../controllers/comment.controller");

const commentRouter = require("express").Router();

// Create a new comment
commentRouter.post("/", isAuth, createComment);

// Get all comments
commentRouter.get("/", isAuth, authorizeAdmin, getAllComments);

// Get comments by post ID
commentRouter.get("/post/:postId", isAuth, getCommentsByPostId);

// Get a comment by ID
commentRouter.get("/:id", isAuth, getCommentById);

// Update a comment by ID
commentRouter.put("/:id", isAuth, authorizeAdminOrSelf, updateCommentById);

// Delete a comment by ID
commentRouter.delete("/:id", isAuth, authorizeAdminOrSelf, deleteCommentById);

module.exports = commentRouter;
