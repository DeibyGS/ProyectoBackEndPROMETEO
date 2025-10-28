const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: false,
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
        required: false,
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre("save", function () {
  this.password = bcrypt.hashSync(this.password, 10);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
