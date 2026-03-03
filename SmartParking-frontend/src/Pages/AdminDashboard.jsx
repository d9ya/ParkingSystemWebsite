import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [active, setActive] = useState("Dashboard");
  const [bookings, setBookings] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  // Load booking history
  useEffect(() => {
    const savedBookings =
      JSON.parse(localStorage.getItem("bookingHistory")) || [];

    setBookings(savedBookings);

    // Calculate total revenue (Rs.100 per booking for now)
    const revenue = savedBookings.length * 100;
    setTotalRevenue(revenue);
  }, []);

  const handleLogout = () => {
    navigate("/registerlogin");
  };

  return (
    <>
      <style>{`
        body {
          margin: 0;
          font-family: "Segoe UI", sans-serif;
          background: #4d5468;
        }

        .admin-app {
          display: flex;
          min-height: 100vh;
        }

        /* SIDEBAR */
        .sidebar {
          width: 250px;
          background: #0e5aa5;
          color: white;
          padding: 30px 20px;
          display: flex;
          flex-direction: column;
        }

        .sidebar h2 {
          margin-bottom: 40px;
          text-align: center;
        }

        .menu-item {
          padding: 12px 15px;
          margin-bottom: 12px;
          border-radius: 8px;
          cursor: pointer;
        }

        .menu-item:hover,
        .menu-item.active {
          background: rgba(255,255,255,0.2);
        }

        .logout {
          margin-top: auto;
          background: #ff4d4d;
          padding: 12px;
          text-align: center;
          border-radius: 8px;
          cursor: pointer;
        }

        /* MAIN */
        .main {
          flex: 1;
          padding: 40px;
        }

        .cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 25px;
          margin-bottom: 40px;
        }

        .card {
          background: #86a4c9;
          padding: 30px;
          border-radius: 16px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.08);
        }

        .card h3 {
          margin: 0;
          margin-bottom: 10px;
        }

        .card p {
          font-size: 28px;
          font-weight: bold;
          color: #0e5aa5;
        }

        .table {
        background: white;
        padding: 30px;
        border-radius: 20px;
        width: 200%;
        overflow-x: auto;
        }

        table {
        width: 100%;
        border-collapse: collapse;
        font-size: 18px; /* 🔥 bigger text */
        }

        th, td {
        padding: 18px 20px; /* 🔥 more spacing */
        text-align: left;
        border-bottom: 1px solid #ddd;
        color: black;
        }

        th {
        background: #0e5aa5;
        color: white;
        font-size: 19px;
        }

        tbody tr:hover {
        background: #f2f6ff; /* subtle hover effect */
        }
      `}</style>

      <div className="admin-app">
        {/* SIDEBAR */}
        <div className="sidebar">
          <h2>Admin Panel</h2>

          <div
            className={`menu-item ${active === "Dashboard" ? "active" : ""}`}
            onClick={() => setActive("Dashboard")}
          >
            Dashboard
          </div>

          <div
            className={`menu-item ${active === "Bookings" ? "active" : ""}`}
            onClick={() => setActive("Bookings")}
          >
            All Bookings
          </div>

          <div className="logout" onClick={handleLogout}>
            Logout
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="main">
          {active === "Dashboard" && (
            <>
              <h1>Admin Dashboard</h1>

              <div className="cards">
                <div className="card">
                  <h3>Total Bookings</h3>
                  <p>{bookings.length}</p>
                </div>

                <div className="card">
                  <h3>Total Revenue</h3>
                  <p>Rs. {totalRevenue}</p>
                </div>

                <div className="card">
                  <h3>Total Users</h3>
                  <p>{bookings.length}</p>
                </div>
              </div>
            </>
          )}

          {active === "Bookings" && (
            <>
              <h1>All Bookings</h1>

              <div className="table">
                {bookings.length === 0 ? (
                  <p>No bookings yet.</p>
                ) : (
                  <table>
                    <thead>
                      <tr>
                        <th>User</th>
                        <th>Vehicle</th>
                        <th>Province</th>
                        <th>Spot</th>
                        <th>Payment</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((b, index) => (
                        <tr key={index}>
                          <td>{b.username}</td>
                          <td>{b.vehicleNumber}</td>
                          <td>{b.province}</td>
                          <td>{b.parkingSpot?.name}</td>
                          <td>{b.paymentMethod}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}