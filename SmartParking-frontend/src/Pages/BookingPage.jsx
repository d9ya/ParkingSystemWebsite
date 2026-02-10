import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BookingPage = () => {
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [bookingSaved, setBookingSaved] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    nic: "",
    vehicleType: "",
    vehicleModel: "",
    vehicleNumber: "",
  });

  const parkingSpaces = [
    { id: 1, name: "A1", available: 3 },
    { id: 2, name: "A2", available: 0 },
    { id: 3, name: "B1", available: 2 },
    { id: 4, name: "C1", available: 1 },
  ];

  const provinces = ["Bagmati", "Madhesh", "Gandaki"];
  const districts = {
    Bagmati: ["Kathmandu", "Lalitpur"],
    Madhesh: ["Janakpur", "Birgunj"],
    Gandaki: ["Pokhara", "Lamjung"],
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (
      !formData.username ||
      !formData.nic ||
      !formData.vehicleNumber ||
      !province ||
      !district ||
      !selectedSpot
    ) {
      return;
    }

    console.log("Booking Confirmed:", {
      parkingSpot: selectedSpot,
      ...formData,
      province,
      district,
    });
    setBookingSaved(true);
    alert("Booking Confirmed ✅");
    navigate("/payment",{
        state: {
          parkingSpot: selectedSpot,
          ...formData,
          province,
          district,
        }
    });
  };
    const resetAllData = () => {
    setSelectedSpot(null);

    setFormData({
      username: "",
      nic: "",
      vehicleType: "",
      vehicleModel: "",
      vehicleNumber: "",
    });

    setProvince("");
    setDistrict("");
    setSubmitted(false);
    setBookingSaved(false);
  };

  const navigate = useNavigate();

  return (
    <>
      <div className="booking-container">
        <header className="brand-header">
          <div className="logo-text">
            BOOKING
          </div>
        </header>

        <div className="parking-grid">
          {parkingSpaces.map((spot) => (
            <div
              key={spot.id}
              className={`parking-card ${
                spot.available === 0 ? "disabled" : ""
              } ${selectedSpot?.id === spot.id ? "active" : ""}`}
              onClick={() => {
                if (spot.available === 0) return;

                setSelectedSpot(spot);
                resetForm(); // 🔥 wipes everything clean
              }}
            >
              <h3>{spot.name}</h3>
              <p>Available: {spot.available}</p>
            </div>
          ))}
        </div>

        {selectedSpot && (
          <main className="content-area">
            <div className="form-card">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="field-group">
                    <label>
                      User Name
                      {submitted && !formData.username && (
                        <span className="error-msg">Invalid user name</span>
                      )}
                    </label>
                    <input name="username"
                     onChange={handleChange} 
                     value={formData.username}
                     />
                  </div>

                  <div className="field-group">
                    <label>
                      NIC Number
                      {submitted && !formData.nic && (
                        <span className="error-msg">Invalid NIC number</span>
                      )}
                    </label>
                    <input name="nic" onChange={handleChange} value={formData.nic} />
                  </div>
                </div>

                <div className="row">
                  <div className="field-group">
                    <label>Vehicle Type</label>
                    <select name="vehicleType" value={formData.vehicleType} onChange={handleChange}>
                      <option>Car</option>
                      <option>Bike</option>
                    </select>
                  </div>

                  <div className="field-group">
                    <label>Vehicle Model</label>
                    <select name="vehicleModel" value={formData.vehicleModel} onChange={handleChange}>
                      <option>Model A</option>
                      <option>Model B</option>
                    </select>
                  </div>
                </div>

                <div className="field-group full-width">
                  <label>
                    Vehicle Number
                    {submitted && !formData.vehicleNumber && (
                      <span className="error-msg">
                        Invalid vehicle number
                      </span>
                    )}
                  </label>
                  <input
                    name="vehicleNumber"
                    value={formData.vehicleNumber}
                    onChange={handleChange}
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
                    >
                      <option></option>
                      {provinces.map((p) => (
                        <option key={p}>{p}</option>
                      ))}
                    </select>
                  </div>

                  <div className="field-group">
                    <label>District</label>
                    <select
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      disabled={!province}
                    >
                      <option></option>
                      {province &&
                        districts[province].map((d) => (
                          <option key={d}>{d}</option>
                        ))}
                    </select>
                  </div>
                </div>

                <button className="confirm-btn">Confirm</button>

                {bookingSaved && (
                  <p style={{ marginTop: "20px", color: "green", fontWeight: "700", textAlign: "center" }}>
                    ✅ Booking saved successfully
                  </p>
                )}
              </form>
            </div>
          </main>
        )}
      </div>

      {/* ✅ CSS stays EXACTLY the same, just placed correctly */}
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #f9fbff; font-family: Helvetica, Arial, sans-serif; overflow-x: hidden; }

        .brand-header {
          background-color:#0e5aa5;
          padding: 25px 0;
          text-align: center;
          color: white;
          font-size: 24px;
          font-weight: 800;
          width: 190%;
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
          gap: 40px;
          max-width: 1000px;
          width: 190%;
          margin: auto;
          marging-left: auto;
          margin-right: auto;
        }

        .parking-card {
          background: #6d81a9;
          padding: 20px;
          border-radius: 14px;
          border: 1px solid #7197e4;
          cursor: pointer;
          transition: 0.2s;
          width: 100%;
        }
          input[name="username"],
          input[name="vehicleNumber"],
          select[name="vehicleType"],
          select[name="vehicleModel"],
          select {
            color: #000;
          }

          /* Make sure labels are also black */
          label {
            color: #000;
          }

          /* Dropdown options text */
          option {
            color: #000;
          }

        .parking-card.active { border: 4px solid #7c94e6; }
        .parking-card.disabled { background: #fee2e2; cursor: not-allowed; }

        .form-card {
          background: white;
          max-width: auto;
          width: 160%;
          padding: 50px;
          border-radius: 20px;
          margin-left: auto;
          margin-right: auto;
        }

        .row { display: flex; gap: 20px; margin-bottom: 25px; }
        .field-group { flex: 1; display: flex; flex-direction: column; }

        label {
          font-size: 14px;
          font-weight: 700;
          margin-bottom: 8px;
          display: flex;
          justify-content: space-between;
        }

        .error-msg {
          color: #ef4444;
          font-size: 12px;
        }

        input, select {
          padding: 14px 20px;
          border-radius: 30px;
          border: 1.5px solid #6c94c9;
        }

        .confirm-btn {
          width: 100%;
          padding: 16px;
          background: #072387;
          color: white;
          border-radius: 12px;
          font-weight: 700;
          border: none;
          cursor: pointer;
        }
          .confirm-btn:hover {
          background: #4f6ef7;
        }
                /* Make input & select boxes WHITE */
      input,
      select {
        background-color: #ffffff;
        color: #000;
      }

      /* Fix autofill / browser styling (Chrome especially) */
      input:-webkit-autofill,
      input:-webkit-autofill:hover,
      input:-webkit-autofill:focus {
        -webkit-box-shadow: 0 0 0 1000px #ffffff inset;
        -webkit-text-fill-color: #000;
      }
                
      `}</style>
    </>
  );
};

export default BookingPage;