import React, { useEffect, useState } from "react";

const HistoryPage = () => {
  const [bookings, setBookings] = useState([]);

  // Load bookings from localStorage on mount
  useEffect(() => {
    const savedBookings = JSON.parse(localStorage.getItem("bookingHistory")) || [];
    setBookings(savedBookings);
  }, []);

  // DELETE A SINGLE BOOKING
  const deleteBooking = (indexToDelete) => {
    const updatedBookings = bookings.filter((_, index) => index !== indexToDelete);
    setBookings(updatedBookings);
    localStorage.setItem("bookingHistory", JSON.stringify(updatedBookings));
  };

  // CLEAR ALL HISTORY
  const clearAllHistory = () => {
    if (window.confirm("Are you sure you want to clear all booking history?")) {
      setBookings([]);
      localStorage.removeItem("bookingHistory");
    }
  };

  return (
    <div className="history-page">
      <header className="brand-header">
        <h1>Booking History</h1>
        {bookings.length > 0 && (
          <button className="clear-all-btn" onClick={clearAllHistory}>
            Clear All History
          </button>
        )}
      </header>

      <main className="history-container">
        {bookings.length === 0 ? (
          <p className="no-history">No booking history yet.</p>
        ) : (
          <div className="history-grid">
            {bookings.map((booking, index) => (
              <div key={index} className="history-card">
                <div className="card-header">
                  <h3>Booking #{index + 1}</h3>
                  <button 
                    className="delete-card-btn" 
                    onClick={() => deleteBooking(index)}
                    title="Delete this record"
                  >
                    &times;
                  </button>
                </div>
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
          position: relative;
        }

        .brand-header h1 {
          margin: 0;
          font-size: 32px;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .clear-all-btn {
          position: absolute;
          right: 50px;
          top: 50%;
          transform: translateY(-50%);
          background: #ff4d4d;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: bold;
          transition: background 0.3s;
        }

        .clear-all-btn:hover {
          background: #cc0000;
        }

        .history-container {
          padding: 50px;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          flex: 1;
        }

        .history-grid {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 30px;
          width: 100%;
          max-width: 900px;
        }

        .history-card {
          background: #809fdc; 
          padding: 40px;
          border-radius: 18px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
          width: 100%;
          position: relative;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 2px solid rgba(255, 255, 255, 0.3);
          margin-bottom: 15px;
          padding-bottom: 10px;
        }

        .card-header h3 {
          margin: 0;
          color: #0e5aa5;
          font-size: 28px;
        }

        .delete-card-btn {
          background: rgba(255, 77, 77, 0.2);
          border: 1px solid #ff4d4d;
          color: #ff4d4d;
          font-size: 24px;
          line-height: 1;
          width: 35px;
          height: 35px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .delete-card-btn:hover {
          background: #ff4d4d;
          color: white;
        }

        .card-content p {
          margin: 12px 0;
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
          font-size: 22px;
          color: #666;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};

export default HistoryPage;