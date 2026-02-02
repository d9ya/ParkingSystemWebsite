import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function RegisterLogin() {
  const [isActive, setIsActive] = useState(false);
  const [showPasswordSignUp, setShowPasswordSignUp] = useState(false);
  const [showPasswordSignIn, setShowPasswordSignIn] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotError, setForgotError] = useState("");

  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    remember: false,
  });

  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [signUpErrors, setSignUpErrors] = useState({});
  const [signInErrors, setSignInErrors] = useState({});

  useEffect(() => {
    const savedSignIn = JSON.parse(localStorage.getItem("signin"));
    if (savedSignIn) setSignInData(savedSignIn);
    const savedSignUp = JSON.parse(localStorage.getItem("signup"));
    if (savedSignUp) setSignUpData(savedSignUp);
  }, []);

  const handleChange = (e, type) => {
    const { name, value, type: inputType, checked } = e.target;
    if (type === "signup") {
      setSignUpData({ ...signUpData, [name]: inputType === "checkbox" ? checked : value });
    } else if (type === "signin") {
      setSignInData({ ...signInData, [name]: inputType === "checkbox" ? checked : value });
    } else if (type === "forgot") {
      setForgotEmail(value);
    }
  };

  const validate = (type) => {
    let errors = {};
    if (type === "signup") {
      if (!signUpData.name.trim()) errors.name = "Name is required";
      if (!signUpData.email) errors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(signUpData.email)) errors.email = "Email is invalid";
      if (!signUpData.password) errors.password = "Password is required";
      else if (signUpData.password.length < 6) errors.password = "Password must be at least 6 characters";
      setSignUpErrors(errors);
    } else if (type === "signin") {
      if (!signInData.email) errors.email = "Email is required";
      if (!signInData.password) errors.password = "Password is required";
      setSignInErrors(errors);
    }
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e, type) => {
    e.preventDefault();
    if (validate(type)) {
      if (type === "signup") {
        alert("Sign Up Successful!");
        if (signUpData.remember) localStorage.setItem("signup", JSON.stringify(signUpData));
        else localStorage.removeItem("signup");
      } else {
        alert("Sign In Successful!");
        if (signInData.remember) localStorage.setItem("signin", JSON.stringify(signInData));
        else localStorage.removeItem("signin");
      }
    }
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (!forgotEmail) {
      setForgotError("Email is required");
      return;
    } else if (!/\S+@\S+\.\S+/.test(forgotEmail)) {
      setForgotError("Email is invalid");
      return;
    }
    setForgotError("");
    alert(`Password reset link sent to ${forgotEmail}`);
    setShowForgotModal(false);
    setForgotEmail("");
  };

  return (
    <>
    <div className="logo">
    <img src="/logo.png" alt="logo" />
    </div>
      <style>{`
        * { box-sizing: border-box; font-family: "Poppins", sans-serif; }
        body { 
            background: url('background.png') no-repeat center center/cover; 
            min-height: 100vh; 
            display: flex; 
            justify-content: center; 
            align-items: center; 
            }
        .logo {
            position: absolute;
            top: 20px;
            left: 20px;
            z-index: 200; /* make sure it's above the background */
        }

        .logo img {
            height: 160px; /* adjust as needed */
            width: auto;
        }
        .container { background: #fff; border-radius: 20px; box-shadow: 0 14px 28px rgba(0,0,0,0.25),0 10px 10px rgba(0,0,0,0.22); position: relative; overflow: hidden; width: 900px; max-width: 100%; min-height: 520px; }
        .form-container { position: absolute; top: 0; height: 100%; transition: transform 0.6s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease; }
        .sign-in-container { left: 0; width: 50%; z-index: 2; }
        .container.right-panel-active .sign-in-container { transform: translateX(100%); }
        .sign-up-container { left: 0; width: 50%; opacity: 0; z-index: 1; }
        .container.right-panel-active .sign-up-container { transform: translateX(100%); opacity: 1; z-index: 5; animation: show 0.6s; }
        @keyframes show { 0%, 49.99% { opacity: 0; z-index:1; } 50%,100% { opacity:1; z-index:5; } }
        form { background: #ffffff; display: flex; flex-direction: column; padding: 0 50px; height: 100%; justify-content: center; align-items: center; text-align: center; }
        .form-title { color: #90cde9; margin-bottom: 10px; }
        .subtitle { font-size: 12px; color: #999; margin-bottom: 10px; }
        input { background: #f2f6f5; border: none; padding: 12px 15px; margin: 8px 0; width: 100%; border-radius: 8px; color: black; }
        button { border-radius: 20px; border: 1px solid #90cde9; background: #90cde9; color: #fff; font-size: 12px; font-weight: bold; padding: 12px 45px; letter-spacing: 1px; text-transform: uppercase; transition: transform 80ms ease-in; cursor: pointer; margin-top: 10px; }
        button.ghost { background: transparent; border-color: #fff; }
        button:active { transform: scale(0.95); }
        .overlay-container { position: absolute; top: 0; left: 50%; width: 50%; height: 100%; overflow: hidden; transition: transform 0.6s ease-in-out; z-index: 100; }
        .container.right-panel-active .overlay-container { transform: translateX(-100%); }
        .overlay { background: linear-gradient(to right, #acd2e4, #90cde9); color: #ffffff; position: relative; left: -100%; height: 100%; width: 200%; transform: translateX(0); transition: transform 0.6s ease-in-out; }
        .container.right-panel-active .overlay { transform: translateX(50%); }
        .overlay-panel { position: absolute; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 0 40px; text-align: center; top: 0; height: 100%; width: 50%; transition: transform 0.6s ease-in-out; }
        .overlay-left { transform: translateX(-20%); }
        .container.right-panel-active .overlay-left { transform: translateX(0); }
        .overlay-right { right: 0; }
        h1 { font-weight: bold; margin: 0; }
        p { font-size: 14px; font-weight: 300; line-height: 20px; margin: 20px 0 30px; }
        .error-message { color: red; font-size: 12px; margin-top: -5px; margin-bottom: 5px; width: 100%; text-align: left; }
        .password-wrapper { position: relative; width: 100%; }
        .password-wrapper span { position: absolute; right: 10px; top: 12px; cursor: pointer; color: black; }
        .remember-me-custom {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: black;
          cursor: pointer;
          user-select: none;
        }
        .remember-me-custom input[type="checkbox"] {
            appearance: none;
            -webkit-appearance: none;
            width: 14px;       /* small but visible */
            height: 14px;      /* small but visible */
            border: 1.5px solid #90cde9;
            border-radius: 3px; /* slightly rounded */
            position: relative;
            cursor: pointer;
            outline: none;
            vertical-align: middle;
            margin-right: 6px;
            transition: all 0.2s ease-in-out;
          }
        .remember-me-custom input[type="checkbox"]:checked {
          background-color: #90cde9;
          border-color: #90cde9;
        }
        .remember-me-custom input[type="checkbox"]:checked::after {
          content: '';
          position: absolute;
          left: 3px;   /* adjust to center the checkmark */
          top: 1px;
          width: 4px;
          height: 7px;
          border: solid white;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }
        .remember-forgot { display: flex; justify-content: space-between; align-items: center; width: 100%; margin-top: 10px; font-size: 12px; }
        .remember-forgot a { font-size: 12px; color: #09221e; text-decoration: none; cursor: pointer; }
        /* Modal */
        .modal { position: fixed; top: 0; left:0; width:100%; height:100%; background: rgba(0,0,0,0.5); display:flex; justify-content:center; align-items:center; z-index:9999; }
        .modal-content { background:#5fa89d; padding:30px; border-radius:10px; width:300px; text-align:center; position:relative; }
        .modal-content h2 { margin-bottom:15px; }
        .modal-content input { margin-bottom:10px; width:100%; }
        .modal-content button { width:100%; color: #ffffff; background: #fff; border: none; }
        .close-btn { position:absolute; top:10px; right:15px; cursor:pointer; font-weight:bold; font-size:16px; }
      `}</style>

      <div className={`container ${isActive ? "right-panel-active" : ""}`}>

        {/* SIGN UP */}
        <div className="form-container sign-up-container">
          <form onSubmit={(e) => handleSubmit(e, "signup")}>
            <h1 className="form-title">Create Account</h1>
            <span className="subtitle">or use your email for registration</span>

            <input type="text" placeholder="Name" name="name" value={signUpData.name} onChange={(e) => handleChange(e, "signup")} />
            {signUpErrors.name && <p className="error-message">{signUpErrors.name}</p>}

            <input type="email" placeholder="Email" name="email" value={signUpData.email} onChange={(e) => handleChange(e, "signup")} />
            {signUpErrors.email && <p className="error-message">{signUpErrors.email}</p>}

            <div className="password-wrapper">
              <input type={showPasswordSignUp ?  "text" : "password"} placeholder="Password" name="password" value={signUpData.password} onChange={(e) => handleChange(e, "signup")} />
              <span onClick={() => setShowPasswordSignUp(!showPasswordSignUp)}>{showPasswordSignUp ? <FaEyeSlash /> : <FaEye />}</span>
            </div>
            {signUpErrors.password && <p className="error-message">{signUpErrors.password}</p>}

            <div className="remember-forgot">
              <label className="remember-me-custom">
                <input type="checkbox" name="remember" checked={signUpData.remember} onChange={(e) => handleChange(e, "signup")} />
                Remember Me
              </label>
              <a onClick={() => setShowForgotModal(true)}>Forgot Password?</a>
            </div>

            <button type="submit">Sign Up</button>
          </form>
        </div>

        {/* SIGN IN */}
        <div className="form-container sign-in-container">
          <form onSubmit={(e) => handleSubmit(e, "signin")}>
            <h1 className="form-title">Sign In</h1>
            <span className="subtitle">or use your account</span>

            <input type="email" placeholder="Email" name="email" value={signInData.email} onChange={(e) => handleChange(e, "signin")} />
            {signInErrors.email && <p className="error-message">{signInErrors.email}</p>}

            <div className="password-wrapper">
              <input type={showPasswordSignIn ? "text" : "password"} placeholder="Password" name="password" value={signInData.password} onChange={(e) => handleChange(e, "signin")} />
              <span onClick={() => setShowPasswordSignIn(!showPasswordSignIn)}>{showPasswordSignIn ? <FaEyeSlash /> : <FaEye />}</span>
            </div>
            {signInErrors.password && <p className="error-message">{signInErrors.password}</p>}

            <div style={{ width: "100%", marginTop: "10px" }}>
              <label className="remember-me-custom">
                <input type="checkbox" name="remember" checked={signInData.remember} onChange={(e) => handleChange(e, "signin")} />
                Remember Me
              </label>
            </div>

            <button type="submit">Sign In</button>
          </form>
        </div>

        {/* OVERLAY */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected, please login</p>
              <button className="ghost" onClick={() => setIsActive(false)}>Sign In</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your details and start your journey</p>
              <button className="ghost" onClick={() => setIsActive(true)}>Sign Up</button>
            </div>
          </div>
        </div>

        {/* FORGOT PASSWORD MODAL */}
        {showForgotModal && (
          <div className="modal">
            <div className="modal-content">
              <span className="close-btn" onClick={() => setShowForgotModal(false)}>×</span>
              <h2>Reset Password</h2>
              <input type="email" placeholder="Enter your email" value={forgotEmail} onChange={(e) => handleChange(e, "forgot")} />
              {forgotError && <p className="error-message">{forgotError}</p>}
              <button onClick={handleForgotSubmit}>Send Reset Link</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}