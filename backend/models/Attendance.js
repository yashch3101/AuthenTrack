const mongoose = require("mongoose");

const attSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true
  },

  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true
  },

  name: String,
  email: String,
  course: String,
  branch: String,
  year: String,
  qid: String,
  lectureTime: String,

  subjects: [String],

  livePhotoURL: String,
  faceVerified: Boolean,
  matchScore: Number,
  locationMatch: Boolean,

  studentLocation: {
    lat: Number,
    lon: Number,
  },

  status: {
    type: String,
    default: "pending"
  }
});

module.exports = mongoose.model("Attendance", attSchema);