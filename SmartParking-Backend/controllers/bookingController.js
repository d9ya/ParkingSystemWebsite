const Booking = require("../models/Booking");

// Create booking
const createBooking = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json({ success: true, booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get available spots (example)
const getAvailableSpots = async (req, res) => {
  // Example static spots
  const spots = [
    { id: 1, name: "A1", available: 3 },
    { id: 2, name: "A2", available: 0 },
    { id: 3, name: "B1", available: 2 },
    { id: 4, name: "C1", available: 1 },
  ];
  res.json(spots);
};

module.exports = { createBooking, getAvailableSpots };