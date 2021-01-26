const models = require("../models");
const fs = require("fs");

const deleteImage = (path) => {
  if (fs.existsSync(path)) {
    // deletes previous image
    fs.unlinkSync(path);
  }
};

const updateImage = async (type, id, fileName) => {
  let oldPath = "";

  switch (type) {
    case "hospitals":
      const hospital = await models.hospitals.findByPk(id);
      if (!hospital) {
        console.log("No hospital found by id");
        return false;
      }

      oldPath = `../uploads/hospitals/${hospital.img}`;
      deleteImage(oldPath);

      hospital.img = fileName;
      await hospital.save();
      return true;

      break;
  }
};

module.exports = {
  updateImage,
};
