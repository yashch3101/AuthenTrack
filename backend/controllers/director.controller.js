const Director = require("../models/Director");
const Attendance = require("../models/Attendance");
const Approved = require("../models/Approved");
const FinalPDF = require("../models/FinalPDF");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require("../utils/cloudinary");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const downloadImage = require("../utils/downloadImage");
const path = require("path");

const createToken = (id) => {
  return jwt.sign({ id, role: "director" }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

exports.registerDirector = async (req, res) => {
  try {
    const { name, email, phone, password, secretCode } = req.body;

    const exists = await Director.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "Director already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const director = await Director.create({
      name,
      email,
      phone,
      password: hashed,
      secretCode,
    });

    res.json({
      success: true,
      director,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.loginDirector = async (req, res) => {
  try {
    const { email, password, secretCode } = req.body;

    const director = await Director.findOne({ email });
    if (!director)
      return res.status(400).json({ message: "Director not found" });

    const match = await bcrypt.compare(password, director.password);
    if (!match) return res.status(400).json({ message: "Invalid password" });

    if (secretCode !== director.secretCode)
      return res.status(400).json({ message: "Invalid Director Access Code" });

    const token = createToken(director._id);

    res.json({
      success: true,
      token,
      director,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getApprovedList = async (req, res) => {
  try {
    const { eventId } = req.query;

    const list = await Approved.find({ eventId })
    .populate("studentId", "name email phone")
    .populate("eventId", "title description date venue");

    res.json({
      success: true,
      list,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.approveStudent = async (req, res) => {
  try {
    const { attendanceId } = req.body;

    const data = await Attendance.findById(attendanceId).populate("studentId");

    if (!data)
      return res.status(404).json({ message: "Attendance not found" });

    await Approved.create({
    eventId: data.eventId._id,
    studentId: data.studentId._id,
    attendanceId: data._id,
    name: data.studentId.name,
    email: data.studentId.email,
    phone: data.studentId.phone,
    matchScore: data.matchScore,
    locationMatch: data.locationMatch,
    subjects: data.subjects
  });

    data.status = "approved";
    await data.save();

    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.generateFinalPDF = async (req, res) => {
  try {
    const { eventId, message } = req.body;
    const signatureFile = req.file;

    // Upload signature
    const uploadSignature = await cloudinary.uploader.upload(signatureFile.path);

    // Fetch approved students with event data
    const approvedList = await Approved.find({ eventId })
      .populate("studentId", "name email phone qid course branch year")
      .populate("eventId", "eventName date time venue");

    if (approvedList.length === 0) {
      return res.status(400).json({ message: "No approved students found" });
    }

    const event = approvedList[0].eventId;

    const pdfPath = `final_${eventId}.pdf`;
    const doc = new PDFDocument({ margin: 50 });
    const stream = fs.createWriteStream(pdfPath);
    doc.pipe(stream);

    // ------------------------------------------------------------------
    // HEADER TITLE
    // ------------------------------------------------------------------
    doc.fontSize(26).fillColor("#000")
       .text("Final Approved Attendance Report", { align: "center" });

    doc.moveDown(1.5);

    // ------------------------------------------------------------------
    // EVENT DETAILS SECTION
    // ------------------------------------------------------------------
    doc.fontSize(16).fillColor("#000").text("Event Details", { underline: true });
    doc.moveDown(0.8);

    doc.fontSize(12).fillColor("#000");
    doc.text(`• Event Name : ${event.eventName}`);
    doc.text(`• Date       : ${event.date}`);
    doc.text(`• Time       : ${event.time}`);
    doc.text(`• Venue      : ${event.venue}`);
    doc.text(`• Message    : ${message}`);
    doc.moveDown(1.5);

 // ------------------------------------------------------------------
    // STUDENT LIST (TABLE)
    // ------------------------------------------------------------------
    doc.fontSize(16).fillColor("#000").text("Approved Students", { underline: true });
    doc.moveDown(0.8);

    // Column Positions
    const columns = {
      name: 50,
      email: 170,
      qid: 310,
      course: 380,
      branch: 460,
      year: 530
    };

    // HEADER
    doc.fontSize(12).fillColor("#000");
    let rowY = doc.y;

    doc.text("Name", columns.name, rowY);
    doc.text("Email", columns.email, rowY);
    doc.text("Q.ID", columns.qid, rowY);
    doc.text("Course", columns.course, rowY);
    doc.text("Branch", columns.branch, rowY);
    doc.text("Year", columns.year, rowY);

    rowY += 20;

    // Header underline
    doc.moveTo(columns.name, rowY - 5)
       .lineTo(580, rowY - 5)
       .stroke();

    doc.fontSize(11).fillColor("#333");

    // ROWS
    approvedList.forEach((item) => {
      const s = item.studentId;

      doc.text(s.name, columns.name, rowY);
      doc.text(s.email, columns.email, rowY);
      doc.text(s.qid, columns.qid, rowY);
      doc.text(s.course, columns.course, rowY);
      doc.text(s.branch, columns.branch, rowY);
      doc.text(String(s.year), columns.year, rowY);

      rowY += 20;

      // Page-break if full
      if (rowY > 700) {
        doc.addPage();
        rowY = 50;

        // Reprint header on new page
        doc.fontSize(12).fillColor("#000");
        doc.text("Name", columns.name, rowY);
        doc.text("Email", columns.email, rowY);
        doc.text("Q.ID", columns.qid, rowY);
        doc.text("Course", columns.course, rowY);
        doc.text("Branch", columns.branch, rowY);
        doc.text("Year", columns.year, rowY);

        rowY += 20;

        doc.moveTo(columns.name, rowY - 5)
           .lineTo(580, rowY - 5)
           .stroke();

        doc.fontSize(11).fillColor("#333");
      }
    });

    // ------------------------------------------------------------------
    // SIGNATURE PAGE
    // ------------------------------------------------------------------
    doc.addPage();
    doc.fontSize(20).fillColor("#000").text("Director Signature", { align: "center", underline: true });
    doc.moveDown(2);

    const localSig = await downloadImage(uploadSignature.secure_url);
    doc.image(localSig, {
      width: 180,
      align: "center",
      valign: "center"
    });

    doc.moveDown(1);
    doc.fontSize(12).text("(Signature)", { align: "center" });

    doc.end();

    await new Promise(resolve => stream.on("finish", resolve));

    // Upload PDF
    const pdfUpload = await cloudinary.uploader.upload(pdfPath, {
      resource_type: "raw",
    });

    const saved = await FinalPDF.create({
      eventId,
      pdfURL: pdfUpload.secure_url,
      message,
    });

    res.json({ success: true, saved });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getFinalPDF = async (req, res) => {
  try {
    const { eventId } = req.query;

    const result = await FinalPDF.findOne({ eventId });

    res.json({
      success: true,
      result,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};