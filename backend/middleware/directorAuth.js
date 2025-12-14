const jwt = require("jsonwebtoken");
const Director = require("../models/Director");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await Director.findById(decoded.id).select("-password");
    if (!user)
      return res.status(404).json({ success: false, message: "Director not found" });

    req.director = user;
    next();
  } catch (err) {
    console.log("DIRECTOR AUTH ERROR →", err);
    res.status(500).json({ success: false, message: "Auth failed" });
  }
};