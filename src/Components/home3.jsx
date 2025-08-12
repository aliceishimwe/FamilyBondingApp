
import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

// Custom CSS for the mobile app layout and components
const customStyles = `
  body, #root {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    background-color: #f0f0f0; /* Outer background color */
  }
  .app-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }
  .mobile-frame {
    width: 100%;
    min-width: 380px; /* Standard mobile width */
    height: 90vh; /* Standard mobile height */
    background: linear-gradient( #eb1695, #380323ff); /* Gradient from your image */
     border-radius: 1rem;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    position: relative;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color:  black;
    font-size: 0.875rem;
    padding: 1rem 0;
  }
  .status-icons {
    display: flex;
    align-items: center;
  }
  .main-content {
    flex-grow: 1; /* Allows content to take available space */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between; /* Distributes space between elements */
    padding-bottom: 2rem; /* Space for the button */
  }
  .welcome-circle {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 16rem; /* Adjust size to match image */
    height: 16rem; /* Adjust size to match image */
    background: transpalent;
    border-radius: 50%;
    border: 20px solid white;
    text-align: center;
    padding: 1rem;
    box-sizing: border-box;
    margin-top: 5rem; /* Position from top */
  }
  .welcome-title {
    color: white;
    font-size: 1.8rem; /* Adjust font size */
    font-weight: bold;
    line-height: 1.2;
  }
  .welcome-subtitle {
    color: white;
    font-size: 0.875rem;
    margin-top: 0.5rem;
  }
  .illustration-area {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-end; /* Align to the bottom */
    position: relative; /* For absolute positioning of button */
    padding-bottom: 4rem; /* Space for the button */
  }
  .continue-button {
    position: absolute;
    bottom: 0; /* Position at the bottom of the illustration area */
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 3rem; /* Rounded pill shape */
    padding: 0.75rem 1.5rem;
    color: white;
    font-size: 1.125rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border: none;
    cursor: pointer;
    transition: transform 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  .continue-button:hover {
    transform: translateY(-3px);
  }
    .arrow-group {
    display: flex;
    align-items: center;
    gap: 0px; /* No gap between the arrows */
  }
`;

const Home3 = () => {
  // We'll manage screens if you want to add more pages later.
  // For now, we'll just show the welcome screen.
  const [currentScreen, setCurrentScreen] = useState('welcome');

  const renderScreenContent = () => {
    if (currentScreen === 'welcome') {
      return (
        <div className="main-content">
          <div className="welcome-circle">
            <h1 className="welcome-title">
              Welcome to <br /> Inkingi App
            </h1>
            <p className="welcome-subtitle">where Joy brings Togetherness</p>
          </div>

          <div className="illustration-area">
            {/* SVG for the two people illustration */}
            <svg width="250" height="250" viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', bottom: '0' }}>
              {/* Parent 1 (left) */}
              <rect x="50" y="100" width="40" height="150" fill="#2d2d2d" />
              <rect x="55" y="100" width="30" height="20" fill="#f5f5f5" />
              <circle cx="70" cy="95" r="15" fill="#f5f5f5" />

              {/* Parent 2 (right) */}
              <rect x="160" y="100" width="40" height="150" fill="#2d2d2d" />
              <rect x="165" y="100" width="30" height="20" fill="#f5f5f5" />
              <circle cx="180" cy="95" r="15" fill="#f5f5f5" />
            </svg>

            <button className="continue-button" onClick={() => console.log('Continue clicked!')}>
              <span>Continue</span>
               <span className="arrow-group"> {/* Grouping the arrows */}
                <ChevronRight size={24} />
                <ChevronRight size={24} />
              </span>
            </button>
          </div>
        </div>
      );
    }
    // You can add other screens here later if needed
    return null;
  };

  return (
    <>
      <style>{customStyles}</style> {/* Inject custom styles */}
      <div className="app-container">
        <div className="mobile-frame">
          {/* Top status bar (9:41, signal, battery) */}
          <div className="header">
            <span>9:41</span>
            <div className="status-icons">
              {/* Placeholder for signal icon */}
              <div style={{ marginRight: '0.25rem', height: '0.5rem', width: '0.75rem', border: '1px solid black', borderRadius: '2px' }}></div>
              {/* Placeholder for battery icon */}
              <div style={{ height: '0.5rem', width: '1.25rem', backgroundColor: 'black', borderRadius: '2px' }}></div>
            </div>
          </div>
          {renderScreenContent()}
        </div>
      </div>
    </>
  );
};

export default Home3;



