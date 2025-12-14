const Event = require("../models/Event");

// Get latest created event
exports.getLatestEvent = async (req, res) => {
    try {
        const event = await Event.findOne()
        .sort({ createdAt: -1 })
        .populate("createdBy", "fullName email");

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
        console.log("LATEST EVENT ERROR →", err);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

// Get single event
exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.eventId)
        .populate("createdBy", "fullName email");

        if (!event) {
            return res.json({
                success: false,
                message: "Event not found"
            });
        }

        res.json({
            success: true,
            event
        });

    } catch (err) {
        console.log("EVENT FETCH ERROR →", err);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};