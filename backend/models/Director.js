const mongoose = require("mongoose");

const directorSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "academic_head" },
  
  secretCode: { type: String, required: true },

  signatureUrl: { type: String, default: "" },
  signaturePublicId: { type: String, default: "" },

}, { timestamps: true });

module.exports = mongoose.model("Director", directorSchema);