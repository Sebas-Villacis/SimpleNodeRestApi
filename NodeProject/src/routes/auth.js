const { Router } = require("express");
const { validateLogin } = require("../middlewares/validations");
const router = Router();

const { login } = require("../controllers/auth");
router.post("/login", validateLogin, login);

module.exports = router;
