const PDFDocument = require("pdfkit");
const fs = require("fs");
const Approved = require("../models/Approved");

exports.generatePDF = async (req, res) => {
  const { eventId } = req.body;

  const approved = await Approved.find({ eventId });

  const doc = new PDFDocument();
  const path = `./pdf/${eventId}.pdf`;
  doc.pipe(fs.createWriteStream(path));

  doc.text("Verified Attendance List", { align: "center" });
  doc.moveDown();

  approved.forEach((s) => {
    doc.text(`${s.name} | ${s.email} | Score: ${s.matchScore}`);
    doc.moveDown();
  });

  doc.end();
  res.json({ success: true, pdfURL: path });
};