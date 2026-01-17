const EventRegistration = require("../models/EventRegistration");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");
const Event = require("../models/Event");
const axios = require("axios");
const FormData = require("form-data");

exports.registerForEvent = async (req, res) => {
  try {
    const { eventId, fullName, email, course, branch, year, qid, phone } = req.body;

    const already = await EventRegistration.findOne({
      studentId: req.user.id,
      eventId
    });

    if (already) {
      return res.status(400).json({
        message: "You have already registered for this event."
      });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Photo is required" });
    }

    const uploadToCloudinary = () => {
      return new Promise((resolve, reject) => {
        let uploadStream = cloudinary.uploader.upload_stream(
          { folder: "student_registration_photos" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
      });
    };

    const uploadedImage = await uploadToCloudinary();

    const mlForm = new FormData();
    mlForm.append("file", req.file.buffer, "photo.jpg");
    mlForm.append("user_id", req.user.id.toString());

    const mlRes = await axios.post(
      "http://localhost:8000/embedding/register",
      mlForm,
      { headers: mlForm.getHeaders() }
    );

    const embedding = mlRes.data.embedding || [];

    const newRegistration = await EventRegistration.create({
      studentId: req.user.id,
      eventId,
      fullName,
      email,
      course,
      branch,
      year,
      qid,
      phone,
      photoUrl: uploadedImage.secure_url,
      faceEmbedding: embedding
    });

    return res.json({
      message: "Event Registration Successful ✔",
      registration: newRegistration,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error, message: "Server Error" });
  }
};

exports.getEventDetails = async (req, res) => {
  try {
    const { eventId } = req.params;

    const event = await Event.findById(eventId).populate("createdBy", "fullName email");

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    return res.json({
      event: {
        id: event._id,
        title: event.eventName,
        date: event.eventDate,
        venue: event.eventVenue,
        description: event.description,
        coordinatorName: event.createdBy?.fullName || "Coordinator",
        status: event.status,
      }
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error", error });
  }
};


exports.getLatestEvent = async (req, res) => {
  try {
    const event = await Event.findOne()
      .sort({ createdAt: -1 })
      .populate("createdBy", "fullName email");

    if (!event) {
      return res.status(404).json({ message: "No active events available" });
    }

    return res.json({
      event: {
        _id: event._id,
        eventName: event.eventName,
        eventDate: event.eventDate,
        eventVenue: event.eventVenue,
        coordinatorName: event.createdBy?.fullName || "Coordinator",
        description: event.description,
        status: event.status,
      }
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error", error });
  }
};
