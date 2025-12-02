const Attendance = require("../models/Attendance");
const Approved = require("../models/Approved");
const Event = require("../models/Event");

exports.approveStudent = async (req, res) => {
  const { attendanceId } = req.body;

  const data = await Attendance.findById(attendanceId);

  await Approved.create({
    eventId: data.eventId,
    studentId: data.studentId,
    attendanceId,
    name: data.name,
    email: data.email,
    matchScore: data.matchScore,
    locationMatch: data.locationMatch,
    subjects: data.subjects,
  });

  data.status = "approved";
  await data.save();

  res.json({ success: true });
};

exports.rejectStudent = async (req, res) => {
  await Attendance.findByIdAndDelete(req.body.attendanceId);
  res.json({ success: true });
};

exports.createEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.json({ success: true, event });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPendingRequests = async (req, res) => {
  try {
    const pending = await Attendance.find({ status: "pending" })
      .populate("studentId")
      .populate("eventId");

    return res.json({
      success: true,
      count: pending.length,
      pending
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};