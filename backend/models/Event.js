const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  coordinatorId: String,
  eventName: String,
  date: String,
  time: String,
  venue: String,
  location: {
    lat: Number,
    lon: Number,
    radius: Number,
  },
  subjects: [String],
});

module.exports = mongoose.model("Event", eventSchema);