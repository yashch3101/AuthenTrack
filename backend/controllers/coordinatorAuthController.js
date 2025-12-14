const Coordinator = require("../models/Coordinator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require("../config/cloudinary");

exports.register = async (req, res) => {
  try {
    const { fullName, email, department, employeeId, password } = req.body;

    const existing = await Coordinator.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    let idProofUrl = null;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "coordinator_id_proofs"
      });
      idProofUrl = result.secure_url;
    }

    const hashed = await bcrypt.hash(password, 10);

    await Coordinator.create({
      fullName,
      email,
      department,
      employeeId,
      idProofUrl,
      password: hashed
    });

    res.json({ message: "Coordinator Registered Successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Coordinator.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid Email" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Incorrect Password" });

    const token = jwt.sign(
      { id: user._id, role: "coordinator" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login Successful",
      token,
      coordinator: {
        fullName: user.fullName,
        email: user.email,
        department: user.department,
        employeeId: user.employeeId,
        idProofUrl: user.idProofUrl
      }
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};