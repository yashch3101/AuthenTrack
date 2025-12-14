const Event = require("../models/Event");
const Attendance = require("../models/Attendance");

exports.getDashboardData = async (req, res) => {
  try {
    const event = await Event.findOne({});

    const approvedCount = await Attendance.countDocuments({ status: "approved" });
    const verifiedCount = await Attendance.countDocuments({});

    res.json({
      event,
      approvedCount,
      verifiedCount,
      coordinatorMessage: event?.directorMessage || "",
      finalPdfUrl: event?.finalPdfUrl || "",
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error", err });
  }
};