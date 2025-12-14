const router = require("express").Router();
const { verifyCoordinator } = require("../middleware/authMiddleware");

const {
  getLiveAttendance,
  markReviewed,
  exportClassList,
  addLiveEntry,
} = require("../controllers/liveAttendanceController");

router.get("/live", verifyCoordinator, getLiveAttendance);
router.put("/review/:id", verifyCoordinator, markReviewed);
router.get("/export", verifyCoordinator, exportClassList);
router.post("/new", verifyCoordinator, addLiveEntry);

module.exports = router;