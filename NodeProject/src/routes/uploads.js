const { Router } = require("express");
const expressFileUpload = require("express-fileupload");
const { authenticationRequired } = require("../middlewares/okta-auth");
const { getImagen, fileUpload } = require("../controllers/uploads");

const router = Router();
router.use(expressFileUpload());
router.put("/upload/:type/:image", authenticationRequired, fileUpload);
router.get("/upload/:type/:image", getImagen);

module.exports = router;
