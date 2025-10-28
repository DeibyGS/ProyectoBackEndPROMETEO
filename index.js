require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/db");
const authRouter = require("./src/api/routes/auth.router");
const userRouter = require("./src/api/routes/user.router");
const postRouter = require("./src/api/routes/post.router");
const commentRouter = require("./src/api/routes/comment.router");
const errorHandler = require("./src/middlewares/error.middleware");
const connectCloudinary = require("./src/config/cloudinary");

const app = express();
app.use(express.json());
connectDB();
connectCloudinary();

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);

app.use(errorHandler);

app.use((req, res) => {
  res.status(404).json({ message: "Route Not Found" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
