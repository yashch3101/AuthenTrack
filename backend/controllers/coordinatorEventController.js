const Event = require("../models/Event");

exports.createEvent = async (req, res) => {
  try {
    const { 
      eventName, 
      eventDate, 
      eventVenue, 
      description,
      latitude,
      longitude
    } = req.body;

    // VALIDATION
    if (!eventName || !eventDate || !eventVenue || !latitude || !longitude) {
      return res.status(400).json({ message: "All fields including location are required" });
    }

    const newEvent = await Event.create({
      eventName,
      eventDate,
      eventVenue,
      description,
      latitude,
      longitude,
      createdBy: req.user.id,
      status: "pending_director"
    });

    res.json({
      message: "Event Created Successfully ✔",
      event: newEvent
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", error });
  }
};

exports.getMyEvents = async (req, res) => {
  try {
    const events = await Event.find({ createdBy: req.user.id });
    res.json({ events });

  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};