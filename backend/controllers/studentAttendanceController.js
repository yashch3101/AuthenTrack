const Attendance = require("../models/Attendance");
const EventRegistration = require("../models/EventRegistration");
const Event = require("../models/Event");
const cloudinary = require("../config/cloudinary");
const axios = require("axios");
const streamifier = require("streamifier");
const FormData = require("form-data");

// DISTANCE CALCULATOR
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

exports.submitAttendance = async (req, res) => {
  try {
    const { eventId, studentLat, studentLng } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Live photo is required" });
    }

    // Convert coordinates properly
    const lat = parseFloat(studentLat);
    const lng = parseFloat(studentLng);

    if (!lat || !lng) {
      return res.status(400).json({ message: "Student GPS location missing" });
    }

    // FETCH EVENT
    const event = await Event.findById(eventId).populate("createdBy", "fullName");
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (!event.latitude || !event.longitude) {
      return res.status(400).json({
        message: "Event does not have coordinator GPS location stored",
      });
    }

    // FETCH REGISTRATION
    const registration = await EventRegistration.findOne({
      eventId,
      studentId: req.user.id,
    });

    if (!registration) {
      return res.status(400).json({
        message: "Student not registered for this event",
      });
    }

    // CLOUDINARY UPLOAD
    const uploadToCloudinary = () => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "attendance_live_photos" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
      });
    };

    const liveUpload = await uploadToCloudinary();
    const livePhotoUrl = liveUpload.secure_url;

    // ML FACE MATCH API
    const mlForm = new FormData();
    mlForm.append("live_file", req.file.buffer, "live.jpg");

    // Always send empty array if embedding missing
    mlForm.append("registered_embedding", JSON.stringify(registration.faceEmbedding));

    const mlResponse = await axios.post(
      "http://localhost:8000/verify",
      mlForm,
      { headers: mlForm.getHeaders() }
    );

    const { match, score_percent, distance } = mlResponse.data;

    // CALCULATE DISTANCE
    const dist = calculateDistance(
      parseFloat(event.latitude),
      parseFloat(event.longitude),
      lat,
      lng
    );

    const locationMatched = dist <= 15;

    // SAVE ATTENDANCE
    const attendance = await Attendance.create({
      studentId: req.user.id,
      eventId,
      coordinatorId: event.createdBy,
      livePhotoUrl,
      registeredPhotoUrl: registration.photoUrl,

      faceMatched: match,
      matchScore: score_percent,
      distance: distance,

      studentLat: lat,
      studentLng: lng,
      coordinatorLat: event.latitude,
      coordinatorLng: event.longitude,
      locationMatched,
      distanceMeters: dist,

      fullName: registration.fullName,
      email: registration.email,
      course: registration.course,
      branch: registration.branch,
      year: registration.year,
      qid: registration.qid,

      embedding: registration.faceEmbedding,

      // status: match && locationMatched ? "verified" : "pending",
      // verifiedAt: match && locationMatched ? new Date() : null,

      status: "pending",
      verifiedAt: null,
    });

    return res.json({
      message: "Attendance Submitted Successfully",
      attendance,
    });

  } catch (error) {
    console.log("ATTENDANCE ERROR:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

// FETCH REGISTRATION DETAILS FOR STUDENT
exports.getRegistrationDetails = async (req, res) => {
  try {
    const { eventId } = req.query;

    const registration = await EventRegistration.findOne({
      eventId,
      studentId: req.user.id,
    });

    if (!registration) {
      return res.status(404).json({ message: "Registration not found" });
    }

    return res.json({
      message: "Student Registration Found",
      photoUrl: registration.photoUrl,
      fullName: registration.fullName,
      email: registration.email,
      course: registration.course,
      branch: registration.branch,
      year: registration.year,
      qid: registration.qid,
      embedding: registration.faceEmbedding
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error", err });
  }
};