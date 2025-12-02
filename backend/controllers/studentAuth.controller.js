const Student = require("../models/Student");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerStudent = async (req, res) => {
  try {
    const { name, email, password, phone, course, branch, year, qid } = req.body;

    let exists = await Student.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "Student already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await Student.create({
      name,
      email,
      password: hashed,
      phone,
      course,
      branch,
      year,
      qid,
    });

    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Student.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: "student" },
      process.env.JWT_SECRET
    );

    res.json({ success: true, token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};