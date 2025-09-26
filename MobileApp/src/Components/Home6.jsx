import React, { useState } from "react";
import "./QuizPage.css";
import { Home, Bell, User } from "lucide-react";

function QuizPage() {
  const [selected, setSelected] = useState("B");

  const answers = [
    { id: "A", text: "Gufasha abandi mu byo bakeneye" },
    { id: "B", text: "Kuganira kenshi tugahana amakuru" },
    { id: "C", text: "Gutanga ibyishimo n’umutuzo" },
    { id: "D", text: "Kwihanganirana mu makosa" },
  ];

  return (
    <div className="quiz-wrapper">
      {/* HEADER SECTION */}
      <div className="header-section">
        <div className="status-bar">
          <span className="time">9:41</span>
          <div className="status-icons">
            <span>📶</span>
            <span>📡</span>
            <span>🔋</span>
          </div>
        </div>
        <div className="nav-icons">
          <Home size={22} color="#000" />
          <div className="right-icons">
            <div className="bell-wrapper">
              <Bell size={22} color="#000" />
              <span className="notification-dot"></span>
            </div>
            <User size={22} color="#000" />
          </div>
        </div>
      </div>

      {/* MAIN SECTION */}
      <div className="main-section">
        <p className="quiz-title">Family Problems Quiz</p>
        <p className="quiz-question-number">
          <span className="question-white">Question</span>{" "}
          <span className="number-highlight">01</span>
          <span className="total-black">/20</span>
        </p>
        <p className="quiz-question">
          Ni ikihe kintu gikomeye kigira uruhare mu kubaka urugo rwunze ubumwe?
        </p>

        {answers.map((ans) => (
          <button
            key={ans.id}
            onClick={() => setSelected(ans.id)}
            className="answer-btn"
          >
            <span className="answer-text">
              {ans.id}. {ans.text}
            </span>
            <span
              className={`radio-circle ${
                selected === ans.id ? "radio-selected" : ""
              }`}
            >
              {selected === ans.id && <span className="radio-dot"></span>}
            </span>
          </button>
        ))}

        <div className="pagination">
          <span className="dot blue"></span>
          <span className="dot white"></span>
          <span className="dot white"></span>
          <span className="dot white"></span>
        </div>
      </div>
    </div>
  );
}

export default QuizPage;
