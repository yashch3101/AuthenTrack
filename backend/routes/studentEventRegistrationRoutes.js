const router = require("express").Router();
const upload = require("../middleware/upload");
const { verifyStudent } = require("../middleware/authMiddleware");
const { registerForEvent, getEventDetails, getLatestEvent  } = require("../controllers/studentEventRegistrationController");

router.post("/register", verifyStudent, upload.single("photo"), registerForEvent);

router.get("/details/:eventId", verifyStudent, getEventDetails);

router.get("/latest", verifyStudent, getLatestEvent);

module.exports = router;