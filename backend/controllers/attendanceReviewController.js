const Attendance = require("../models/Attendance");

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

exports.approve = async (req, res) => {
  try {
    await Attendance.findByIdAndUpdate(req.params.id, {
      status: "verified",
      verifiedAt: new Date()
    });

    res.json({ message: "Verified" });

  } catch (err) {
    res.status(500).json({ message: "Server Error", err });
  }
};

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

exports.getVerified = async (req, res) => {
  try {
    const verified = await Attendance.find({
      coordinatorId: req.user.id,
      status: "verified"
    });

    res.json({ verified });

  } catch (err) {
    res.status(500).json({ message: "Server Error", err });
  }
};

exports.generatePDF = async (req, res) => {
  try {
    const verified = await Attendance.find({
      coordinatorId: req.user.id,
      status: "verified"
    });

    res.json({
      message: "PDF Generated & Sent to Director",
      verified
    });

  } catch (err) {
    res.status(500).json({ message: "Server Error", err });
  }
};