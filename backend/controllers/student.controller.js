const Student = require("../models/Student");
const Registration = require("../models/Registration");
const Attendance = require("../models/Attendance");
const cloudinary = require("../utils/cloudinary");
const mongoose = require("mongoose");

exports.registerForEvent = async (req, res) => {
  const { studentId, eventId } = req.body;

  const result = await cloudinary.uploader.upload(req.file.path);

  await Registration.create({
    studentId,
    eventId,
    photoURL: result.secure_url,
    faceEmbedding: [],
  });

  res.json({ success: true });
};

exports.submitAttendance = async (req, res) => {
  try {
    const {
      studentId,
      eventId,
      name,
      email,
      matchScore,
      locationMatch
    } = req.body;

    let subjects = [];
    if (req.body.subjects) {
      try {
        subjects = JSON.parse(req.body.subjects);
      } catch (e) {
        subjects = [];
      }
    }

    if (!req.file) {
      return res.status(400).json({ message: "Live photo is required" });
    }

    const upload = await cloudinary.uploader.upload(req.file.path);

    const entry = await Attendance.create({
      studentId: new mongoose.Types.ObjectId(studentId),
      eventId: new mongoose.Types.ObjectId(eventId),
      name,
      email,
      matchScore: Number(matchScore),
      locationMatch: locationMatch === "true" || locationMatch === true,
      subjects,
      livePhotoURL: upload.secure_url,
      status: "pending"
    });

    res.json({
      success: true,
      entry
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};