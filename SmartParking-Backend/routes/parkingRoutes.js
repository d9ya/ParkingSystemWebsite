const express = require("express");
const router = express.Router();

// Example parking data
const parkingSlots = [
  { id: 1, name: "A1", available: true },
  { id: 2, name: "A2", available: false },
  { id: 3, name: "B1", available: true },
];

// GET /api/parking/available
router.get("/available", (req, res) => {
  const availableSlots = parkingSlots.filter(slot => slot.available);
  res.json(availableSlots);
});

module.exports = router;