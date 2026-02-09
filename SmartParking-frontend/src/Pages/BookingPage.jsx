import React, { useState } from "react";

export default function BookingPage() {
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    nic: "",
    vehicleType: "",
    vehicleModel: "",
    vehicleNumber: "",
  });

  // Mock parking data
  const parkingSpaces = [
    { id: 1, name: "A1", location: "Basement", slots: 3 },
    { id: 2, name: "A2", location: "Basement", slots: 0 },
    { id: 3, name: "B1", location: "Ground Floor", slots: 2 },
    { id: 4, name: "C1", location: "First Floor", slots: 1 },
  ];

  const provinces = [
    "Province 1",
    "Madhesh",
    "Bagmati",
    "Gandaki",
    "Lumbini",
    "Karnali",
    "Sudurpashchim",
  ];

  const districtsByProvince = {
    "Province 1": ["Jhapa", "Morang", "Sunsari"],
    Madhesh: ["Dhanusha", "Parsa", "Bara"],
    Bagmati: ["Kathmandu", "Lalitpur", "Bhaktapur"],
    Gandaki: ["Kaski", "Lamjung"],
    Lumbini: ["Rupandehi", "Kapilvastu"],
    Karnali: ["Surkhet", "Dailekh"],
    Sudurpashchim: ["Kailali", "Kanchanpur"],
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Booking Confirmed:", {
      parkingSpot: selectedSpot,
      ...formData,
      province,
      district,
    });

    alert("Booking confirmed successfully 🚗");
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #f9fbff; font-family: Helvetica, Arial, sans-serif; }

        .brand-header {
          background-color: #334155;
          padding: 25px 0;
          text-align: center;
          color: white;
          font-size: 24px;
          font-weight: 800;
        }

        .content-area {
          padding: 40px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 40px;
        }

        .parking-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          max-width: 900px;
          width: 100%;
        }

        .parking-card {
          background: white;
          padding: 20px;
          border-radius: 14px;
          border: 1px solid #e5e7eb;
          cursor: pointer;
          transition: 0.2s;
        }

        .parking-card:hover { transform: translateY(-4px); }

        .parking-card.active { border: 2px solid #7c94e6; }

        .parking-card.disabled {
          background: #fee2e2;
          cursor: not-allowed;
        }

        .form-card {
          background: white;
          max-width: 720px;
          width: 100%;
          padding: 50px;
          border-radius: 20px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.04);
        }

        .row {
          display: flex;
          gap: 20px;
          margin-bottom: 25px;
        }

        .field-group {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        label {
          font-size: 14px;
          font-weight: 700;
          margin-bottom: 10px;
          display: flex;
          justify-content: space-between;
        }

        .error-msg {
          color: #ef4444;
          font-size: 12px;
          font-weight: 400;
        }

        input, select {
          width: 100%;
          padding: 14px 20px;
          border-radius: 30px;
          border: 1.5px solid #e2e8f0;
          background: #f8fafc;
        }

        .confirm-btn {
          width: 100%;
          padding: 16px;
          background: #88a0ef;
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
        }
      `}</style>

      <header className="brand-header">BOOKING</header>

      <main className="content-area">
        {/* Parking Selection */}
        <div className="parking-grid">
          {parkingSpaces.map((space) => (
            <div
              key={space.id}
              className={`parking-card 
                ${space.slots === 0 ? "disabled" : ""}
                ${selectedSpot?.id === space.id ? "active" : ""}
              `}
              onClick={() => space.slots > 0 && setSelectedSpot(space)}
            >
              <h3>{space.name}</h3>
              <p>{space.location}</p>
              <strong>Available: {space.slots}</strong>
            </div>
          ))}
        </div>

        {/* Booking Form */}
        {selectedSpot && (
          <div className="form-card">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="field-group">
                  <label>
                    User Name <span className="error-msg">Invalid user name</span>
                  </label>
                  <input
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="field-group">
                  <label>
                    NIC Number <span className="error-msg">Invalid NIC number</span>
                  </label>
                  <input
                    name="nic"
                    value={formData.nic}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="field-group">
                  <label>Vehicle Type</label>
                  <select
                    name="vehicleType"
                    value={formData.vehicleType}
                    onChange={handleChange}
                    required
                  >
                    <option value=""></option>
                    <option>Car</option>
                    <option>Bike</option>
                  </select>
                </div>

                <div className="field-group">
                  <label>Vehicle Model</label>
                  <select
                    name="vehicleModel"
                    value={formData.vehicleModel}
                    onChange={handleChange}
                    required
                  >
                    <option value=""></option>
                    <option>Model A</option>
                    <option>Model B</option>
                  </select>
                </div>
              </div>

              <div className="field-group">
                <label>
                  Vehicle Number <span className="error-msg">Invalid vehicle number</span>
                </label>
                <input
                  name="vehicleNumber"
                  value={formData.vehicleNumber}
                  onChange={handleChange}
                  placeholder="CBA 1201"
                  required
                />
              </div>

              <div className="row">
                <div className="field-group">
                  <label>Province</label>
                  <select
                    value={province}
                    onChange={(e) => {
                      setProvince(e.target.value);
                      setDistrict("");
                    }}
                    required
                  >
                    <option value=""></option>
                    {provinces.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>

                <div className="field-group">
                  <label>Districts</label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    disabled={!province}
                    required
                  >
                    <option value=""></option>
                    {province &&
                      districtsByProvince[province].map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                  </select>
                </div>
              </div>

              <button className="confirm-btn">Confirm</button>
            </form>
          </div>
        )}
      </main>
    </>
  );
}