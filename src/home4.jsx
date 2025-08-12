import React, { useState } from 'react';
import './home4.css';

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="mobile-wrapper">
      <div className="mobile-screen">
        <div className="top-bar">
          <span className="back-arrow">&#8592;</span>
          <div className="status-icons">
            <span>9:41</span>
            <span>📶 📡 🔋</span>
          </div>
        </div>

        <div className="form-box">
          <h2>Signup</h2>

          <div className="input-group">
            <span className="icon">👤</span>
            <input type="text" placeholder="Full Names" />
          </div>

          <div className="input-group">
            <span className="icon">📱</span>
            <input type="text" placeholder="Phone number" />
          </div>

          <div className="input-group">
            <span className="icon">🔒</span>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
            />
            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? '🙈' : '👁️'}
            </span>
          </div>

          <div className="input-group">
            <span className="icon">🔒</span>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
            />
            <span
              className="eye-icon"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? '🙈' : '👁️'}
            </span>
          </div>

          <button className="signup-button">Signup</button>
        </div>
      </div>
    </div>
  );
}
