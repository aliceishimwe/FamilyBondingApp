import React from "react";
import "./ActivitiesScreen.css";

function StatusIcons() {
  return (
    <div className="status-right" aria-hidden>
      {/* cellular */}
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
  );
}

function BellIcon() {
  return (
    <div className="bell-wrap" aria-label="Notifications">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8a6 6 0 10-12 0c0 7-3 7-3 7h18s-3 0-3-7"/>
        <path d="M13.73 21a2 2 0 01-3.46 0"/>
      </svg>
      <span className="notif-dot" />
    </div>
  );
}

function BackIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>

  );
}

function ActivitiesScreen() {
  const items = [
    {
      id: 1,
      title: "Educational Sessions and Skill-Building",
      emoji: "👨‍👩‍👧‍👦"
    },
    {
      id: 2,
      title: "Family Meetings for Problem Solving",
      emoji: "🗣️"
    },
    {
      id: 3,
      title: "Home Maintenance Rotations",
      emoji: "🧹"
    }
  ];

  return (
    <div className="phone">
      {/* Header (only bottom-left curved) */}
       <div className="header">
        <div className="status-row">
          <span className="time">9:41</span>
          <StatusIcons />
        </div>

        <div className="nav-row">
          <BackIcon />
          <div className="nav-right">
            <BellIcon />
            <UserIcon />
          </div>
        </div>

        {/* Title at bottom of header */}
        <h1 className="page-title">Family Daily Activities</h1>
      </div>

      {/* Content below (pink gradient), tucked under header */}
      <div className="content">
        

        <div className="cards">
          {items.map((it) => (
            <div className="card" key={it.id}>
              <div className="medallion">
                <div className="medallion-inner">{it.emoji}</div>
              </div>
              <div className="card-body">
                <span className="green-pill">{it.title}</span>
              </div>
            </div>
          ))}
        </div>

        {/* decorative footer blob */}
   {/* decorative footer blob */}
<svg className="footer-blob" viewBox="0 0 400 140" preserveAspectRatio="none">
  <path
    d="M0,20 
       C60,60 90,0 140,40 
       C170,65 220,65 260,60 
       C300,55 360,70 400,50 
       L400,140 L0,140 Z"
    fill="#a3b7a3"
  />
</svg>

      </div>
    </div>
  );
}

export default ActivitiesScreen;
