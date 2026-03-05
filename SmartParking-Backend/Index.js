const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { connectDB } = require("./database/database");
const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const parkingRoutes = require("./routes/parkingRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

// All auth routes under /api/auth
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);

app.use("/api/parking", parkingRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/admin", adminRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));