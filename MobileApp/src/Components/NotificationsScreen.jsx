import React from "react";
import "./NotificationsScreen.css";
import { ChevronDown } from 'lucide-react';

function NotificationsScreen() {
  const notifications = [
    {
      id: 1,
      name: "Mutesi",
      message: "Success to",
      points: "300PTS",
      extra: "About Quize",
      avatar: "🧑🏽‍🦱",
    },
    {
      id: 2,
      name: "Mama",
      message: "you have",
      points: "00PTS",
      extra: "your failed Please try again",
      avatar: "👩🏽‍🦳",
    },
    {
      id: 3,
      name: "Dady",
      message: "please try to finishing all the quition",
      points: "",
      extra: "",
      avatar: "👨🏽",
    },
    {
      id: 4,
      name: "Karim",
      message: "you have to updating your challenges and answering all quitions",
      points: "",
      extra: "",
      avatar: "👨🏽‍🦱",
    },
  ];

  return (
    <div className="screen">
      {/* Header */}
      <div className="header">
        <div className="status-bar">
          <span className="time">9:41</span>
          <div className="status-icons">
            <span>📶</span>
            <span>📡</span>
            <span>🔋</span>
          </div>
        </div>
        <div className="nav-icons">
          <span className="nav-icon">🏠</span>
          <div className="bell-container">
            <span className="nav-icon">🔔</span>
            {/* <span className="green-dot"></span> */}
            <span className="nav-icon">👤</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="content">
        <h2 className="notif-title">Notification</h2>

        {notifications.map((n) => (
          <div className="notif-card" key={n.id}>
            <div className="avatar">{n.avatar}</div>
            <div className="notif-text">
              <span className="dim">{n.message} </span>
              <strong className="black">{n.name}</strong>{" "}
              {n.points && (
                <>
                  <span className="dim">you have </span>
                  <strong className="black">{n.points}</strong>{" "}
                </>
              )}
              <span className="dim">{n.extra}</span>
            </div>
          </div>
        ))}

        <div className="arrow-down"><ChevronDown className='ChevronDown' size={34} /></div>
      </div>
    </div>
  );
}

export default NotificationsScreen;
