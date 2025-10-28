const mongoose = require("mongoose");

const { Schema } = mongoose;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
        required: false,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
