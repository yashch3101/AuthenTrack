const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const Event = require("../models/Event");

exports.generatePDF = async (req, res) => {
  try {
    const { message, approvedList, eventId } = req.body;

    if (!eventId) {
      return res.json({ success: false, message: "Event ID missing" });
    }

    if (!approvedList || approvedList.length === 0) {
      return res.json({ success: false, message: "No approved students" });
    }

    const event = await Event.findById(eventId).populate("createdBy");

    if (!event) {
      return res.json({ success: false, message: "Event not found" });
    }

    const createdById = event.createdBy?._id || null;

    const pdfDir = path.join(__dirname, "../public/director_pdfs");

    if (!fs.existsSync(pdfDir)) {
      fs.mkdirSync(pdfDir, { recursive: true });
    }

    const fileName = `Attendance_Report_${Date.now()}.pdf`;
    const filePath = path.join(pdfDir, fileName);

    const doc = new PDFDocument({ margin: 40 });
    const writeStream = fs.createWriteStream(filePath);

    doc.pipe(writeStream);

    // HEADER
    doc.fontSize(22).text("Verified Attendance Report", { align: "center" });
    doc.moveDown();

    // COORDINATOR MESSAGE
    if (message) {
      doc.fontSize(14).text(`Message from Coordinator:\n${message}`);
      doc.moveDown();
    }

    // STUDENT LIST
    doc.fontSize(16).text("Approved Students:", { underline: true });
    doc.moveDown();

    approvedList.forEach((s, i) => {
      doc.fontSize(12).text(
        `${i + 1}. ${s.fullName} | Branch: ${s.branch} | Year: ${s.year} | Q.ID: ${s.qid}`
      );
      doc.moveDown(0.3);
    });

    doc.end();

    writeStream.on("finish", async () => {
      const fileUrl = `http://localhost:5000/director_pdfs/${fileName}`;

      // UPDATE EVENT
      await Event.findByIdAndUpdate(eventId, {
        finalPdfUrl: fileUrl,
        latestPdfName: fileName,
        coordinatorMessage: message || "",
        approvedStudents: approvedList.length,
        verifiedCount: approvedList.length,
        createdBy: createdById, // ✅ FIXED
      });

      return res.json({
        success: true,
        pdfUrl: fileUrl,
        pdfName: fileName,
      });
    });

    // ERROR CATCH WHILE WRITING FILE
    writeStream.on("error", (err) => {
      console.log("PDF Write Error:", err);
      return res
        .status(500)
        .json({ success: false, message: "PDF write error" });
    });
  } catch (err) {
    console.log("PDF Creation Error:", err);
    res
      .status(500)
      .json({ success: false, message: "PDF Error", error: err.message });
  }
};