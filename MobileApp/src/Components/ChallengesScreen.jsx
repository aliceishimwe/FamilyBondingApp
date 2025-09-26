import React, { useState } from "react";
import "./ChallengesScreen.css";

function ChallengesScreen() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="screen">
      {/* Header */}
      <div className="header">
        <div className="status-bar">
          <span className="time">9:41</span>
          <div className="status-icons">
          <svg width="20" height="12" viewBox="0 0 20 12">
        <rect x="0" y="9" width="3" height="3" rx="0.6" fill="#000" />
        <rect x="5" y="7" width="3" height="5" rx="0.6" fill="#000" opacity="0.85" />
        <rect x="10" y="5" width="3" height="7" rx="0.6" fill="#000" opacity="0.7" />
        <rect x="15" y="3" width="3" height="9" rx="0.6" fill="#000" opacity="0.55" />
      </svg>
      {/* wifi */}
      <svg width="20" height="12" viewBox="0 0 24 24">
        <path d="M2 8c5.5-5 14.5-5 20 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
        <path d="M6 12c3.5-3 8.5-3 12 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
        <path d="M10 16c1.5-1 3.5-1 5 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="12.5" cy="19" r="1.2" fill="#000"/>
      </svg>
      {/* battery */}
      <svg width="28" height="12" viewBox="0 0 28 12">
        <rect x="1" y="1" width="22" height="10" rx="2" fill="none" stroke="#000" strokeWidth="2"/>
        <rect x="24" y="4" width="3" height="4" rx="1" fill="#000"/>
        <rect x="3" y="3" width="18" height="6" rx="1" fill="#000"/>
      </svg>
          </div>
        </div>
        <div className="nav-icons">
          {/* home */}
<svg width="29" height="30" viewBox="0 0 24 24" fill="none">
  <path d="M3 9.5L12 3L21 9.5V20C21 20.55 20.55 21 20 21H15C14.45 21 14 20.55 14 20V15C14 14.45 13.55 14 13 14H11C10.45 14 10 14.45 10 15V20C10 20.55 9.55 21 9 21H4C3.45 21 3 20.55 3 20V9.5Z" 
        stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

          <div className="bell-container">
             <svg width="29" height="30" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8a6 6 0 10-12 0c0 7-3 7-3 7h18s-3 0-3-7"/>
        <path d="M13.73 21a2 2 0 01-3.46 0"/>
      </svg>
            <span className="green-dot"></span>
            <svg width="29" height="30" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
          </div>
          
        </div>
      </div>

      {/* Pink Content */}
      <div className="content">
        <h2 className="title">
          <span className="white-text">Challenges</span>{" "}
          <span className="black-text"><span className="white-text">1</span>/20</span>
        </h2>

        <p className="question">
          Umuryango ubaneneza ushiyirahamwe urangwa no kumvikana gukorerahamwe,
          kuganira kubibazo bihari,gufashanya, gucyina ndetse no kuzuzanya??
        </p>

        <div className="options">
          <label className="option">
             Yego
            <input
              type="radio"
              name="answer"
              checked={selected === "Yego"}
              onChange={() => setSelected("Yego")}
            />
           
          </label>
          <label className="option">
            Oya
            <input
              type="radio"
              name="answer"
              checked={selected === "Oya"}
              onChange={() => setSelected("Oya")}
            />
          </label>
        </div>

        <div className="dots">
          <span className="dot active"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </div>
    </div>
  );
}

export default ChallengesScreen;
