const router = require("express").Router();
const { protect, allowRoles } = require("../middleware/auth");
const { registerForEvent, submitAttendance } = require("../controllers/student.controller");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post("/register-event", protect, allowRoles("student"), upload.single("photo"), registerForEvent);

router.post("/submit-attendance", protect, allowRoles("student"), upload.single("livePhoto"), submitAttendance);

module.exports = router;