const router = require("express").Router();
const { registerCoordinator, loginCoordinator } = require("../controllers/coordinatorAuth.controller");

router.post("/register", registerCoordinator);
router.post("/login", loginCoordinator);

module.exports = router;