import React, { useEffect, useState } from "react";

const HistoryPage = () => {
  const [bookings, setBookings] = useState([]);

  // Load bookings from localStorage on mount
  useEffect(() => {
    const savedBookings = JSON.parse(localStorage.getItem("bookingHistory")) || [];
    setBookings(savedBookings);
  }, []);

  return (
    <div className="history-page">
      <header className="brand-header">
        <h1>Booking History</h1>
      </header>

      <main className="history-container">
        {bookings.length === 0 ? (
          <p style={{ textAlign: "center", marginTop: "50px", fontSize: "18px" }}>
            No booking history yet.
          </p>
        ) : (
          bookings.map((booking, index) => (
            <div key={index} className="history-card">
              <h3>Booking #{index + 1}</h3>
              <p><strong>User:</strong> {booking.username}</p>
              <p><strong>NIC:</strong> {booking.nic}</p>
              <p><strong>Vehicle:</strong> {booking.vehicleType} {booking.vehicleModel} ({booking.vehicleNumber})</p>
              <p><strong>Province:</strong> {booking.province}</p>
              <p><strong>District:</strong> {booking.district}</p>
              <p><strong>Parking Spot:</strong> {booking.parkingSpot.name}</p>
              <p><strong>Payment Method:</strong> {booking.paymentMethod || "N/A"}</p>
            </div>
          ))
        )}
      </main>

      <style>{`
        .brand-header {
          background-color:#0e5aa5;
          padding: 25px 0;
          text-align: center;
          color: white;
          font-size: 28px;
          font-weight: 800;
        }

        .history-container {
          padding: 40px 20px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          max-width: 800px;
          margin: auto;
        }

        .history-card {
          background: white;
          padding: 25px;
          border-radius: 16px;
          box-shadow: 0 0 15px rgba(0,0,0,0.1);
        }

        .history-card h3 {
          margin-bottom: 15px;
          color: #0e5aa5;
        }

        .history-card p {
          margin-bottom: 6px;
          font-size: 16px;
        }
      `}</style>
    </div>
  );
};

export default HistoryPage;