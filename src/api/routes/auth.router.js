const { register, login } = require("../controllers/auth.controller");
const authRouter = require("express").Router();
const upload = require("../../middlewares/file");

// Register a new user
authRouter.post("/register", upload.single("image"), register);
// Login a user
authRouter.post("/login", login);
module.exports = authRouter;
