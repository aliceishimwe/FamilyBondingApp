
import React, { useState } from 'react';
import { ChevronLeft, User, Phone, Lock, Eye, EyeOff } from 'lucide-react';

// Custom CSS for the mobile app layout and components
const customStyles = `
  body, #root {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    background-color: #f0f0f0;
  }
  .app-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color : #eb1695;
  }
  .mobile-frame {
    width: 100%;
    min-width: 420px; /* Standard mobile width */
    height: 100vh; /* Standard mobile height */
    background-color: #d8d8d8; /* Light gray background color from the image */
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
  }
  .header-area {
    width: 100%;
    height: 25%; /* Adjusted height to match the image */
    background: linear-gradient(#eb1695, #380323); /* Updated gradient colors */
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 1.5rem;
    position: relative;
  }
  .header-top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
  }
  .signup-title {
    color: black;
    font-size: 2rem;
    font-weight: bold;
    margin: 1.5rem;
  }
  .main-content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
  }
  .input-group {
    background: #f0f0f0; /* Light gray background for input fields */
    border-radius: 1.5rem;
    padding: 0.75rem 1.5rem;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    box-shadow: none; /* No shadow on inputs to match the image */
  }
  .input-group input {
    flex-grow: 1;
    border: none;
    outline: none;
    background: transparent; /* Transparent background to show parent's gray color */
    font-size: 1rem;
    color: black;
  }
  .input-group input::placeholder {
    color: #a0a0a0;
  }
  .input-group .icon {
    color: #a0a0a0;
  }
  .input-group .password-toggle {
    cursor: pointer;
  }
  .signup-button {
    background: #eb1695; /* Solid color as per the image */
    color: white;
    font-size: 1.25rem;
    font-weight: bold;
    padding: 1rem;
    border-radius: 1.5rem;
    border: none;
    width: 100%;
    margin-top: 2rem;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    transition: background 0.3s ease;
  }
  .signup-button:hover {
    background: #d4145a;
  }
`;

const Home5 = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordShown(!confirmPasswordShown);
  };

  return (
    <>
      <style>{customStyles}</style>
      <div className="app-container">
        <div className="mobile-frame">
          
            <div className="header-top-bar">
              <ChevronLeft size={24} color="white" />
              <span>9:41</span>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {/* Placeholder for signal icon */}
                <div style={{ height: '0.5rem', width: '0.75rem', border: '1px solid white', borderRadius: '2px' }}></div>
                {/* Placeholder for battery icon */}
                <div style={{ height: '0.5rem', width: '1.25rem', backgroundColor: 'white', borderRadius: '2px' }}></div>
              </div>
            </div>
         <div className="signup-area">
          <div className="signup-title">Signup</div>
          <div className="main-content">
            <div className="input-group">
              <User size={20} className="icon" />
              <input type="text" placeholder="Full Names" />
            </div>

            <div className="input-group">
              <Phone size={20} className="icon" />
              <input type="tel" placeholder="Phone number" />
            </div>

            <div className="input-group">
              <Lock size={20} className="icon" />
              <input
                type={passwordShown ? 'text' : 'password'}
                placeholder="Password"
              />
              <span className="password-toggle" onClick={togglePasswordVisibility}>
                {passwordShown ? <EyeOff size={20} className="icon" /> : <Eye size={20} className="icon" />}
              </span>
            </div>

            <div className="input-group">
              <Lock size={20} className="icon" />
              <input
                type={confirmPasswordShown ? 'text' : 'password'}
                placeholder="Confirm Password"
              />
              <span className="password-toggle" onClick={toggleConfirmPasswordVisibility}>
                {confirmPasswordShown ? <EyeOff size={20} className="icon" /> : <Eye size={20} className="icon" />}
              </span>
            </div>

            <button className="signup-button" onClick={() => console.log('Signup clicked!')}>
              Signup
            </button>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Home5;
