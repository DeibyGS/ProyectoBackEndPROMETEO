const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary").v2;
const User = require("../../api/models/user.model");
const userData = require("../../api/data/userData");
require("dotenv").config();
const connectCloudinary = require("../../config/cloudinary");

// Conectar a Cloudinary
connectCloudinary();

const launchSeedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Conectado a MongoDB.");

    // 🧹 1. Borrar colección anterior
    await User.collection
      .drop()
      .catch(() => console.log("ℹ️ No había colección previa."));
    console.log("🧹 Colección User limpiada.");

    // 🧽 2. Borrar todas las imágenes antiguas de Cloudinary
    const folderName = "project_backend_prometeo";
    const { resources } = await cloudinary.api.resources({
      type: "upload",
      prefix: `${folderName}/`,
      max_results: 100,
    });

    if (resources.length > 0) {
      // Borra todos los archivos que tengan ese prefijo
      await cloudinary.api.delete_resources_by_prefix(folderName);
      console.log(
        `🗑️ Se eliminaron todas las imágenes de la carpeta '${folderName}' en Cloudinary.`
      );
    } else {
      console.log(`ℹ️ No había imágenes en la carpeta '${folderName}'.`);
    }

    // 👥 3. Crear nuevos usuarios
    for (const user of userData) {
      const upload = await cloudinary.uploader.upload(`./public${user.image}`, {
        folder: "project_backend_prometeo",
      });

      const newUser = new User({
        username: user.username,
        email: user.email,
        password: user.password,
        image: upload.secure_url,
      });

      await newUser.save();
      console.log(`👤 Usuario creado: ${newUser.username}`);
    }

    console.log("✅ Usuarios insertados correctamente.");
    await mongoose.disconnect();
    console.log("🔌 Desconectado de MongoDB.");
  } catch (error) {
    console.error("❌ Error en la seed de usuarios:", error);
  }
};

launchSeedUsers();
