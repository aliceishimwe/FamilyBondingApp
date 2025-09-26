
// Custom CSS for the mobile app layout and components
import { useState } from "react";
import { ChevronRight } from 'lucide-react';
import { ChevronLeft } from 'lucide-react';
import { ChevronLeftIcon } from "lucide-react";
const customStyles = `
  body, #root {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    
  }
  .app-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }
  .mobile-frame {
    min-width:380px;
    height: 93vh;
    background: linear-gradient( #eb1695, #380323ff);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    position: relative;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  .header {
  background: transparent;   /* remove that white/gray */
}


  .status-icons {
    display: flex;
    align-items: center;
  }
  .main-title {
    color: white;
    font-size: 2.25rem;
    font-weight: bold;
    text-align: center;
    margin-top: 3rem;
    margin-bottom: 2rem;
  }
  .language-buttons {
    height: 0px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    padding: 0rem;
  }
  .language-button {
    background: rgba(255, 255, 255, 1);
    border: 1px solid transparent;
    backdrop-filter: blur(10px);
    border-radius: 1rem;
    padding: 1.25rem 1.5rem;
    color: black;
    font-size: 1.125rem;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.3s ease;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  .language-button:hover {
    background: rgba(255, 255, 255, 0.3);
  }
  .language-button.selected {
    border-color: white;
    background: rgba(255, 255, 255, 0.3);
  }
  .checkbox {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    border: 1px solid #d4145a;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s ease;
  }
  .checkbox.selected {
    background-color: white;
  }
  .checkbox .inner-circle {
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 50%;
    background-color: #d4145a;
    display: block;
  }
  .skip-button {
    position: absolute;
    bottom: 2rem;
    right: 2rem;
    color: black;
    background: white;
    font-weight: 600;
    font-size: 1rem;
    text-decoration: none;
    cursor: pointer;
    transition: transform 0.2s ease;
  }
  .skip-button:hover {
    transform: translateX(5px);
    cursor: pointer;
  }
`;

const Home2 = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const languages = ['English', 'Kinyarwanda', 'French'];

  return (
    <>
      <style>{customStyles}</style>
      <div className="app-container">
        <div className="mobile-frame">
          {/* Top status bar */}
          <div className="header">
            <span style={{color:"black"}}>9:41</span>
            <div className="status-icons">
              {/* These are placeholder divs for battery and signal icons */}
              <div style={{ marginRight: '0.25rem', height: '0.5rem', width: '0.75rem', border: '1px solid black', borderRadius: '2px' }}></div>
              <div style={{ height: '0.5rem', width: '1.25rem', backgroundColor: 'black', borderRadius: '2px' }}></div>
            </div>
          </div>

          {/* Back button */}
         <span className="back-arrow"  style={{ marginTop: '-3rem' , color: "black" , fontSize: "30px" }}>&#8592;</span>

          <h1 className="main-title"><br /></h1>

          {/* Language selection buttons */}
          <div className="language-buttons">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`language-button ${selectedLanguage === lang ? 'selected' : ''}`}
              >
                <span>{lang}</span>
                <div className={`checkbox ${selectedLanguage === lang ? 'selected' : ''}`}>
                  {selectedLanguage === lang && <div className="inner-circle"></div>}
                </div>
              </button>
            ))}
          </div>

          {/* Skip button */}
          <button className="skip-button">
            skip &gt;
          </button>
        </div>
      </div>
    </>
  );
};

export default Home2;
