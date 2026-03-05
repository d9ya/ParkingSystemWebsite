// controllers/paymentController.js
const Payment = require("../models/Payment");
const Booking = require("../models/Booking");

const createPayment = async (req, res) => {
  try {
    let { booking_id, payment_method, amount } = req.body;

    console.log("Incoming booking_id:", booking_id);

    // Validate input
    if (!booking_id || !payment_method) {
      return res
        .status(400)
        .json({ message: "Booking ID and payment method required" });
    }

    // Convert booking_id to number to avoid type issues
    booking_id = Number(booking_id);
    console.log(
      "Checking booking with ID:",
      booking_id,
      "type:",
      typeof booking_id
    );

    // Make sure booking exists
    const bookingExists = await Booking.findByPk(booking_id);
    console.log("Booking found:", bookingExists);

    if (!bookingExists) {
      return res.status(400).json({ message: "Booking ID does not exist" });
    }

    // Create payment
    const payment = await Payment.create({
      booking_id,
      payment_method,
      amount: amount || 100,
    });

    console.log("Payment successfully created:", payment);
    return res.status(201).json(payment);
  } catch (err) {
    console.error("Payment creation failed:", err);
    return res
      .status(500)
      .json({ message: "Payment creation failed", error: err.message });
  }
};

module.exports = { createPayment };