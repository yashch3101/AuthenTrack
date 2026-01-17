const fs = require("fs");
const path = require("path");
const { PDFDocument, rgb } = require("pdf-lib");
const Event = require("../models/Event");
const axios = require("axios");

// Convert URL to Uint8Array
async function fetchPDF(url) {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    return response.data;
}

// Base64 → Uint8Array
function base64ToUint8Array(base64) {
    const base64Data = base64.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");
    return new Uint8Array(buffer);
}

exports.finalApprove = async (req, res) => {
    try {
        const { eventId, signatureImage } = req.body;

        if (!eventId) {
            return res.json({ success: false, message: "Event ID missing" });
        }

        if (!signatureImage) {
            return res.json({ success: false, message: "Signature missing" });
        }

        // Fetch event data
        const event = await Event.findById(eventId);

        if (!event) {
            return res.json({ success: false, message: "Event not found" });
        }

        if (!event.finalPdfUrl) {
            return res.json({ success: false, message: "Coordinator PDF missing!" });
        }

        // Load coordinator PDF
        const coordinatorPdfBytes = await fetchPDF(event.finalPdfUrl);
        const pdfDoc = await PDFDocument.load(coordinatorPdfBytes);

        // Convert signature to PNG
        const signatureBytes = base64ToUint8Array(signatureImage);
        const signatureEmbed = await pdfDoc.embedPng(signatureBytes);

        const pages = pdfDoc.getPages();
        const firstPage = pages[0];

        // Signature placement
        const sigWidth = 150;
        const sigHeight = 70;

        firstPage.drawText("Director Signature:", {
            x: 380,
            y: 150,
            size: 14,
            color: rgb(0, 0.2, 0.5),
        });

        firstPage.drawImage(signatureEmbed, {
            x: 380,
            y: 70,
            width: sigWidth,
            height: sigHeight,
        });

        // Save final signed PDF
        const finalPdfBytes = await pdfDoc.save();

        const outputDir = path.join(__dirname, "../public/final_signed_pdfs");
        if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

        const fileName = `Final_Signed_Report_${Date.now()}.pdf`;
        const filePath = path.join(outputDir, fileName);

        fs.writeFileSync(filePath, finalPdfBytes);

        const finalPdfUrl = `https://authentrack-backend.onrender.com/final_signed_pdfs/${fileName}`;

        // Update event
        await Event.findByIdAndUpdate(eventId, {
            directorSignature: signatureImage,      // Save signature base64
            finalPdfUrl: finalPdfUrl,               // Overwrite with signed PDF
            status: "approved",
            approvedAt: new Date(),
        });

        return res.json({
            success: true,
            message: "Final signed PDF generated!",
            finalPdfUrl,
        });

    } catch (err) {
        console.log("FINAL APPROVE ERROR →", err);
        res.status(500).json({ success: false, message: "Server error", err });
    }
};
