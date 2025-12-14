const mongoose = require("mongoose");

const coordinatorSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  employeeId: { type: String, required: true },
  idProofUrl: { type: String },
  password: { type: String, required: true },
  role: { type: String, default: "coordinator" }
}, { timestamps: true });

module.exports = mongoose.model("Coordinator", coordinatorSchema);