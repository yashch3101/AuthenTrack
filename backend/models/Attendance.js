const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },

    coordinatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Coordinator",
    required: true,
  },

    // Photos
    livePhotoUrl: { type: String, required: true },
    registeredPhotoUrl: { type: String },

    // Face Recognition
    faceMatched: { type: Boolean, default: false },
    matchScore: { type: Number, default: 0 },
    distance: { type: Number, default: 999 },

    // Location GPS
    studentLat: Number,
    studentLng: Number,

    coordinatorLat: Number,
    coordinatorLng: Number,

    locationMatched: { type: Boolean, default: false },
    distanceMeters: { type: Number, default: 0 },

    // Student Details
    fullName: String,
    email: String,
    course: String,
    branch: String,
    year: String,
    qid: String,

    // Attendance Status
    status: {
      type: String,
      enum: ["pending", "verified", "rejected"],
      default: "pending",
    },

    verifiedAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Attendance", attendanceSchema);