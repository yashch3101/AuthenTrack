const router = require("express").Router();
const { registerDirector, loginDirector, getApprovedList, generateFinalPDF, getFinalPDF } = require("../controllers/director.controller");
const { protect, allowRoles } = require("../middleware/auth");
const upload = require("../middleware/multer");

router.post("/register", registerDirector);
router.post("/login", loginDirector);

router.get(
  "/approved-list",
  protect,
  allowRoles("director"),
  getApprovedList
);

router.post(
  "/generate-pdf",
  protect,
  allowRoles("director"),
  upload.single("signature"),
  generateFinalPDF
);

router.get(
  "/final-pdf",
  protect,
  allowRoles("director"),
  getFinalPDF
);

module.exports = router;