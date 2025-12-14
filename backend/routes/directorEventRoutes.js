const router = require("express").Router();
const { verifyDirector } = require("../middleware/verifyDirector");
const { getLatestEvent, getEventById } = require("../controllers/directorEventController");

router.get("/latest-event", verifyDirector, getLatestEvent);
router.get("/:eventId", verifyDirector, getEventById);

module.exports = router;