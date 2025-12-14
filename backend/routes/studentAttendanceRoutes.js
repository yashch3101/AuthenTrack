const router = require("express").Router();
const upload = require("../middleware/liveUpload");
const { verifyStudent } = require("../middleware/authMiddleware");
const { submitAttendance, getRegistrationDetails } = require("../controllers/studentAttendanceController");

router.post("/submit", verifyStudent, upload.single("livePhoto"), submitAttendance);

router.get("/registration-details", verifyStudent, getRegistrationDetails);

module.exports = router;