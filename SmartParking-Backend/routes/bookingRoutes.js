const express = require("express");
const router = express.Router();
const { Pool } = require("pg");

// 🔹 PostgreSQL connection
const pool = new Pool({
  user: "OnlineParkingSystem",        // replace with your DB username
  host: "localhost",
  database: "OnlineParkingSystem",    // replace with your DB name
  password: "root",   // replace with your DB password
  port: 5432,
});

router.post("/create", async (req, res) => {
  console.log("Received booking:", req.body); // 🔹 check incoming data

  const { username, nic, vehicleType, vehicleModel, vehicleNumber, province, district, parkingSpot } = req.body;

  if (!username || !nic || !vehicleNumber || !province || !district || !parkingSpot) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO bookings
       (username, nic, vehicle_type, vehicle_model, vehicle_number, province, district, parking_spot)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
       RETURNING *`,
      [username, nic, vehicleType, vehicleModel, vehicleNumber, province, district, parkingSpot]
    );

    console.log("Booking saved:", result.rows[0]); // 🔹 confirm insert
    res.json({ success: true, booking: result.rows[0] });
  } catch (err) {
    console.error("Database insert error:", err.message); // 🔥 log exact error
    res.status(500).json({ message: err.message });
  }
});

// 🔹 GET /api/bookings
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM bookings ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("Database fetch error:", err.message);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
});

module.exports = router;