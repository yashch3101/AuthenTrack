const Director = require("../models/Director");
const cloudinary = require("cloudinary").v2;

exports.uploadSignature = async (req, res) => {
  try {
    const directorId = req.user.id;
    const { signature } = req.body; // BASE64 string

    if (!signature) {
      return res.json({ success: false, message: "No signature received" });
    }

    const uploaded = await cloudinary.uploader.upload(signature, {
      folder: "smart_attendance/director_signatures",
    });

    const updated = await Director.findByIdAndUpdate(
      directorId,
      {
        signatureUrl: uploaded.secure_url,
        signaturePublicId: uploaded.public_id,
      },
      { new: true }
    );

    res.json({
      success: true,
      url: updated.signatureUrl,
    });

  } catch (err) {
    console.log("SIGNATURE UPLOAD ERROR =>", err);
    res.status(500).json({ success: false, err });
  }
};
