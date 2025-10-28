const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const upload = multer({
  storage: new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "project_backend_prometeo",
      allowed_formats: ["jpg", "png", "jpeg", "gif", "heic"],
    },
  }),
});

module.exports = upload;
