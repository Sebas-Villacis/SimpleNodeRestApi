//const models = require('../models');
const {
  allHospitals,
  //   userById,
  newHospital,
hospitalUpdated,
  hospitalDeleted,
} = require("../services/hospital.service");

const getHospitals = (req, res) => {
  allHospitals(req, res);
};

// const getUserById = (req, res) => {
//   userById(req, res);
// };

const createHospital = (req, res) => {
  newHospital(req, res);
};
const updateHospital = (req, res) => {
  hospitalUpdated(req, res);
};

const deleteHospital = (req, res) => {
  hospitalDeleted(req, res);
};

module.exports = {
  getHospitals,
  //   getUserById,
  createHospital,
updateHospital,
  deleteHospital,
};
