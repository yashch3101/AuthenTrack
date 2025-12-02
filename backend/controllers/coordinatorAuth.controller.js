const Coordinator = require("../models/Coordinator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerCoordinator = async (req, res) => {
  try {
    const { name, email, password, phone, department, employeeId } = req.body;

    const exists = await Coordinator.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Coordinator already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await Coordinator.create({
      name,
      email,
      password: hashed,
      phone,
      department,
      employeeId,
      role: "coordinator"
    });

    res.json({ success: true, user });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.loginCoordinator = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Coordinator.findOne({ email });
    if (!user) return res.status(404).json({ message: "Coordinator not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign(
      { id: user._id, role: "coordinator" },
      process.env.JWT_SECRET
    );

    res.json({ success: true, token, user });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};