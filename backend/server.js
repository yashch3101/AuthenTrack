const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

connectDB();

app.use("/pdf", express.static("generated_pdfs"));
app.use("/final_signed_pdfs", express.static("public/final_signed_pdfs"));

// Student Routes
app.use("/api/student/auth", require("./routes/studentAuthRoutes"));
app.use("/api/student/event", require("./routes/studentEventRegistrationRoutes"));
app.use("/api/student/attendance", require("./routes/studentAttendanceRoutes"));


// Coordinator Routes
app.use("/api/coordinator/auth", require("./routes/coordinatorAuthRoutes"));
app.use("/api/coordinator/event", require("./routes/coordinatorEventRoutes"));
app.use("/api/coordinator/review", require("./routes/attendanceReviewRoutes"));
app.use("/api/coordinator/attendance", require("./routes/liveAttendanceRoutes"));
app.use("/api/coordinator/pdf", require("./routes/pdfRoutes"));

// DIRECTOR Routes
app.use("/api/director/auth", require("./routes/directorAuthRoutes"));
app.use("/api/director/approval", require("./routes/directorApprovalRoutes"));
app.use("/api/director", require("./routes/directorProfileRoutes"));
app.use("/api/director/event", require("./routes/directorEventRoutes"));

app.use("/director_pdfs", express.static("public/director_pdfs"));

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running on port 5000 🚀");
});