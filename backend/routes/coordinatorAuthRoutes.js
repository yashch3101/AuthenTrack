const router = require("express").Router();
const upload = require("../middleware/uploadCoordinator");
const { register, login } = require("../controllers/coordinatorAuthController");

router.post("/register", upload.single("idProof"), register);
router.post("/login", login);

module.exports = router;