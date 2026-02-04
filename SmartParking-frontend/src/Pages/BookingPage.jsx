import React, { useState, useEffect } from "react";

export default function BookingPage() {
  const [parkingSpaces, setParkingSpaces] = useState([]);
  const [selectedSpot, setSelectedSpot] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/parking/available-spaces")
      .then(res => res.json())
      .then(data => setParkingSpaces(data))
      .catch(err => console.error(err));
  }, []);

  const handleBooking = () => {
    if(!selectedSpot){
      alert("Please select a parking spot first!");
      return;
    }
    if(selectedSpot.slots===0){
      alert("This spot is full.");
      return;
    }

    fetch("http://localhost:5000/api/booking", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({spotId:selectedSpot.id})
    })
    .then(res=>res.json())
    .then(data=>alert(`Successfully booked ${data.spotName}!`))
    .catch(err=>alert("Booking failed, try again."));
  }

  return (
    <div style={{padding:"40px", fontFamily:"Segoe UI, sans-serif"}}>
      <h1>📅 Book Your Parking Spot</h1>
      <p>Select a spot below to reserve:</p>

      <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))", gap:"20px", marginTop:"20px"}}>
        {parkingSpaces.length===0 ? <p>No parking spaces available. Go back to Dashboard to load them.</p> :
          parkingSpaces.map(space=>(
            <div
              key={space.id}
              onClick={()=>space.slots>0 && setSelectedSpot(space)}
              style={{
                padding:"16px",
                borderRadius:"12px",
                cursor: space.slots>0 ? "pointer":"not-allowed",
                backgroundColor: space.slots>0 ? "#e0f7fa":"#ffebee",
                border: selectedSpot?.id===space.id ? "2px solid #4338ca":"1px solid #ccc",
              }}
            >
              <strong>{space.name}</strong>
              <p>{space.location}</p>
              <p>Available Slots: {space.slots}</p>
            </div>
          ))
        }
      </div>

      <button onClick={handleBooking} style={{marginTop:"20px", padding:"12px 28px", borderRadius:"8px", border:"none", backgroundColor:"#4338ca", color:"#fff", cursor:"pointer", fontSize:"16px"}}>
        Book Now
      </button>
    </div>
  );
}