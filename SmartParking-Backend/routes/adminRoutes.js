// backend/routes/admin.js
const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking"); // your Sequelize model

// GET /api/admin/dashboard
router.get("/dashboard", async (req, res) => {
  try {
    const bookings = await Booking.findAll(); // fetch all bookings

    const totalBookings = bookings.length;
    const totalRevenue = bookings.reduce((sum, b) => sum + (b.amount || 0), 0);
    const totalUsers = new Set(bookings.map(b => b.username)).size;

    res.json({
      totalBookings,
      totalRevenue,
      totalUsers,
      bookings,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;