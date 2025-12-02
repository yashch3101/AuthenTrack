const mongoose = require("mongoose");

const pdfSchema = new mongoose.Schema({
  eventId: String,
  pdfURL: String,
  approvedAt: Date,
  signedBy: String,
});

module.exports = mongoose.model("FinalPDF", pdfSchema);