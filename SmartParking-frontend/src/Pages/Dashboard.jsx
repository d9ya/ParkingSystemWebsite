import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [active, setActive] = useState("Dashboard");
  const [username, setUsername] = useState("");
  const [availableSlots, setAvailableSlots] = useState(0);
  const [showParking, setShowParking] = useState(false);
  const [parkingSpaces, setParkingSpaces] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
    }, []);
    useEffect(() => {
    fetch("http://localhost:5000/api/parking/available")
      .then(res => res.json())
      .then(data => {
        setAvailableSlots(data.availableSlots);
      })
      .catch(err => {
        console.error("Failed to fetch parking slots", err);
      });
  }, []);

    const handleFindParking = () => {
  fetch("http://localhost:5000/api/parking/available-spaces")
    .then(res => res.json())
    .then(data => {
      setParkingSpaces(data);
      setShowParking(true);
    })
    .catch(err => {
      console.error("Error fetching parking spaces", err);
    });
};

const handlelogout = () => {
  localStorage.removeItem("username");
  navigate("/registerlogin");
}

  return (
    <>
      <style>{`
        body {
          margin: 0;
          background: #f2f4f8;
          min-width: 1280px;
          font-family: "Segoe UI", system-ui, sans-serif;
        }

        * {
          box-sizing: border-box;
        }

        .app {
          width: 1440px;
          margin: 0 auto;
          display: flex;
          min-height: 100vh;
        }

        /* ===== SIDEBAR ===== */
        .sidebar {
          width: 260px;
          min-width: 260px;
          max-width: 260px;
          flex-shrink: 0;
          background: #ffffff;
          padding: 28px 22px;
          border-right: 1px solid #e5e7eb;
          display: flex;
          flex-direction: column;
        }

        .logo {
          font-size: 24px;
          font-weight: 700;
          color: #6366f1;
          margin-bottom: 36px;
        }

        .user {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 36px;
        }

        .avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #c7d2fe;
        }

        .menu a {
          display: block;
          padding: 14px 16px;
          margin-bottom: 12px;
          border-radius: 12px;
          text-decoration: none;
          color: #374151;
          font-weight: 500;
          cursor: pointer;
        }

        .menu a.active,
        .menu a:hover {
          background: #eef2ff;
          color: #4338ca;
        }
          /* ===== PARKING MODAL ===== */
        .modal-bg {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.4);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }

        .modal {
          background: #ffffff;
          width: 420px;
          max-height: 70vh;
          overflow-y: auto;
          padding: 24px;
          border-radius: 18px;
        }

        .space {
          background: #f1f5f9;
          padding: 14px;
          border-radius: 12px;
          margin-bottom: 12px;
        }

        /* ===== MAIN ===== */
        .main {
          flex: 1;
          padding: 32px 36px;
        }

        .logout {
          margin-top: auto;
          color: #000000;
          padding: 14px 16px;
          border-radius: 12px;
          text-decoration: none;
          font-weight: 500;
          cursor: pointer;
        }

        .logout:hover {
          background: #fee2e2;
        }

        /* ===== HERO ===== */
        .hero {
          background: linear-gradient(135deg, #6366f1, #818cf8);
          border-radius: 20px;
          padding: 36px 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: white;
          margin-bottom: 32px;
        }

        .hero h2 {
          margin: 0;
          font-size: 28px;
        }

        .hero p {
          margin-top: 8px;
          opacity: 0.9;
        }

        .weather {
          font-size: 20px;
          font-weight: 500;
        }

        /* ===== GRID ===== */
        .grid {
          display: grid;
          grid-template-columns: 2.2fr 1.3fr;
          gap: 26px;
          margin-bottom: 32px;
        }

        .card {
          background: #ffffff;
          border-radius: 18px;
          padding: 26px;
          box-shadow: 0 8px 20px rgba(14, 14, 14, 0.06);
        }

        .card h3 {
          margin-top: 0;
          margin-bottom: 16px;
          color: #000000;
          font-weight: 700;
        }

        .slots {
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .slots-count {
          font-size: 44px;
          font-weight: 700;
          color: #4338ca;
        }

        .btn {
          margin-top: 18px;
          padding: 12px 22px;
          background: #6366f1;
          color: #ffffff;
          border: none;
          border-radius: 12px;
          font-size: 15px;
          cursor: pointer;
        }

        .payment {
          display: flex;
          justify-content: space-between;
          font-size: 15px;
          margin-bottom: 14px;
          color: #000000;
        }

        /* ===== RATES ===== */
        .rates {
          background: #ffffff;
          border-radius: 18px;
          padding: 26px;
          margin-bottom: 32px;
        }

        .rate-list {
          display: flex;
          justify-content: space-between;
          margin-top: 18px;
        }

        .rate {
          width: 18%;
          background: #536ec5;
          border-radius: 14px;
          padding: 16px;
          text-align: center;
          font-weight: 500;
          color: white;
        }

        .rates h3 {
          color: #000000;
          font-weight: 700;
        }

        /* ===== MAP ===== */
        .map {
          background: #ffffff;
          border-radius: 18px;
          padding: 26px;
        }

        .map-box {
          margin-top: 18px;
          height: 260px;
          border-radius: 16px;
          overflow: hidden;
        }

        .map h3 {
          color: #000000;
          font-weight: 700;
        }
      `}</style>

      <div className="app">
        {/* SIDEBAR */}
        <aside className="sidebar">
          <div className="logo">
            <img
              src="/logo.png"
              alt="SlotZen Logo"
              style={{ width: "180px", height: "auto" }}
            />
          </div>

          <div className="user">
            <strong>{username}</strong>
          </div>

          <nav className="menu">
            <a className={active === "Dashboard" ? "active" : ""} onClick={() => setActive("Dashboard")}>Dashboard</a>
            <a className={active === "Bookings" ? "active" : ""} onClick={() => setActive("Bookings")}>Bookings</a>
            <a className={active === "Payments" ? "active" : ""} onClick={() => setActive("Payments")}>Payments</a>
            <a className={active === "History" ? "active" : ""} onClick={() => setActive("History")}>History</a>
            <a className={active === "Settings" ? "active" : ""} onClick={() => setActive("Settings")}>Settings</a>
            <a
              className="logout"
              onClick={() => {
                const confirmLogout = window.confirm("Are you sure you want to log out?");
                if (confirmLogout) {
                  localStorage.removeItem("username"); // optional: clear saved username
                  navigate("/registerlogin"); // go to login page
                }
              }}
            >
              Log Out
            </a>
          </nav>
        </aside>

        {/* MAIN */}
        <main className="main">
          {active === "Dashboard" && (
            <>
              <section className="hero">
                <div>
                  <h2>Good Morning, {username}!</h2>
                  <p>Manage your parking spaces efficiently</p>
                </div>
                <div className="weather">🌤 28°C</div>
              </section>

              <section className="grid">
                <div className="card">
                  <h3>Nearby Parking Spaces</h3>
                  <div className="slots">
                    <div className="slots-count">{availableSlots}</div>
                    <span>Available Slots</span>
                  </div>
                  <button className="btn" onClick={handleFindParking}>
                    Find Parking
                  </button>
                </div>

                <div className="card">
                  <h3>Recent Payments</h3>
                  <div className="payment"><span>Rs.100</span><span>Central Parkade</span></div>
                  <div className="payment"><span>Rs.200</span><span>Downtown Garage</span></div>
                  <div className="payment"><span>Rs.400</span><span>City Center Lot</span></div>
                </div>
              </section>

              <section className="rates">
                <h3>Parking Charges (Per Hour)</h3>
                <div className="rate-list">
                  <div className="rate">🚗 Rs.200</div>
                  <div className="rate">🏍 Rs.150</div>
                  <div className="rate">🚐 Rs.400</div>
                  <div className="rate">🚲 Rs.100</div>
                  <div className="rate">🅿 Visitor</div>
                </div>
              </section>

              <section className="map">
                <h3>Parking Slot Status (Kathmandu)</h3>
                <div className="map-box">
                  <iframe
                    title="Kathmandu Parking Map"
                    src="https://www.google.com/maps?q=parking+lots+in+Kathmandu&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>
              </section>
            </>
          )}

          {active === "Bookings" && <h2>📅 Bookings Page</h2>}
          {active === "Payments" && <h2>💳 Payments Page</h2>}
          {active === "History" && <h2>🕘 History Page</h2>}
          {active === "Settings" && <h2>⚙️ Settings Page</h2>}
          {active === "Logout" && <h2>🚪 Logging out…</h2>}
        </main>
      </div>
      {showParking && (
  <div className="modal-bg">
    <div className="modal">
      <h3>Available Parking Spaces</h3>

      {parkingSpaces.length === 0 ? (
        <p>No parking spaces available</p>
      ) : (
        parkingSpaces.map((space, index) => (
          <div className="space" key={index}>
            <strong>{space.name}</strong>
            <p>{space.location}</p>
            <p>Slots Available: {space.slots}</p>
          </div>
        ))
      )}

      <button
        className="btn"
        style={{ width: "100%", marginTop: "16px" }}
        onClick={() => setShowParking(false)}
      >
        Close
      </button>
    </div>
  </div>
)}
    </>
    
  );
}