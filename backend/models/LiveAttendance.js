const mongoose = require("mongoose");

const LiveAttendanceSchema = new mongoose.Schema({
  coordinatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Coordinator",
    required: true,
  },

  name: String,
  course: String,
  lecture: String,

  image: String, // live captured photo
  score: { type: Number, default: 0 }, // match %
  faceMatch: { type: Boolean, default: false },

  location: { type: String, default: "Mismatch" }, // "Match" / "Mismatch"

  status: { type: String, default: "Review" }, // "Review", "Inside"

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("LiveAttendance", LiveAttendanceSchema);