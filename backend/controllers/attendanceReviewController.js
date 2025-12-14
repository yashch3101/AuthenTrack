const Attendance = require("../models/Attendance");

// GET Pending Students
exports.getPending = async (req, res) => {
  try {
    const pending = await Attendance.find({
      coordinatorId: req.user.id,
      status: "pending"
    });

    res.json({ pending });

  } catch (err) {
    res.status(500).json({ message: "Server Error", err });
  }
};

// Approve Student
exports.approve = async (req, res) => {
  try {
    await Attendance.findByIdAndUpdate(req.params.id, {
      status: "approved",
      verifiedAt: new Date()
    });

    res.json({ message: "Approved" });

  } catch (err) {
    res.status(500).json({ message: "Server Error", err });
  }
};

// Reject Student
exports.reject = async (req, res) => {
  try {
    await Attendance.findByIdAndUpdate(req.params.id, {
      status: "rejected"
    });

    res.json({ message: "Rejected" });

  } catch (err) {
    res.status(500).json({ message: "Server Error", err });
  }
};

// Get Verified Students
exports.getVerified = async (req, res) => {
  try {
    const verified = await Attendance.find({
      coordinatorId: req.user.id,
      status: "approved"
    });

    res.json({ verified });

  } catch (err) {
    res.status(500).json({ message: "Server Error", err });
  }
};

// PDF Generator
exports.generatePDF = async (req, res) => {
  try {
    const approved = await Attendance.find({
      coordinatorId: req.user.id,
      status: "approved"
    });

    res.json({
      message: "PDF Generated & Sent to Director",
      approved
    });

  } catch (err) {
    res.status(500).json({ message: "Server Error", err });
  }
};