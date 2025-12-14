const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const { verifyDirector } = require("../middleware/verifyDirector");
const { getDashboardData } = require("../controllers/directorDashboardController");
const { finalApprove } = require("../controllers/directorFinalController");

router.get("/dashboard", verifyDirector, getDashboardData);
router.post("/final-approve", verifyDirector, finalApprove);

module.exports = router;