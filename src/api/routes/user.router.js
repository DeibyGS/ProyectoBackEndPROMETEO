const {
  isAuth,
  authorizeAdminOrSelf,
  authorizeAdmin,
} = require("../../middlewares/isAuth");
const {
  getAllUsers,
  getUserById,
  getUserWithPostsAndCommentsById,
  updateUserById,
  deleteUserById,
} = require("../controllers/user.controller");

const userRouter = require("express").Router();

// Get all users
userRouter.get("/", isAuth, authorizeAdmin, getAllUsers);

// Get a user by ID
userRouter.get("/:id", isAuth, getUserById);

// Get a user with their posts and comments by ID
userRouter.get("/details/:id", isAuth, getUserWithPostsAndCommentsById);

// Update a user by ID
userRouter.put("/:id", isAuth, authorizeAdmin, updateUserById);

// Delete a user by ID
userRouter.delete("/:id", isAuth, authorizeAdminOrSelf, deleteUserById);

module.exports = userRouter;
