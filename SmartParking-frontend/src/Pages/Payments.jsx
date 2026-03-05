import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
 const booking = location.state?.booking; 
 console.log("Booking inside PaymentPage:", booking);// Grab booking from previous page
  const [paymentMethod, setPaymentMethod] = useState("");

  // Safety check: if booking or booking.id is missing
  if (!booking?.id) {
    return (
      <div style={{ padding: "50px", textAlign: "center" }}>
        <h2>Error: Booking not found!</h2>
        <p>Please go back and make a booking first.</p>
      </div>
    );
  }

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }

    try {
      // Send only what backend expects
      const res = await fetch("http://localhost:5000/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          booking_id: Number(booking.id),
          payment_method: paymentMethod,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Payment failed");

      alert("Payment Successful 💳✅");
      navigate("/userdashboard");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="payment-page">
      {/* LEFT PANEL */}
      <div className="payment-left">
        <h1>Checkout</h1>

        <div className="summary-card">
          <h3>Parking Summary</h3>

          <div className="row">
            <span>Parking Spot</span>
            <span>{booking.parkingSpot}</span>
          </div>

          <div className="row">
            <span>Parking Fee</span>
            <span>RS.100</span>
          </div>

          <div className="row">
            <span>Duration</span>
            <span>1 Hour</span>
          </div>

          <div className="row total">
            <span>Total</span>
            <span>Rs. 100</span>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="payment-right">
        <h2>Payment Method</h2>

        <form onSubmit={handlePayment}>
          <label className="method">
            <input
              type="radio"
              value="card"
              checked={paymentMethod === "card"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Debit / Credit Card
          </label>

          <label className="method">
            <input
              type="radio"
              value="esewa"
              checked={paymentMethod === "esewa"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            eSewa
          </label>

          <label className="method">
            <input
              type="radio"
              value="khalti"
              checked={paymentMethod === "khalti"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Khalti
          </label>

          <button className="pay-btn">Confirm & Pay</button>
        </form>
      </div>

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: Helvetica, Arial, sans-serif; overflow-x: hidden; }
        .payment-page { min-height: 100vh; width: 100vw; display: grid; grid-template-columns: 1fr 1fr; background: #354f92; }
        .payment-left, .payment-right { padding: 80px; }
        .payment-left { background: #ffffff; border-right: 1px solid #4f70b3; }
        .payment-left h1 { font-size: 38px; font-weight: 800; margin-bottom: 40px; }
        .summary-card { background: #0e5aa5; padding: 40px; border-radius: 20px; max-width: 480px; color: #fff; }
        .summary-card h3 { font-size: 22px; margin-bottom: 30px; }
        .row { display: flex; justify-content: space-between; font-size: 18px; margin-bottom: 18px; }
        .row.total { font-size: 22px; font-weight: 800; margin-top: 30px; }
        .payment-right h2 { font-size: 30px; margin-bottom: 40px; color: #fff; }
        .method { display: flex; align-items: center; gap: 14px; padding: 18px 20px; border: 2px solid #051b47; border-radius: 14px; font-size: 18px; margin-bottom: 20px; cursor: pointer; transition: 0.2s ease; background: #fff; color: #000; }
        .method:hover { border-color: #6b8cff; }
        .pay-btn { margin-top: 40px; width: 100%; padding: 18px; font-size: 18px; font-weight: 700; background: #072387; color: white; border: none; border-radius: 16px; cursor: pointer; }
        .pay-btn:hover { background: #4f6ef7; }
        @media (max-width: 900px) {
          .payment-page { grid-template-columns: 1fr; }
          .payment-left, .payment-right { padding: 40px 24px; }
          .summary-card { max-width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default PaymentPage;