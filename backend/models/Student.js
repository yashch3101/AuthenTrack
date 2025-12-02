const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: String,
  course: String,
  branch: String,
  year: String,
  qid: Number,
  photoURL: String,
  password: String,
  role: { type: String, default: "student" },
});

module.exports = mongoose.model("Student", studentSchema);