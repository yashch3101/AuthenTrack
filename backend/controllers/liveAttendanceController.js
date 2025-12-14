const LiveAttendance = require("../models/LiveAttendance");

exports.getLiveAttendance = async (req, res) => {
  try {
    const students = await LiveAttendance.find({
      coordinatorId: req.user.id,
    }).sort({ createdAt: -1 });

    res.json({ students });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.markReviewed = async (req, res) => {
  try {
    const updated = await LiveAttendance.findByIdAndUpdate(
      req.params.id,
      {
        status: "Inside",
        location: "Match",
        faceMatch: true,
      },
      { new: true }
    );

    res.json({ success: true, student: updated });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.exportClassList = async (req, res) => {
  try {
    const students = await LiveAttendance.find({
      coordinatorId: req.user.id,
      status: "Inside",
    });

    res.json({
      success: true,
      students,
      message: "Class list is ready (Frontend will download PDF).",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.addLiveEntry = async (req, res) => {
  try {
    const student = await LiveAttendance.create({
      coordinatorId: req.user.id,
      name: req.body.name,
      course: req.body.course,
      lecture: req.body.lecture,
      image: "https://i.pravatar.cc/150?img=56",
      score: Math.floor(Math.random() * 40) + 60,
      faceMatch: Math.random() > 0.3,
      location: Math.random() > 0.5 ? "Match" : "Mismatch",
      status: "Review",
    });

    res.json({ success: true, student });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};