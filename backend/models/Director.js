const mongoose = require("mongoose");

const directorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  secretCode: { type: String, required: true },
  role: { type: String, default: "director" }
});

module.exports = mongoose.model("Director", directorSchema);