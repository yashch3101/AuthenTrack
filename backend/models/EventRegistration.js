const mongoose = require("mongoose");

const eventRegistrationSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },

  fullName: String,
  email: String,
  course: String,
  branch: String,
  year: String,
  qid: String,
  phone: String,

  photoUrl: String,

  faceEmbedding: { type: Array, default: [] },

  isRegistered: { type: Boolean, default: true },
  
}, { timestamps: true });

module.exports = mongoose.model("EventRegistration", eventRegistrationSchema);