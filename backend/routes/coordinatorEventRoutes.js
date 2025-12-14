const router = require("express").Router();
const { verifyCoordinator } = require("../middleware/authMiddleware");
const { createEvent, getMyEvents } = require("../controllers/coordinatorEventController");

const Event = require("../models/Event");

router.post("/create", verifyCoordinator, createEvent);
router.get("/my-events", verifyCoordinator, getMyEvents);

router.get("/latest", async (req, res) => {
    try {
        const event = await Event.findOne().sort({ createdAt: -1 });

        if (!event) {
            return res.json({
                success: false,
                message: "No events found"
            });
        }

        res.json({
            success: true,
            event
        });

    } catch (err) {
        console.log("LATEST EVENT ERROR =>", err);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
});

module.exports = router;