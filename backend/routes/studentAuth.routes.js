const router = require("express").Router();
const { registerStudent, loginStudent } = require("../controllers/studentAuth.controller");

router.post("/register", registerStudent);
router.post("/login", loginStudent);

module.exports = router;