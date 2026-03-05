import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [active, setActive] = useState("Dashboard");
  const [bookings, setBookings] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [allBookings, setAllBookings] = useState([]); // for search/filter
  const [searchTerm, setSearchTerm] = useState("");
  const [filterProvince, setFilterProvince] = useState("");

  // FETCH DASHBOARD DATA
  const fetchDashboard = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/admin/dashboard");
      const data = await res.json();
      setBookings(data.bookings);
      setAllBookings(data.bookings);
      setTotalRevenue(data.totalRevenue);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  // DELETE BOOKING
  const deleteBooking = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/booking/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setBookings((prev) => prev.filter((b) => b.id !== id));
        setAllBookings((prev) => prev.filter((b) => b.id !== id));
      } else {
        console.error("Failed to delete booking");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // SEARCH + FILTER HANDLER
  useEffect(() => {
    let filtered = allBookings;

    if (searchTerm) {
      filtered = filtered.filter((b) =>
        b.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterProvince) {
      filtered = filtered.filter((b) => b.province === filterProvince);
    }

    setBookings(filtered);
  }, [searchTerm, filterProvince, allBookings]);

  const handleLogout = () => {
    navigate("/registerlogin");
  };

  // UI
  return (
    <>
      <style>{`
        body { margin: 0; font-family: "Segoe UI", sans-serif; background: #4d5468; }
        .admin-app { display: flex; min-height: 100vh; }
        .sidebar { width: 250px; background: #0e5aa5; color: white; padding: 30px 20px; display: flex; flex-direction: column; }
        .sidebar h2 { margin-bottom: 40px; text-align: center; }
        .menu-item { padding: 12px 15px; margin-bottom: 12px; border-radius: 8px; cursor: pointer; }
        .menu-item:hover, .menu-item.active { background: rgba(255,255,255,0.2); }
        .logout { margin-top: auto; background: #ff4d4d; padding: 12px; text-align: center; border-radius: 8px; cursor: pointer; }
        .main { flex: 1; padding: 40px; }
        .cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 25px; margin-bottom: 40px; }
        .card { background: #86a4c9; padding: 30px; border-radius: 16px; box-shadow: 0 8px 20px rgba(0,0,0,0.08); }
        .card h3 { margin: 0 0 10px 0; }
        .card p { font-size: 28px; font-weight: bold; color: #0e5aa5; }
        .table { background: white; padding: 30px; border-radius: 20px; overflow-x: auto; }
        table { width: 100%; border-collapse: collapse; font-size: 18px; }
        th, td { padding: 18px 20px; text-align: left; border-bottom: 1px solid #ddd; color: black; }
        th { background: #0e5aa5; color: white; font-size: 19px; }
        tbody tr:hover { background: #f2f6ff; }
        .delete-btn { background:red; color:white; border:none; padding:6px 12px; cursor:pointer; border-radius:5px; }
        .search-filter { margin-bottom:20px; }
        .search-filter input, .search-filter select { padding:10px; margin-right:10px; }
      `}</style>

      <div className="admin-app">

        {/* SIDEBAR */}
        <div className="sidebar">
          <h2>Admin Panel</h2>
          <div className={`menu-item ${active === "Dashboard" ? "active" : ""}`} onClick={() => setActive("Dashboard")}>Dashboard</div>
          <div className={`menu-item ${active === "Bookings" ? "active" : ""}`} onClick={() => setActive("Bookings")}>All Bookings</div>
          <div className="logout" onClick={handleLogout}>Logout</div>
        </div>

        {/* MAIN */}
        <div className="main">

          {active === "Dashboard" && (
            <>
              <h1>Admin Dashboard</h1>
              <div className="cards">
                <div className="card"><h3>Total Bookings</h3><p>{bookings.length}</p></div>
                <div className="card"><h3>Total Revenue</h3><p>Rs. {totalRevenue}</p></div>
                <div className="card"><h3>Total Users</h3><p>{new Set(bookings.map(b => b.username)).size}</p></div>
              </div>
            </>
          )}

          {active === "Bookings" && (
            <>
              <h1>All Bookings</h1>
              <div className="search-filter">
                <input type="text" placeholder="Search vehicle number" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <select value={filterProvince} onChange={(e) => setFilterProvince(e.target.value)}>
                  <option value="">Filter by Province</option>
                  <option value="Bagmati">Bagmati</option>
                  <option value="Koshi">Koshi</option>
                  <option value="Lumbini">Lumbini</option>
                  <option value="Gandaki">Gandaki</option>
                </select>
              </div>

              <div className="table">
                {bookings.length === 0 ? <p>No bookings yet.</p> : (
                  <table>
                    <thead>
                      <tr>
                        <th>User</th><th>NIC</th><th>Vehicle Type</th><th>Vehicle Model</th><th>Vehicle Number</th>
                        <th>Province</th><th>District</th><th>Spot</th><th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((b) => (
                        <tr key={b.id}>
                          <td>{b.username}</td>
                          <td>{b.nic}</td>
                          <td>{b.vehicleType}</td>
                          <td>{b.vehicleModel}</td>
                          <td>{b.vehicleNumber}</td>
                          <td>{b.province}</td>
                          <td>{b.district}</td>
                          <td>{b.parkingSpot}</td>
                          <td><button className="delete-btn" onClick={() => deleteBooking(b.id)}>Delete</button></td>
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