const { Router } = require("express");
const { validateUser } = require("../middlewares/validations");
//const { validateJWT } = require("../middlewares/validate-jwt");
const { authenticationRequired } = require("./middlewares/okta-auth");
const router = Router();

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/index.controller");

/*
secure api endpoint with jwt
router.get("/users", validateJWT, getUsers);
router.get("/users/:id", [validateJWT], getUserById);
router.put("/users/:id", [validateJWT, validateUser], updateUser);
router.delete("/users/:id", [validateJWT], deleteUser);
*/
router.get("/users", [authenticationRequired], getUsers);
router.post("/users", [authenticationRequired, validateUser], createUser);
router.get("/users/:id", [authenticationRequired], getUserById);
router.put("/users/:id", [authenticationRequired, validateUser], updateUser);
router.delete("/users/:id", [authenticationRequired], deleteUser);

module.exports = router;
