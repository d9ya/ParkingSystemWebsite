import React, { useState, useEffect } from "react";

const Settings = () => {
  // --- STATE ---
  const [username, setUsername] = useState(() => localStorage.getItem("username") || "Diya");
  const [email, setEmail] = useState(() => localStorage.getItem("email") || "diya@example.com");
  
  const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const [notifPrefs, setNotifPrefs] = useState(() => {
    const saved = localStorage.getItem("notifPrefs");
    return saved ? JSON.parse(saved) : { email: true, sms: false, push: true, marketing: false };
  });

  // --- EFFECTS ---
  useEffect(() => {
    localStorage.setItem("notifPrefs", JSON.stringify(notifPrefs));
  }, [notifPrefs]);

  // --- HANDLERS ---
  const handleProfileUpdate = () => {
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
    alert("Profile updated!");
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      alert("New passwords do not match!");
      return;
    }

    setIsChangingPassword(true);
    try {
      const response = await fetch("/api/user/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: passwords.current,
          newPassword: passwords.new
        }),
      });

      if (response.ok) {
        alert("Password changed successfully!");
        setPasswords({ current: "", new: "", confirm: "" });
      } else {
        const err = await response.json();
        alert(`Error: ${err.message || "Failed to update password"}`);
      }
    } catch (error) {
      alert("Backend connection failed.");
      console.error(error);
    } finally {
      setIsChangingPassword(false);
    }
  };

  const toggleNotif = (key) => {
    setNotifPrefs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      <style>
        {`
          body { 
            margin: 0; 
            background-color: #f9fafb; 
            font-family: 'Inter', -apple-system, sans-serif; 
            color: #111; 
          }

          .settings-wrapper { 
            width: 100%; 
            min-height: 100vh; 
            padding: 80px 40px; 
            box-sizing: border-box; 
          }

          .content-limit { 
            max-width: 1200px; 
            margin: 0 auto; 
          }
          
          .page-header {
            margin-bottom: 40px;
          }

          .page-title { 
            font-size: 2.5rem; 
            margin: 0; 
            color: #000; 
            font-weight: 800; 
            letter-spacing: -0.02em;
          }

          .page-subtitle {
            color: #666;
            margin-top: 8px;
            font-size: 1.1rem;
          }
          
          /* DESKTOP GRID: Two columns with significant spacing */
          .settings-grid { 
            display: grid; 
            grid-template-columns: repeat(2, 1fr); 
            gap: 40px; 
            align-items: stretch;
          }

          .card { 
            background: #fff; 
            padding: 40px; 
            border-radius: 20px; 
            box-shadow: 0 4px 20px rgba(0,0,0,0.04); 
            border: 1px solid #eee;
            display: flex;
            flex-direction: column;
            transition: transform 0.2s ease;
          }

          /* Header Style with White Text */
          .card h2.white-title-bg { 
            background: #3a55ab; 
            color: #fff; 
            margin: -40px -40px 30px -40px; 
            padding: 25px 40px; 
            font-size: 1.25rem;
            border-bottom: none; 
          }

          /* Normal Header Style */
          .card h2 { 
            margin-top: 0; 
            font-size: 1.25rem; 
            color: #3a55ab; 
            border-bottom: 1px solid #f3f4f6; 
            padding-bottom: 20px; 
            margin-bottom: 30px; 
            font-weight: 700;
          }

          .input-group { margin-bottom: 24px; }
          .input-group label { 
            display: block; 
            font-size: 0.85rem; 
            font-weight: 700; 
            margin-bottom: 10px; 
            color: #060505; 
            text-transform: uppercase;
            letter-spacing: 0.03em;
          }
          
          .input-group input { 
            width: 100%; 
            padding: 14px 16px; 
            border-radius: 12px; 
            border: 1px solid #e5e7eb; 
            background-color: #3a55ab; 
            color: #ffffff; 
            box-sizing: border-box; 
            transition: all 0.2s;
            font-size: 1rem;
          }

          .input-group input:focus { 
            outline: none; 
            background-color:#3a55ab; 
            border-color: #3a55ab;
            box-shadow: 0 0 0 4px #3a55ab;
          }

          .btn-primary { 
            background: #3a55ab; 
            color: #fff; 
            border: none; 
            padding: 16px 24px; 
            border-radius: 12px; 
            cursor: pointer; 
            font-weight: 600; 
            width: 100%; 
            margin-top: auto; /* Keeps button at the bottom of aligned cards */
            font-size: 1rem;
            transition: background 0.2s;
          }
          .btn-primary:hover { background: #7f8fc5; }
          .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }

          .toggle-row { 
            display: flex; 
            justify-content: space-between; 
            align-items: center; 
            padding: 18px 0; 
            border-bottom: 1px solid #000000;
            color: #111;
            font-weight: 500;
          }
          .toggle-row:last-child { border-bottom: none; }
          
          .switch { 
            width: 42px; 
            height: 22px; 
            cursor: pointer; 
            accent-color: #3a55ab; 
          }

          /* Responsive Breakpoints */
          @media (max-width: 1024px) {
            .settings-grid { grid-template-columns: 1fr; }
            .settings-wrapper { padding: 40px 20px; }
          }

          @media (max-width: 600px) { 
            .page-title { font-size: 2rem; }
            .card { padding: 25px; }
            .card h2.white-title-bg { margin: -25px -25px 20px -25px; padding: 20px 25px; }
          }
        `}
      </style>

      <div className="settings-wrapper">
        <div className="content-limit">
          <header className="page-header">
            <h1 className="page-title">Settings</h1>
            <p className="page-subtitle">Manage your account settings and preferences.</p>
          </header>
          
          <div className="settings-grid">
            {/* 1. Profile Section */}
            <div className="card">
              <h2 className="white-title-bg">Account Profile</h2>
              <div className="input-group">
                <label>Username</label>
                <input value={username} onChange={e => setUsername(e.target.value)} />
              </div>
              <div className="input-group">
                <label>Email Address</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <button className="btn-primary" onClick={handleProfileUpdate}>Update Profile</button>
            </div>

            {/* 2. Security Section */}
            <div className="card">
              <h2 className="white-title-bg">Change Password</h2>
              <form onSubmit={handleChangePassword} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div className="input-group">
                  <label>Current Password</label>
                  <input type="password" value={passwords.current} onChange={e => setPasswords({...passwords, current: e.target.value})} required />
                </div>
                <div className="input-group">
                  <label>New Password</label>
                  <input type="password" value={passwords.new} onChange={e => setPasswords({...passwords, new: e.target.value})} required />
                </div>
                <div className="input-group">
                  <label>Confirm Password</label>
                  <input type="password" value={passwords.confirm} onChange={e => setPasswords({...passwords, confirm: e.target.value})} required />
                </div>
                <button type="submit" className="btn-primary" disabled={isChangingPassword}>
                  {isChangingPassword ? "Updating..." : "Update Password"}
                </button>
              </form>
            </div>

            {/* 3. Notification Preferences */}
            <div className="card">
              <h2>Notification Preferences</h2>
              {['email', 'sms', 'push', 'marketing'].map((key) => (
                <div className="toggle-row" key={key}>
                  <span style={{ textTransform: 'capitalize' }}>
                    {key === 'push' ? 'Desktop Push' : key === 'marketing' ? 'Marketing Updates' : `${key} Notifications`}
                  </span>
                  <input type="checkbox" className="switch" checked={notifPrefs[key]} onChange={() => toggleNotif(key)} />
                </div>
              ))}
            </div>

            {/* 4. Danger Zone */}
            <div className="card">
              <h2>Danger Zone</h2>
              <p style={{fontSize: '0.95rem', color: '#666', marginBottom: '30px', lineHeight: '1.6'}}>
                Warning: This action will permanently remove all locally cached data and preferences from this browser.
              </p>
              <button 
                className="btn-primary" 
                style={{ backgroundColor: '#3a55ab' }}
                onClick={() => { if(window.confirm("Clear all?")) localStorage.clear(); window.location.reload(); }}
              >
                Clear Cache & Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;