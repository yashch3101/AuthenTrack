const mongoose = require("mongoose");

const coordinatorSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: String,
  department: String,
  employeeId: String,
  idProof: String,
  password: String,
  role: { type: String, default: "coordinator" },
});

module.exports = mongoose.model("Coordinator", coordinatorSchema);