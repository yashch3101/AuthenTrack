const mongoose = require("mongoose");

const approvedSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true
  },
  attendanceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Attendance",
    required: true
  },
  name: String,
  email: String,
  phone: String,
  matchScore: Number,
  locationMatch: Boolean,
  subjects: [String]
},
{ timestamps: true }
);

module.exports = mongoose.model("Approved", approvedSchema);