const mongoose = require("mongoose");

const regSchema = new mongoose.Schema({
  studentId: String,
  eventId: String,
  photoURL: String,
  faceEmbedding: Array,
});

module.exports = mongoose.model("Registration", regSchema);