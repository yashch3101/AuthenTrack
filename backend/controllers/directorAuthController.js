const Director = require("../models/Director");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerDirector = async (req, res) => {
  try {
    const { fullName, email, phone, password, secretCode } = req.body;

    if (secretCode !== process.env.DIRECTOR_SECRET_CODE) {
      return res.status(401).json({ message: "Invalid secret access code!" });
    }

    const exist = await Director.findOne({ email });
    if (exist) return res.status(400).json({ message: "Email already exists" });

    const hash = await bcrypt.hash(password, 10);

    const newDirector = await Director.create({
      fullName,
      email,
      phone,
      password: hash,
      secretCode,
    });

    res.json({ success: true, message: "Director Registered Successfully", director: newDirector });

  } catch (err) {
    res.status(500).json({ message: "Server Error", err });
  }
};


exports.loginDirector = async (req, res) => {
  try {
    const { email, password, secretCode } = req.body;

    const director = await Director.findOne({ email });
    if (!director) return res.status(400).json({ message: "Invalid email" });

    const passMatch = await bcrypt.compare(password, director.password);
    if (!passMatch) return res.status(400).json({ message: "Invalid password" });

    if (secretCode !== director.secretCode) {
      return res.status(401).json({ message: "Invalid Access Code" });
    }

    const token = jwt.sign(
      { id: director._id, role: "director" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      message: "Login successful",
      token,
      director,
    });

  } catch (err) {
    res.status(500).json({ message: "Server Error", err });
  }
};