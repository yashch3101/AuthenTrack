const router = require("express").Router();
const { verifyCoordinator } = require("../middleware/authMiddleware");
const { 
  getPending, 
  approve, 
  reject, 
  getVerified, 
  generatePDF 
} = require("../controllers/attendanceReviewController");

router.get("/pending", verifyCoordinator, getPending);
router.put("/approve/:id", verifyCoordinator, approve);
router.put("/reject/:id", verifyCoordinator, reject);
router.get("/verified", verifyCoordinator, getVerified);
router.post("/generate-pdf", verifyCoordinator, generatePDF);

module.exports = router;
