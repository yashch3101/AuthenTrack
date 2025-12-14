const router = require("express").Router();
const { verifyDirector } = require("../middleware/verifyDirector");
const Director = require("../models/Director");

router.get("/me", verifyDirector, async (req, res) => {
  try {
    const director = await Director.findById(req.user.id).select("-password");
    if (!director)
      return res.status(404).json({ success: false, message: "Director not found" });

    res.json({ success: true, director });
  } catch (err) {
    console.log("ME ERROR", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
