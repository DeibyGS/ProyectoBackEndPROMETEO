const { verifyToken } = require("../utils/jwt");
const User = require("../api/models/user.model");

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const { id } = verifyToken(token);
    const user = await User.findById(id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user; // ahora req.user contiene info del usuario
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

const authorizeAdminOrSelf = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Si es admin o si está intentando modificar/eliminar su propia cuenta
  if (req.user.role === "admin" || req.user._id.toString() === req.params.id) {
    return next();
  }

  return res
    .status(403)
    .json({ message: "You are not authorized to perform this action" });
};

// Middleware específico para admin
const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Only admins can access this resource" });
  }
  next();
};

module.exports = { isAuth, authorizeAdminOrSelf, authorizeAdmin };
