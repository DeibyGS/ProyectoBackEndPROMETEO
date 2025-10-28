const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { generateSign } = require("../../utils/jwt");

const register = async (req, res, next) => {
  try {
    // Verificamos cuántos usuarios hay en la base de datos
    const userCount = await User.countDocuments();

    // Si no hay ninguno, el primero será admin; los demás serán user
    const newUser = new User({
      ...req.body,
      role: userCount === 0 ? "admin" : "user",
    });

    if (req.file) {
      newUser.image = req.file.path;
    }

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    if (bcrypt.compareSync(password, user.password)) {
      const token = generateSign(user._id);
      return res.status(200).json({ token, user, message: "Login successful" });
    } else {
      return res.status(404).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Invalid credentials" });
  }
};

module.exports = {
  register,
  login,
};
