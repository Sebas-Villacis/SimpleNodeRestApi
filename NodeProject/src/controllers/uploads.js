const path = require("path");
const fs = require("fs");
const { response } = require("express");
const { v4: uuidv4 } = require("uuid");
const { updateImage } = require("../helpers/update-image");

const fileUpload = (req, res = response) => {
  const type = req.params.type;
  const id = req.params.id;

  const validTypes = ["hospitals", "doctors"];
  if (!validTypes.includes(type)) {
    return res.status(400).json({
      ok: false,
      msg: "Invalid type. Valid types: hospitals,doctors",
    });
  }

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      msg: "No files were uploaded.",
    });
  }

  // Process image
  const file = req.files.image;

  const shortName = file.name.split("."); // wolverine.1.3.jpg
  const fileExtension = shortName[shortName.length - 1];

  // Validate extensions
  const validExtensions = ["png", "jpg", "jpeg", "gif"];
  if (!validExtensions.includes(fileExtension)) {
    return res.status(400).json({
      ok: false,
      msg: "Not an allowed extension",
    });
  }

  // Generate file name
  const fileName = `${uuidv4()}.${fileExtension}`;

  // Path to save image
  const path = `../uploads/${type}/${fileName}`;

  // Move image
  file.mv(path, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        ok: false,
        msg: "Error when moving the image",
      });
    }

    // update database
    updateImage(type, id, fileName);

    res.json({
      ok: true,
      msg: "File uploaded",
      fileName,
    });
  });
};

const getImagen = (req, res = response) => {
  const type = req.params.type;
  const image = req.params.image;

  const pathImg = path.join(__dirname, `../uploads/${type}/${image}`);

  // imagen por defecto
  if (fs.existsSync(pathImg)) {
    res.sendFile(pathImg);
  } else {
    const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
    res.sendFile(pathImg);
  }
};

module.exports = {
  fileUpload,
  getImagen,
};
