const Student = require("../models/Student");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Signup Controller for students
exports.registerStudent = async (req, res) => {
  try {
    const { fullName, email, mobile, password, confirmPassword } = req.body;

    if (!fullName || !email || !mobile || !password || !confirmPassword)
      return res.status(400).json({ message: "All fields required" });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords do not match" });

    const exists = await Student.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const student = await Student.create({
      fullName,
      email,
      mobile,
      password: hashed,
    });

    res.status(201).json({
      message: "Student Registered Successfully ✔",
      studentId: student._id,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};


// Login controller for students
exports.loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await Student.findOne({ email });
    if (!student) return res.status(400).json({ message: "Invalid Email" });

    const checkPass = await bcrypt.compare(password, student.password);
    if (!checkPass) return res.status(400).json({ message: "Invalid Password" });

    const token = jwt.sign(
      { id: student._id, role: "student" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login Successful ✔",
      token,
      student,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};