const router = require("express").Router();
const { registerStudent, loginStudent } = require("../controllers/studentAuthController");

router.post("/signup", registerStudent);
router.post("/login", loginStudent);

module.exports = router;