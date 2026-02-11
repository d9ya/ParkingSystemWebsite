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
          <p className="no-history">
            No booking history yet.
          </p>
        ) : (
          <div className="history-grid">
            {bookings.map((booking, index) => (
              <div key={index} className="history-card">
                <h3>Booking #{index + 1}</h3>
                <div className="card-content">
                  <p><strong>User:</strong> {booking.username}</p>
                  <p><strong>NIC:</strong> {booking.nic}</p>
                  <p><strong>Vehicle:</strong> {booking.vehicleType} {booking.vehicleModel} ({booking.vehicleNumber})</p>
                  <p><strong>Province:</strong> {booking.province}</p>
                  <p><strong>District:</strong> {booking.district}</p>
                  <p><strong>Parking Spot:</strong> {booking.parkingSpot?.name || "N/A"}</p>
                  <p><strong>Payment Method:</strong> {booking.paymentMethod || "N/A"}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <style>{`
        /* FIX: The "black part" happens because the parent container is likely a Flexbox.
           Setting position absolute and width 100vw forces this page to fill the entire screen.
        */
        .history-page {
          background: #f4f7f6;
          min-height: 100vh;
          width: 100vw;
          position: absolute;
          left: 0;
          top: 0;
          z-index: 10;
          display: flex;
          flex-direction: column;
          font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        }

        .brand-header {
          background-color: #0e5aa5;
          padding: 25px 0;
          text-align: center;
          color: white;
          width: 100%;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .brand-header h1 {
          margin: 0;
          font-size: 32px;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .history-container {
          padding: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
          flex: 1;
        }

        /* Desktop Grid: Adjusts based on screen size */
        .history-grid {
          display: grid;
          align-items: center;
          gap: 30px;
          width: 100%;
          max-width: 900px; /* Keeps the content from looking too stretched */
        }

        .history-card {
          background: #809fdc; 
          padding: 45px;
          border-radius: 18px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s ease;
          border: 1px solid #4f70b3;
          width: 100%;
        }

        .history-card:hover {
          transform: scale(1.02);
          box-shadow: 0 15px 45px rgba(0, 0, 0, 0.2);
        }

        .history-card h3 {
          margin-top: 0;
          margin-bottom: 15px;
          color: #0e5aa5;
          font-size: 28px;
          border-bottom: 2px solid rgba(255, 255, 255, 0.3);
          padding-bottom: 10px;
        }

        .status-badge {
          background: #0e5aa5;
          color: white;
          padding: 6px 15px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: bold;
        }
        .card-content p {
          margin: 10px 0;
          font-size: 19px;
          color: #1a1a1a;
          line-height: 1.5;
        }

        .card-content strong {
          color: #0e5aa5;
          margin-right: 10px;
        }

        .no-history {
          text-align: center;
          margin-top: 100px;
          font-size: 20px;
          color: #666;
        }

        /* Global Reset for this component */
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};

export default HistoryPage;