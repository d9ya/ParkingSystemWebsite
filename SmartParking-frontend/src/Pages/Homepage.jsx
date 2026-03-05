import React from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: "Segoe UI", sans-serif, sans-serif;
        }

        body {
          background: #f5f7f8;
        }

        nav {
          position: fixed;
          top: 0;
          width: 100%;
          background: rgba(0,0,0,0.7);
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 50px;
          z-index: 100;
        }

        nav .logo {
          font-size: 24px;
          font-weight: bold;
          color: white;
        }

        nav .logo span {
          color: #3cc3c3;
        }

        nav .nav-links {
          display: flex;
          list-style: none;
          gap: 35px;
          color: white;
        }

        nav .nav-links li, nav a {
          cursor: pointer;
          font-weight: 600;
          font-size: 1.1rem;
          text-decoration: none;
          color: white;
          transition: color 0.3s;
        }

        nav .nav-links li:hover, nav a:hover {
          color: #0e5aa5;
        }

        nav .nav-right {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        nav .login-btn {
          background: #3f4752;
          color: white;
          border: none;
          padding: 8px 18px;
          border-radius: 5px;
          cursor: pointer;
          font-weight: 600;
          transition: background 0.3s;
        }

        nav .login-btn:hover {
          background: #0e5aa5;
        }

        .hero {
  background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
              url('background.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100vw;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 20px;
  overflow: hidden;
}

        .hero h1 {
          font-size: 4rem;
          margin-bottom: 20px;
          max-width: 700px;
        }

        .hero p {
          font-size: 1.5rem;
          margin-bottom: 30px;
          max-width: 600px;
        }

        .btn, .learn-btn {
          background: #0e5aa5;
          color: white;
          border: none;
          padding: 15px 30px;
          font-size: 1.2rem;
          border-radius: 10px;
          cursor: pointer;
          transition: background 0.3s;
          font-weight: 600;
        }

        .btn:hover, .learn-btn:hover {
          background: #0c4680;
        }

        /* Additional Hero Text Section (from second code) */
        .hero-text {
          max-width: 520px;
          margin-bottom: 40px;
        }

        .sub-title {
          color: #bbb;
          margin-bottom: 10px;
          font-weight: 600;
          font-size: 1.2rem;
        }

        .description {
          color: #ddd;
          line-height: 1.6;
          font-size: 1.1rem;
          margin-bottom: 25px;
        }

        @media (max-width: 900px) {
          nav {
            padding: 10px 20px;
          }

          nav .nav-links {
            gap: 15px;
          }

          .hero h1 {
            font-size: 2.5rem;
          }

          .hero p {
            font-size: 1.2rem;
          }

          .btn, .learn-btn {
            padding: 12px 24px;
            font-size: 1rem;
          }
        }
      `}</style>

      <nav>
        <div className="logo">
          Smart<span>Parking</span>
        </div>

        <ul className="nav-links">
          <li onClick={() => navigate("/")}>Home</li>
          <li onClick={() => navigate("/book")}>Book Parking</li>
          <li onClick={() => navigate("/registerlogin")}>Login / Register</li>
        </ul>
      </nav>

      <div className="hero">
        <h1>Welcome to SmartParking</h1>
        <p>Reserve your parking spot quickly and securely.</p>
        <button className="btn" onClick={() => navigate("/registerlogin")}>
        Book Now
        </button>

        {/* Additional hero text from second design */}
        <div className="hero-text" style={{ marginTop: "40px" }}>
          <p className="sub-title">Go Smart, Go Everywhere.</p>
          <h2>
            Smart Parking Solutions <br />
            Where You Like It.
          </h2>
          <p className="description">
            We enable innovative urban mobility solutions by providing smart, 
            flexible, and scalable parking systems that make city driving seamless,
             efficient, and sustainable.
          </p>
          <button className="learn-btn" onClick={() => alert("Learn More clicked!")}>
            Learn More
          </button>
        </div>
      </div>
    </>
  );
}