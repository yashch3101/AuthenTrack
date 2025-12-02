const router = require("express").Router();
const { protect, allowRoles } = require("../middleware/auth");
const { approveStudent, rejectStudent, createEvent, getPendingRequests } = require("../controllers/coordinator.controller");

router.post("/create-event", protect, allowRoles("coordinator"), createEvent);
router.get("/pending", protect, allowRoles("coordinator"), getPendingRequests);
router.post("/approve", protect, allowRoles("coordinator"), approveStudent);
router.post("/reject", protect, allowRoles("coordinator"), rejectStudent);

module.exports = router;