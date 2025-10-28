const cloudinary = require("cloudinary").v2;

const deleteFiles = async (filePaths) => {
  const array = filePaths.split("/");
  const name = array.at(-1).split(".")[0];
  let public_id = `${array.at(-2)}/${name}`;

  cloudinary.uploader.destroy(public_id, () => {
    console.log("Deleted file:", public_id);
  });
};

module.exports = deleteFiles;
