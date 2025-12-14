const router = require("express").Router();
const { registerDirector, loginDirector } = require("../controllers/directorAuthController");

router.post("/register", registerDirector);
router.post("/login", loginDirector);

module.exports = router;