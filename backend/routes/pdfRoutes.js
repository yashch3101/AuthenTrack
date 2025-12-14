const router = require("express").Router();
const { verifyCoordinator } = require("../middleware/authMiddleware");
const { generatePDF } = require("../controllers/pdfController");

router.post("/generate", verifyCoordinator, generatePDF);

module.exports = router;