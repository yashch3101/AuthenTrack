const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

// routes
app.use("/api/student", require("./routes/studentAuth.routes"));
app.use("/api/student", require("./routes/student.routes"));

app.use("/api/coordinator", require("./routes/coordinatorAuth.routes"));
app.use("/api/coordinator", require("./routes/coordinator.routes"));

app.use("/api/director", require("./routes/director.routes"));

app.listen(5000, () => console.log("Server running on 5000"));