const { Router } = require("express");
const { authenticationRequired } = require("../middlewares/okta-auth");
const { validateHospital } = require("../middlewares/validations");
const router = Router();

const {
  getHospitals,
  updateHospital,
  deleteHospital,
  createHospital,
} = require("../controllers/hospital.controller");

/*
secure api endpoint with jwt
router.get("/users", validateJWT, getUsers);
router.get("/users/:id", [validateJWT], getUserById);
router.put("/users/:id", [validateJWT, validateUser], updateUser);
router.delete("/users/:id", [validateJWT], deleteUser);
*/
router.get("/hospitals", [authenticationRequired], getHospitals);
router.post(
  "/hospitals",
  [authenticationRequired, validateHospital],
  createHospital
);
// router.get("/users/:id", [authenticationRequired], getUserById);
router.put(
  "/hospitals/:id",
  [authenticationRequired, validateHospital],
  updateHospital
);
router.delete("/hospitals/:id", [authenticationRequired], deleteHospital);

module.exports = router;
