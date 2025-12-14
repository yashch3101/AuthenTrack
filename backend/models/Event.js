const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  eventDate: { type: String, required: true },
  eventVenue: { type: String, required: true },

  // ⭐ ADD EVENT LOCATION
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },

  // Coordinator who created the event
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Coordinator",
    required: true 
  },

  // Event Description
  description: { type: String },

  finalPdfUrl: { type: String, default: "" },

  latestPdfName: { type: String, default: "" },
  finalPdfName: { type: String, default: "" }, 

  coordinatorMessage: { type: String, default: "" },

  directorSignature: { type: String, default: "" },

  approvedStudents: { type: Number, default: 0 },
  verifiedCount: { type: Number, default: 0 },

}, { timestamps: true });

module.exports = mongoose.model("Event", eventSchema);