

// App.jsx
import { React,  useState , useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "./AuthProvider.jsx";
import { auth } from "../../BackEnd/firebase.js";
import { db } from "../../BackEnd/firebase.js"; // Firestore

// ✅ Import backend services




import {
  Home,
  Bell,
  User,
  ChevronLeft,
  Settings,
  Shield,
  LogOut,
  MapPin,
  Clipboard,
  ShieldAlert,
  HelpCircle,
  Eye,
  EyeOff,
  Phone,
  Lock,
  ChevronRight,
  ChevronDown,
  ChevronsDown
} from "lucide-react";



// === Keep all your CSS from before ===
const customStyles = ` 
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
  
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
  
  .top-bar {
    background: linear-gradient(to bottom, #e00085, #d10078);
    height: 120px;
    padding: 20px;
    color: black;
    position: relative;
    z-index: 1;
  }
  
  .back-arrow {
    font-size: 24px;
    cursor: pointer;
  }
  
  .status-icons {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 14px;
    color: black;
  }
  
  .form-box {
    position: absolute;
    top: 115px;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #d3d3d3;
    border-top-left-radius: 40px;
    border-top-right-radius: 40px;
    padding: 30px 10px;
    overflow-y: auto;
    z-index: 2;
  }
  
  .form-box h2 {
    margin-bottom: 20px;
    font-size: 28px;
    color: black;
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
  .input-group .icon {
    color: #a0a0a0;
  }
  
  .eye-icon {
    position: absolute;
    right: 70px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    font-size: 18px;
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

  /* Home2 & Home3 Styles */
  .mobile-frame-pink {
    min-width:380px;
    height: 94vh;
    background: linear-gradient( #eb1695, #380323ff);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    position: relative;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  .headerr {
    background: transparent;
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
    color: #232222ff;
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
    height: 50px;
    width: 120px;
    border: none;
    border-radius: 8px;
    position: absolute;
    bottom: 5rem;
    right: 2rem;
    color: #251a1aff;
    background: white;
    font-weight: 600;
    font-size: 18px;
    text-decoration: none;
    cursor: pointer;
    transition: transform 0.2s ease;
  }
      .skip-button:hover {
    transform: translateX(5px);
    cursor: pointer;
  }
  /* Home3 styles */
  .header-3 {
    background: transparent;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .main-content {
  flex-grow: 1; /* Allows content to take available space */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between; /* Distributes space between elements */
    padding-bottom: 2rem;
    
  }

  .main-content h1 {
    font-size: 2rem;
    color: white;
    margin: 0;
  }
  
  .main-content p {
    font-size: 1rem;
    color: white;
    margin-top: 0.5rem;
  }
      .welcome-circle {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 22.1rem; /* Adjust size to match image */
    height: 22.1rem; /* Adjust size to match image */
    background: transpalent;
    border-radius: 50%;
    text-align: center;
    padding: 3rem;
    box-sizing: border-box;
    margin-top: 7rem; /* Position from top */
              border: 20px solid rgba(255, 255, 255, 0.25);
            border-top-color: #fff;
            border-bottom-color: #fff;
            animation: spin 2s linear 0.6s;
            box-shadow: 0 2px  30px 2px rgba(248, 248, 248, 1);
            transition: 2s ease;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
            .welcome-circle:hover{
            background: linear-gradient(to bottom right in srgb, #00c4cc, #5a32fa, #7d2ae8);
            transition:  2s ease; 
            cursor: pointer;
            }
  .continue-button {
    position: absolute;
    width: 210px;
    height: 55px;
    bottom: 0; /* Position at the bottom of the illustration area */
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 3rem; /* Rounded pill shape */
    padding: 0.90rem 1.5rem;
    color: #fff;
    font-size: 1.40rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border: none;
    cursor: pointer;
    transition: transform 0.4s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .continue-button:hover {
  background: linear-gradient(to bottom right in srgb, #379c9f68, #5031ca67, #7c2ae8f3);
    font-weight: bold;
    transform: translateX(1rem)
    
  }
    .continue-loading{
                text-shadow: 0 3px 10px rgba(0,0,0,0.25);
            animation: fadePulse 1.4s ease-in-out infinite;
          }
          @keyframes fadePulse {
            0%,100% { opacity: 0.3; }
            50% { opacity: 1; }
          }
  
  .arrow-group {
    display: flex;
   
  }
  
  .arrow-group svg {
    width: 20px;
    height: 20px;
  }
  
  /* ActivitiesScreen styles */
  .phone>*{ 
    width:100%; 
    max-width:400px;
    margin: 0 auto;
  }

  .header-activities {
  height: 110px;
  background:#D9D9D9;
  border-bottom-left-radius:50px;
  border-bottom-right-radius:50px;
  padding:8px 16px 15px;
  position:relative;
  z-index:2; /* above pink */
  }

  .status-row{
    display:flex; justify-content:space-between; align-items:center;
  }

  .time { 
    font-weight:700; 
    font-size:13px; 
    color:#000; 
    letter-spacing:.2px;
  }

  .status-right{ 
    display:flex; 
    align-items:center; 
    gap:6px; 
  }

  .nav-row {
    display:flex; 
    justify-content:space-between; 
    align-items:center;
    margin-top:10px;
  }

  .nav-right { 
    display:flex; 
    align-items:center; 
    gap:18px; 
  }
    .bell-wrap{ position:relative; }
.notif-dot{
  position:absolute; width:8px; height:8px; background:#22c55e;
  border-radius:999px; top:-1px; right:4px;
}

  .page-title {
    text-align: center;
    position: absolute;
    left: 50%;
    bottom: 5px;
    transform: translateX(-50%);
    margin: 0;
    font-size: 15px;
    font-weight: 800;
    font-family: Georgia, 'Times New Roman', serif;
    color: #1b1b1b;
  }

  .content-activities {
    background: linear-gradient(180deg, rgba(235,22,149,1) 0%, rgba(56,3,35,1) 100%);
    position:relative;
    z-index:1;
    margin-top:-46px;
    padding:18px 16px 10px;
    min-height: calc(110vh - 150px);
   overflow:hidden; 
  }

  .cards { 
    display:flex;
    flex-direction:column;
    gap:30px; 
    margin-top: 80px;
  }

  .card {
    display:flex; 
    align-items:center; 
    gap:14px;
    background:#EDEDED;
    border-radius:16px;
    padding:12px 14px;
    box-shadow:0 4px 14px rgba(0,0,0,.15) inset, 0 2px 10px rgba(0,0,0,.08);
  }

  .medallion {
    width:48px; 
    height:48px; 
    border-radius:50%;
    background:#2c2f3a;
    display:flex; 
    align-items:center; 
    justify-content:center;
    box-shadow:0 0 0 4px #2c2f3a, 0 0 0 8px #fff;
  }

  .medallion-inner {
    width:40px; 
    height:40px; 
    border-radius:50%;
    background:#fff;
    font-size:28px;
    display:flex; 
    align-items:center; 
    justify-content:center;
  }

  .card-body {
    display:flex; 
    flex-direction:column; 
    gap:6px;
  }

  .green-pill {
    background:#167a2f;
    color:#fff;
    padding:3px 10px;
    border-radius:999px;
    font-size:12px;
    font-weight:bold;
    align-self:flex-start;
  }

  .card-title {
    font-size:16px; 
    font-weight:bold;
  }

  .footer-blob {
    position:absolute; 
    bottom:-10px; 
    left:0; 
    width:100%; 
    height:140px; 
    z-index: -1; 
  }
  .User:hover{
   cursor:pointer;
  }
  
  /* Challenges Screen styles */
  .screen {
    width: 100%;
    max-width: 480px;
    margin: auto;
    background-color: #000;
    height: 100vh;
    overflow: hidden;
  }

  .header-challenges {
    height: 15vh;
    background: #d9d9d9;
    border-bottom-right-radius: 80px;
    padding: 10px 15px 20px;
    position: relative;
    z-index: 2;
  }
  
  .status-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    color: #000;
  }

.nav-icons {
  display: flex;
  justify-content: space-between;
  margin-top: 36px;
}

.nav-icon {
  font-size: 24px;
  color: black;
  cursor: pointer;
}

  .bell-container {
    position: relative;
    display: flex;
    gap: 10px;
    margin-right: 15px;
  }

  .content-challenges {
  background: linear-gradient(to bottom, #cc197c, #86014c);
  /* border-top-left-radius: 30px;
  border-top-right-radius: 30px; */
  margin-top: -80px; /* Overlap effect */
  padding: 20px;
  min-height: calc(100vh - 80px);
  }
  .btns{
   display: flex;
   justify-content: space-between;
  }
  .next-button{
   background-color: transparent;
  }
  
  .title {
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    margin-top: 100px;
  }

.white-text {
 color: rgb(221, 216, 216);
  font-weight: bold;
}

  .black-text {
  color: rgb(49, 49, 49);
 }

.questionChallenge {
  color: rgb(221, 216, 216);
  margin-top: 30px;
  font-size: 35px;
  line-height: 1.3;
  font-weight: 400;
}
  
.options {
  display: flex;
  gap: 90px;
  margin-top: 20px;
}

.option {
  color:rgb(221, 216, 216);
  font-size: 18px;
}
.option input[type="radio"] {
  margin-right: 5px;
}

  .option input[type="radio"] + span::before {
    content: '';
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid #ccc;
    background-color: #f0f0f0;
    margin-right: 10px;
  }

  .option input[type="radio"]:checked + span::before {
    background-color: #86014c;
    border-color: #86014c;
  }
  .option:hover{
  cursor: pointer;
  }

  .dots {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 30px;
  }

  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #fff;
    opacity: 0.5;
  }

  .dot.active {
    background-color: #e00085;
    opacity: 1;
  }

  .btns{
    display: flex;

  }
   
  .next-button-back, .next-button-next  {
    background: transparent;
    color: white;
    padding: 15px 30px;
    border-radius: 8px;
    border: none;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    margin-top: 20px;
    align-self: center;
    box-shadow: 0 4px 6px rgba(241, 241, 241, 0.45);
  }
  .next-button-back:hover{
   transition: transform 0.2s ease;
  box-shadow: 0 4px 6px rgba(255, 255, 255, 1);
  }
  .next-button-back:hover {
    font-weight: bold;
    transform: translateX(-1rem)
  }
    .next-button-next:hover{
   transition: transform 0.2s ease;
  box-shadow: 0 4px 6px rgba(255, 255, 255, 1);
  }
  .next-button-next:hover {
    font-weight: bold;
    transform: translateX(1rem)
  }

  .btns{
    display: flex;
    justify-content: space-between;
    padding:10px;
    margin-top: 40px;
  }
  .btns:hover{
  cursor:pointer;
  }
  /* Notifications Screen styles */
  .screen {
  width: 100%;
  max-width: 480px;
  margin: auto;
  background-color: #000;
  height: 100vh;
  overflow: hidden;
}
  .headernoti {
  height: 15vh;
  background: #d9d9d9;
  border-bottom-left-radius: 80px;
  padding: 10px 15px 20px;
  position: relative;
  z-index: 2;
}

.status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #000;
}

.status-icons {
  display: flex;
  gap: 5px;
}

.nav-icons {
  display: flex;
  justify-content: space-between;
  margin-top: 34px;
}

.nav-icon {
  font-size: 24px;
  color: black;
  cursor: pointer;
}

.bell-container {
  position: relative;
  display: flex;
  gap: 10px;
  margin-right: 15px;
}
  .contentnoti {
  background: linear-gradient(to bottom, #bd1471, #730141);
  margin-top: -80px; /* Overlap */
  padding: 20px;
  min-height: calc(100vh - 80px);
}
  .notif-title {
  text-align: center;
  color: black;
  font-size: 30px;
  margin-top: 110px;
  margin-bottom: 40px;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  letter-spacing: 4px;
  line-height: 16px;
  }
  
  .notif-card {
  display: flex;
  align-items: center;
  background: #f2f2f2;
  border-radius: 40px;
  padding: 10px 15px;
  margin-bottom: 15px;
  }
  
  .notif-card .avatar {
      background: white;
  border-radius: 50%;
  font-size: 30px;
  padding: 8px;
  margin-right: 12px;
  }
  
  .notif-text {
  font-size: 14px;
  flex: 1;
  line-height: 1.4;
  }
  
  .dim {
  color: #4f4c4cff;
  }
  
  .black {
  color: black;
  font-weight: bold;
  }
  
.arrow-down {
  text-align: center;
  margin-top: 20px;
  font-size: 32px;                 /* adjust arrow size if it's text/svg */
  color: #ff6b81;                  /* arrow color */
  animation: bounce 1.5s infinite ease-in-out, glow 2s infinite ease-in-out;
}

.arrow-down:hover {
  cursor: pointer;
  animation-play-state: paused;    /* pause both animations on hover */
}

/* 🔹 Bounce up and down */
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(12px);
  }
}

/* 🔹 Glow / pulse effect */
@keyframes glow {
  0%, 100% {
    text-shadow: 0 0 4px rgba(255, 107, 129, 0.6),
                 0 0 12px rgba(255, 107, 129, 0.5);
  }
  50% {
    text-shadow: 0 0 8px rgba(255, 107, 129, 0.9),
                 0 0 20px rgba(255, 107, 129, 0.8);
  }
}


  /* Quiz Pages styles */
  .quiz-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #000;
    font-family: sans-serif;
    min-height: 100vh;
  }

  .header-section {
    background: #d9d9d9;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
    padding: 40px 16px 14px;
    width: 100%;
    max-width: 408px;
    position: relative;
    z-index: 2;
  }

  .status-bar {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }

  .status-icons {
    display: flex;
    gap: 6px;
  }
  
  .status-icons:hover{
   cursor: pointer;
  }

  .nav-icons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
  }

  .right-icons {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .bell-wrapper {
    position: relative;
  }

  .notification-dot {
    position: absolute;
    top: -1px;
    right: -1px;
    width: 8px;
    height: 8px;
    background-color: limegreen;
    border-radius: 50%;
  }

.main-section {
  background: linear-gradient(to bottom, #db257d, #720247);
  padding: 20px;
  width: 100%;
  height: 80vh;
  max-width: 400px;
  margin-top: -15px;
  z-index: 1;
  position: relative;
}

  .quiz-title {
    font-size: 14px;
    font-weight: 500;
    font-family: 'Poppins', sans-serif;
    color: white;

  }

  .quiz-question-number {
    font-size: 18px;
    font-weight: bold;
    margin-top: 4px;
  }

  .question-white {
    color: white;
  }

  .number-highlight {
    color: #fff;
  }

  .total-black {
    font-size: 14px;
    color: black;
  }

  .quiz-question {
    margin-top: 8px;
    font-size: 26px;
      font-family: 'Nunito Sans', sans-serif;
    font-weight: 600;
    line-height: 1.4;
    color: white;
  }

  .answer-btn {
    background: white;
    border: none;
    border-radius: 9999px;
    padding: 10px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
    color: #000;
    margin-bottom: 12px;
    width: 100%;
    cursor: pointer;
  }
  
  .answer-btn:focus {
    outline: none;
  }

  .answer-text {
     font-family: 'Inter', sans-serif;
    flex-grow: 1;
  }

  .radio-circle {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease;
  }

  .radio-selected {
    border-color: #eb1695;
  }

  .radio-dot {
    width: 12px;
    height: 12px;
    background-color: #eb1695;
    border-radius: 50%;
  }

  .pagination {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 20px;
  }

  .dot.blue {
    background-color: #eb1695;
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }

  .dot.white {
    background-color: white;
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
  
  .quiz-submit-btn {
    display: block;
    width: 80%;
    margin: 20px auto 0;
    padding: 12px 20px;
    border: none;
    border-radius: 25px;
    background-color: #d10078;
    color: white;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    text-align: center;
  }

  .quiz-submit-btn:hover {
    background-color: #c00075;
  }

  .score-card {
    background: white;
    border-radius: 20px;
    padding: 20px;
    text-align: center;
    margin: 40px 0;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  }

  .score-card h2 {
    color: black;
    font-size: 24px;
    margin-bottom: 10px;
  }

  .score-card p {
    color: #888;
    font-size: 16px;
  }
  
  body {
  margin: 0;
  font-family: Arial, sans-serif;
}

.screen {
  width: 100%;
  max-width: 480px;
  margin: auto;
  background-color: #000;
  height: 100vh;
  overflow: hidden;
}

/* HEADER */
.header {
  height: 13vh;
  background: #d9d9d9;
  /* border-bottom-left-radius: 24px; */
  border-bottom-right-radius: 40px;
   border-bottom-left-radius: 40px;
  padding: 10px 15px 20px;
  position: relative;
  z-index: 2;
}
.header2 {
  height: 100vh;
  background: #d9d9d9;
  margin-left: -22px;
  width: 103%;
  /* border-bottom-left-radius: 24px; */
  border-top-right-radius: 35px;
   border-top-left-radius: 35px;
  padding:10px 15px 20px;
  position: relative;
  bottom: -1rem;
  z-index: 2;
}

.status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #000;
}

.status-icons {
  display: flex;
  gap: 5px;
}

.nav-icons {
  display: flex;
  justify-content: space-between;
  margin-top: 36px;
}

.nav-icon {
  font-size: 24px;
  color: black;
  cursor: pointer;
}
.nav-icon-home {
  font-size: 24px;
  color: black;
  cursor: pointer;
  position: relative;
  left: 2rem;
}

.bell-container {
  position: relative;
  display: flex;
  gap: 10px;
  margin-right: 15px;
}

.green-dot {
  position: absolute;
  top: 0;
  right: 47px;
  width: 10px;
  height: 10px;
  background-color: limegreen;
  border-radius: 50%;
}

/* CONTENT */
.content {
  background: linear-gradient(to bottom, #cc197c, #86014c);
  /* border-top-left-radius: 30px;
  border-top-right-radius: 30px; */
  margin-top: -80px; /* Overlap effect */
  padding: 20px;
  min-height: calc(100vh - 80px);
}

.title {
  margin-top: 80px;
  font-size: 2rem;
}

.white-text {
 color: rgb(221, 216, 216);
  font-weight: bold;
}

.black-text {
  color: rgb(49, 49, 49);
}

.question {
  color: rgb(221, 216, 216);
  margin-top: 30px;
  line-height: 1.5;
  font-size: 1.2rem;
}
.h2{ color: #cc197c; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif; } .p{ margin: 0px; } .btn-tangira{ background-color: #cc197c; height: 50px; width: 90%; border-radius: 25px; position: relative; bottom: -3rem; transition: transform 0.2s ease; } .btn-tangira:hover { transform: translateX(5px); cursor: pointer; } .nav-icons:hover{ cursor: pointer; } // AddMember Css body { margin: 0; font-family: Arial, sans-serif; } .screen-add { width: 100%; max-width: 480px; margin: auto; background-color: #000; height: 100vh; overflow: hidden; } /* HEADER */ .header-add { height: 13vh; background: transparent; /* border-bottom-left-radius: 24px; */ border-bottom-right-radius: 40px; border-bottom-left-radius: 40px; padding: 10px 15px 20px; bottom: 2rem; position: relative; z-index: 2; } .header-add2 { height: 67vh; background: #d9d9d9; margin-left: -22px; width: 103%; /* border-bottom-left-radius: 24px; */ border-top-right-radius: 35px; border-top-left-radius: 35px; padding:10px 15px 20px; position: relative; bottom: -10rem; z-index: 2; overflow:auto; } .status-bar-add { display: flex; justify-content: space-between; align-items: center; font-size: 14px; color: #161616; } .status-icons-add { display: flex; gap: 5px; } .nav-icons-add { display: flex; justify-content: space-between; margin-top: 36px; } .nav-icon-add { font-size: 24px; color: black; cursor: pointer; } .bell-container-add { position: relative; display: flex; gap: 10px; margin-right: 15px; } .green-dot-add { position: absolute; top: 0; right: 59px; width: 10px; height: 10px; background-color: limegreen; border-radius: 50%; } /* CONTENT */ .content-add { background: linear-gradient(to bottom, #cc197c, #86014c); /* border-top-left-radius: 30px; border-top-right-radius: 30px; */ margin-top: -130px; /* Overlap effect */ padding: 20px; height: 100%; } .title-add { margin-top: 80px; } .white-text-add { color: rgb(221, 216, 216); font-weight: bold; } .black-text-add { color: rgb(49, 49, 49); } .question-add { color: rgb(221, 216, 216); margin-top: 30px; line-height: 1.5; } .btn-tangira-add{ background-color: #cc197c; border:none; height: 50px; width: 90%; border-radius: 25px; position: relative; bottom: -3rem;  } .h2-add{ color: #cc197c; font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif; } .p-add{ margin: 0px; } .profile-add{ width: 45px; height: 45px; background-color: #bebaba; border-radius: 50%; display: flex; position: relative; top: -4px; } .profile-icon-add{ align-self: center; margin-left: auto; margin-right: auto; } .signup-title-add { color: rgb(38, 36, 36); font-size: 2rem; font-weight: bold; margin: 1.5rem; } .main-content-add { flex-grow: 1; display: flex; flex-direction: column; padding: 1.5rem; } .input-group-add { background: #f0f0f0; /* Light gray background for input fields */ border-radius: 1.5rem; padding: 0.75rem 1.5rem; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 1rem; box-shadow: none; /* No shadow on inputs to match the image */ } .input-group-add input { flex-grow: 1; border: none; outline: none; background: transparent; /* Transparent background to show parent's gray color */ font-size: 1rem; color: black; } .input-group-add input::placeholder { color: #a0a0a0; } .input-group-add .icon-add { color: #a0a0a0; } .input-group-add .password-toggle-add { cursor: pointer; } .signup-button-add{ background: #eb1695; /* Solid color as per the image */ color: white; font-size: 1.25rem; padding: 1rem; border-radius: 1.5rem; border: none; width: 100%; margin-top: 2rem; cursor: pointer; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2); transition: background 0.3s ease; } .signup-button-add2 { background: #eb1695; /* Solid color as per the image */ color: white; font-size: 1.25rem; padding: 1rem; border-radius: 1.5rem; border: none; width: 50%; position: relative; top: 8rem; cursor: pointer; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2); transition: background 0.3s ease; } .signup-button-add:hover { background: #d4145a; } .login-link { display: block; text-align: center; margin-top: 1.5rem; color: #888; font-size: 1rem; } .login-link a { color: #eb1695; text-decoration: none; font-weight: bold; } 


/* Members container */
.members-container {
  padding: 15px;
  overflow-y: auto;
  max-height: calc(100vh - 120px);
}

/* Member card */
.member-card {
  background: #ffffffd8;
  border-radius: 14px;
  padding: 12px 16px;
  margin-bottom: 12px;
  position: relative;
  left: -13px;
  box-shadow: 0px 4px 10px rgba(0,0,0,0.05);
  border: 1px solid #eee;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.member-card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 6px 14px rgba(0,0,0,0.08);
}

/* Member info (name row) */
.member-info {
  display: flex;
  align-items: center;
  margin-bottom: 6px;
}

.member-icon {
  margin-right: 8px;
  color: #ff6b81;
}

.member-name {
  font-weight: bold;
  font-size: 16px;
   color: #444;
}

/* Member details (email/phone rows) */
.member-details {
  display: flex;
  align-items: center;
  margin: 2px 0;
  font-size: 14px;
  color: #444;
}

.member-subicon {
  margin-right: 6px;
  color: #555;
}

/* Empty message */
.empty-text {
  text-align: center;
  color: #888;
  margin-top: 30px;
  font-size: 15px;
}

/* ---------------------------
   Header / nav / centered title
   --------------------------- */

/* Main header container used on "Add" and "ViewMembers" screens */
.header-view {
  height: 200px;                        /* same visual height as other headers */
  background:  #eb1695;                  /* light gray header */
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;      /* left/right icons */
  position: relative;
  z-index: 4;                           /* sit above content */
  box-sizing: border-box;
}

/* left & right nav icon group */
.nav-icons-view {
  display: flex;
  align-items: center;
  gap: 12px;
  z-index: 5;
}

/* make inline svg icons consistent and tappable */
.nav-icons-view svg,
.header-add svg {
  width: 28px;
  height: 28px;
  cursor: pointer;
  flex-shrink: 0;
}

/* small helper for the right-side icon block */
.bell-container-view,
.profile-add {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* centered header title (absolute so it is visually centered regardless of left/right widths) */
.header-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 12px;                          /* lifts title a bit to match your designs */
  margin: 0;
  font-size: 20px;                       /* tuned for mobile look */
  font-weight: 800;
  font-family: Georgia, 'Times New Roman', serif;
  color: #fff;
  letter-spacing: 0.6px;
  z-index: 6;                            /* ensure it appears above icons */
  pointer-events: none;                  /* clicks go to icons, not the title */
}

/* when you want a smaller subtitle under the title */
.header-subtitle {
  display: block;
  font-size: 12px;
  color: #666;
  font-weight: 600;
  margin-top: 4px;
  pointer-events: none;
}

/* ensure header content doesn't overlap the main page content (useful if header is absolute elsewhere) */
.content-view,
.main-content-add,
.members-container {
  margin-top: 6px; /* small spacing so header feels separated */
}

/* optional: small responsive tweak for narrower screens */
@media (max-width: 380px) {
  .header-view { padding: 8px 12px; height: 100px; }
  .header-title { font-size: 15px; bottom: 10px; }
  .nav-icons-view svg { width: 24px; height: 24px; }
}

/* Avatar circle for members */
.avatar-circle {
  width: 62px;
  height: 62px;
  border-radius: 50%;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 18px;
  margin-right: 12px;
  flex-shrink: 0;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
}


/* Member header row */
.member-header {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

/* Member name + email */
.member-name {
  font-weight: 700;
  font-size: 16px;
  color: #222;
  margin-bottom: 2px;
}

.member-email {
  font-size: 14px;
  color: #666;
}
.screen-profile {
  width: 100%;
  height: 100%;
  padding: 1rem;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header-profile {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.profile-card {
  width: 90%;
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.avatar-wrapper {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto 1rem;
}

.avatar-circle-profile {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: #007bff;
  color: #fff;
  font-size: 48px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
}

.avatar-upload {
  position: absolute;
  bottom: -10px;
  right: 40px;
  background: #007bff;
  color: white;
  font-size: 24px;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  text-align: center;
  line-height: 28px;
  cursor: pointer;
}

.btn-logout {
  margin-top: 1rem;
  width: 100%;
  padding: 10px;
  background: #ff4444;
  color: #fff;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
.btn-edit {
  margin-top: 0.5rem;
  width: 100%;
  padding: 10px;
  background: #007bff;
  color: #fff;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.profile-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  margin-top: 20px;
}

.profile-buttons button {
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
  width: 100%;
  padding: 12px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.btn-edit {
  background: linear-gradient(135deg, #4facfe, #00f2fe);
  color: #fff;
}

.btn-edit:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0,0,0,0.15);
}

.btn-logout {
  background: linear-gradient(135deg, #ff416c, #ff4b2b);
  color: #fff;
}

.btn-logout:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0,0,0,0.15);
}

.btn-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ---------- Profile Info Rows ---------- */
.profile-info {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.info-row {
  display: flex;
  align-items: center;
  background-color: #f8f9fa; /* light gray background */
  padding: 12px 16px;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease-in-out;
}

.info-row:hover {
  background-color: #e9ecef; /* slightly darker on hover */
}

.info-icon {
  margin-right: 12px;
  color: #4a4a4a; /* professional dark gray */
  flex-shrink: 0;
}

.info-text {
  flex: 1;
  font-size: 16px;
  color: #212529;
  font-weight: 500;
}

/* Eye toggle button for password */
.eye-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 18px; /* eye emoji/icon size */
  margin-left: 10px;
  color: #495057;
  transition: color 0.2s ease-in-out;
}

.eye-btn:hover {
  color: #212529;
}

/* ---------- Avatar and Upload ---------- */
.avatar-wrapper {
  position: relative;
  margin-bottom: 15px;
}

.avatar-circle-profile {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #ced4da; /* light gray circle */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  color: #495057;
  font-weight: bold;
  margin: 0 auto;


.avatar-upload:hover {
  background-color: #0b5ed7; /* slightly darker blue on hover */
}

/* ---------- Buttons (Edit / Logout) ---------- */
.profile-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 25px;
  gap: 10px;
}

.btn-edit, .btn-logout {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 16px;
  font-size: 15px;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.btn-edit {
  background-color: #ffc107; /* amber */
  color: #212529;
  border: none;
}

.btn-edit:hover {
  background-color: #e0a800;
}

.btn-logout {
  background-color: #dc3545; /* red */
  color: #fff;
  border: none;
}

.btn-logout:hover {
  background-color: #bb2d3b;
}

.btn-icon {
  flex-shrink: 0;
}

/* ---------- Header ---------- */
.header-profile {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 25px;
}

.nav-icon {
  cursor: pointer;
  color: #212529;
  transition: color 0.2s ease-in-out;
}

.nav-icon:hover {
  color: #0d6efd;
}

.screen-profile {
  padding: 20px;
}

.profile-card {
  background-color: #fff;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 6px 18px  rgba(0, 0, 0, 0.08);
}






`;

// === Components (Home3, Home2, SignupForm, LoginForm, etc.) ===
// ✅ I’m keeping them exactly as you had them, only changing auth/db references

const Home3 = ({ setPage }) => {
  const { t } = useLanguage();
   const StatusIcons = () => (
    <div className="status-icons">
      <svg width="20" height="12" viewBox="0 0 20 12">
        <rect x="0" y="9" width="3" height="3" rx="0.6" fill="#000" />
        <rect x="5" y="7" width="3" height="5" rx="0.6" fill="#000" opacity="0.85" />
        <rect x="10" y="5" width="3" height="7" rx="0.6" fill="#000" opacity="0.7" />
        <rect x="15" y="3" width="3" height="9" rx="0.6" fill="#000" opacity="0.55" />
      </svg>
      <svg width="20" height="12" viewBox="0 0 24 24">
        <path d="M2 8c5.5-5 14.5-5 20 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" />
        <path d="M6 12c3.5-3 8.5-3 12 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" />
        <path d="M10 16c1.5-1 3.5-1 5 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="20" r="1.5" fill="#000" />
      </svg>
      <div style={{ marginRight: '0.25rem', height: '0.5rem', width: '0.75rem', border: '1px solid black', borderRadius: '2px' }}></div>
      <div style={{ height: '0.5rem', width: '1.25rem', backgroundColor: 'black', borderRadius: '2px' }}></div>
    </div>
  );
  
  return (
    <div className="mobile-frame-pink">
      <div className="header-3">
        <span style={{ color: "black" }}> {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        <StatusIcons />
      </div>

      <div className="main-content">
        <div style={{ marginBottom: "2rem" }} className="welcome-circle">
          <h1 style={{ fontWeight: 800 }}>{t("welcome")}
</h1>
          <p>{t("subtitle")}</p>
        </div>
    <svg width="250" height="250" viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', bottom: '2.5rem' }}>
              {/* Parent 1 (left) */}
              <rect x="50" y="100" width="40" height="150" fill="#2d2d2d" />
              <rect x="55" y="100" width="30" height="20" fill="#f5f5f5" />
              <circle cx="70" cy="95" r="15" fill="#f5f5f5" />

              {/* Parent 2 (right) */}
              <rect x="160" y="100" width="40" height="150" fill="#2d2d2d" />
              <rect x="165" y="100" width="30" height="20" fill="#f5f5f5" />
              <circle cx="180" cy="95" r="15" fill="#f5f5f5" />
            </svg>

        <button className="continue-button"   onClick={() => setPage('Home2')}>
          <span style={{color:'#a6a6a6ff'}} className="continue-loading"> {t("continue")}</span>
          <span className="arrow-group">
            <ChevronRight style={{color:'#a6a6a6ff'}} size={24} />
            <ChevronRight  style={{color:'#a6a6a6ff'}} size={24} />
          </span>
        </button>
      </div>
    </div>
  );
 };

 

import { useLanguage } from "./LanguageContext";
const Home2 = ({ setPage }) => {
  const { language, setLanguage, t } = useLanguage();
  const languages = [
    { code: "rw", name: "Kinyarwanda" },
    { code: "en", name: "English" },
    { code: "fr", name: "French" },
  ];

  const StatusIcons = () => (
    <div className="status-icons">
      <svg width="20" height="12" viewBox="0 0 20 12">
        <rect x="0" y="9" width="3" height="3" rx="0.6" fill="#000" />
        <rect x="5" y="7" width="3" height="5" rx="0.6" fill="#000" opacity="0.85" />
        <rect x="10" y="5" width="3" height="7" rx="0.6" fill="#000" opacity="0.7" />
        <rect x="15" y="3" width="3" height="9" rx="0.6" fill="#000" opacity="0.55" />
      </svg>
      <svg width="20" height="12" viewBox="0 0 24 24">
        <path d="M2 8c5.5-5 14.5-5 20 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" />
        <path d="M6 12c3.5-3 8.5-3 12 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" />
        <path d="M10 16c1.5-1 3.5-1 5 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="20" r="1.5" fill="#000" />
      </svg>
      <div style={{ marginRight: '0.25rem', height: '0.5rem', width: '0.75rem', border: '1px solid black', borderRadius: '2px' }}></div>
      <div style={{ height: '0.5rem', width: '1.25rem', backgroundColor: 'black', borderRadius: '2px' }}></div>
    </div>
  );

  return (
    <div className="mobile-frame-pink">
      <div className="headerr" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: "black" }}> {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        <StatusIcons />
      </div>
         <span className="back-arrow"  style={{ marginTop: '3.5rem' , color: "black" , fontSize: "30px" }} onClick={() => setPage('Home3')}>&#8592;</span>

      <h1 className="main-title">{t("selectLanguage")}</h1>

        <div className="language-buttons">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`language-button ${language === lang.code ? "selected" : ""}`}
          >
            <span>{lang.name}</span>
            <div className={`checkbox ${language === lang.code ? "selected" : ""}`}>
              {language === lang.code && <div className="inner-circle"></div>}
            </div>
          </button>
        ))}
      </div>

      <button className="skip-button" onClick={() => setPage("SignupForm")}>
        {t("next")}
      </button>
    </div>
  );
};

import "./LoginForm.css";



const SignupForm = ({ setPage }) => {
  const { t } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    // Validation first
    if (password !== confirmPassword || !email) return;

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        fullName,
        phoneNumber,
        email,
        password,
      });

      // Smooth transition to LoginForm
      setTimeout(() => {
        setLoading(false);
        setPage("LoginForm");
      }, 1000);
    } catch (error) {
      console.error("Error during sign-up:", error);

      // Still show loader briefly before going back to SignupForm
      setTimeout(() => {
        setLoading(false);
        setPage("SignupForm");
      }, 1000);
    }
  };

  const StatusIcons = () => (
    <div className="status-icons" style={{ display: "flex", gap: "5px" }}>
      <svg width="20" height="12" viewBox="0 0 20 12">
        <rect x="0" y="9" width="3" height="3" rx="0.6" fill="#000" />
        <rect x="5" y="7" width="3" height="5" rx="0.6" fill="#000" opacity="0.85" />
        <rect x="10" y="5" width="3" height="7" rx="0.6" fill="#000" opacity="0.7" />
        <rect x="15" y="3" width="3" height="9" rx="0.6" fill="#000" opacity="0.55" />
      </svg>
      <svg width="20" height="12" viewBox="0 0 24 24">
        <path d="M2 8c5.5-5 14.5-5 20 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" />
        <path d="M6 12c3.5-3 8.5-3 12 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" />
        <path d="M10 16c1.5-1 3.5-1 5 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="20" r="1.5" fill="#000" />
      </svg>
    </div>
  );

  return (
    <div className="mobile-frame">
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>Creating account...</p>
        </div>
      )}

      <div className="top-bar">
        <ChevronLeft size={24} className="back-arrow" onClick={() => setPage("Home2")} />
        <StatusIcons />
      </div>

      <div className="form-box">
        <h2>{t("signup")}</h2>

        <div className="input-group">
          <User size={20} className="icon" />
          <input
            type="text"
            placeholder={t("fullName")}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        <div className="input-group">
          <Phone size={20} className="icon" />
          <input
            type="tel"
            placeholder={t("phone")}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <div className="input-group">
          <Home size={20} className="icon" />
          <input
            type="email"
            placeholder={t("email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <Lock size={20} className="icon" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder={t("password")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeOff size={20} className="icon" /> : <Eye size={20} className="icon" />}
          </span>
        </div>

        <div className="input-group">
          <Lock size={20} className="icon" />
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder={t("confirmPassword")}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <span className="password-toggle" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? <EyeOff size={20} className="icon" /> : <Eye size={20} className="icon" />}
          </span>
        </div>

        <button className="signup-button" onClick={handleSignup}>
          {t("signup")}
        </button>

        <div className="login-link">
          {t("alreadyAccount")}{" "}
          <a href="#" onClick={() => setPage("LoginForm")}>
            {t("login")}
          </a>
        </div>
      </div>
    </div>
  );
};




const LoginForm = ({ setPage }) => {
  const { t } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) return; // optional: simple check

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setTimeout(() => {
        setLoading(false);
        setPage("StartQuiz");
      }, 1000); // slight smooth transition
    } catch (error) {
      console.error("Error during login:", error);
      setLoading(false);
    }
  };

  const StatusIcons = () => (
    <div className="status-icons" style={{ display: "flex", gap: "5px" }}>
      <svg width="20" height="12" viewBox="0 0 20 12">
        <rect x="0" y="9" width="3" height="3" rx="0.6" fill="#000" />
        <rect x="5" y="7" width="3" height="5" rx="0.6" fill="#000" opacity="0.85" />
        <rect x="10" y="5" width="3" height="7" rx="0.6" fill="#000" opacity="0.7" />
        <rect x="15" y="3" width="3" height="9" rx="0.6" fill="#000" opacity="0.55" />
      </svg>
      <svg width="20" height="12" viewBox="0 0 24 24">
        <path d="M2 8c5.5-5 14.5-5 20 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" />
        <path d="M6 12c3.5-3 8.5-3 12 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" />
        <path d="M10 16c1.5-1 3.5-1 5 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="20" r="1.5" fill="#000" />
      </svg>
    </div>
  );

  return (
    <div className="mobile-frame">
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>Verifying credentials...</p>
        </div>
      )}
      <div className="top-bar">
        <ChevronLeft size={24} className="back-arrow" onClick={() => setPage("Home2")} />
        <StatusIcons />
      </div>
      <div className="form-box">
        <h2>{t("login")}</h2>
        <div className="input-group">
          <Home size={20} className="icon" />
          <input
            type="email"
            placeholder={t("email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <Lock size={20} className="icon" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder={t("password")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff size={20} className="icon" />
            ) : (
              <Eye size={20} className="icon" />
            )}
          </span>
        </div>
        <button className="signup-button" onClick={handleLogin}>
          {t("login")}
        </button>
        <div className="login-link">
          {t("dontHaveAccount")}{" "}
          <a href="#" onClick={() => setPage("SignupForm")}>
            {t("signup")}
          </a>
        </div>
      </div>
    </div>
  );
};


const StartQuiz = ({setPage}) => {
  const { t } = useLanguage();
return(

<>

 <div className="screen">
      {/* Header */}
      <div className="header">
        <div className="status-bar">
          <span className="time"> {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
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
<svg width="29" height="30" viewBox="0 0 24 24" fill="none" onClick={ ()=> setPage('Home3')}>
  <path d="M3 9.5L12 3L21 9.5V20C21 20.55 20.55 21 20 21H15C14.45 21 14 20.55 14 20V15C14 14.45 13.55 14 13 14H11C10.45 14 10 14.45 10 15V20C10 20.55 9.55 21 9 21H4C3.45 21 3 20.55 3 20V9.5Z" 
        stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

          <div className="bell-container">
             <svg width="29" height="30" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" onClick={ ()=> setPage('Notifications')}>
        <path d="M18 8a6 6 0 10-12 0c0 7-3 7-3 7h18s-3 0-3-7"/>
        <path d="M13.73 21a2 2 0 01-3.46 0"/>
      </svg>
            <span className="green-dot"></span>
            <svg width="29" height="30" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" onClick={ ()=> setPage('Profile')}>
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
          </div>
          
        </div>
      </div>

      {/* Pink Content */}
      <div className="content">
        <h2 className="title">
          <span className="white-text">{t("familyBondingTitle")}</span>{" "}
        </h2>

        <p className="question">
         {t("familyBondingDescription")}
        </p>
           <div className="header2">
            <div className="text1" style={{color:'black'}}>
              <center>
                  <p className="p" style={{marginTop:50}}>
                  {t("pointPerQuestion")}
                </p>
                 <p className="p">
                  {t("scoreDisplayed")}
                </p>
                  <p className="p" style={{marginBottom:50}}>
                  {t("maxScore")}
                </p>
                  <h2 className="h2">{t("startQuiz")}</h2>
                  <p>{t("goodLuck")}</p>
             <button  className="btn-tangira" style={{border:'none',color:"#fff",fontSize:'1.1rem'}} onClick={() => setPage('Home6')} > {t("startQuiz")}<span>{"  >>"}</span>   </button>
              </center>

            </div>
      </div>


      </div>
    </div>


</>
  
);
}


const QuizPage2 = ({ setPage }) => {
  const { t } = useLanguage();
  const [selected, setSelected] = useState("B");
const answers = [
  { id: "A", text: t("answer2A") },
  { id: "B", text: t("answer2B") },
  { id: "C", text: t("answer2C") },
  { id: "D", text: t("answer2D") },
];


  const StatusIcons = () => (
    <div className="status-icons" style={{ display: 'flex', gap: '6px' }}>
      <svg width="20" height="12" viewBox="0 0 20 12">
        <rect x="0" y="9" width="3" height="3" rx="0.6" fill="#000" />
        <rect x="5" y="7" width="3" height="5" rx="0.6" fill="#000" opacity="0.85" />
        <rect x="10" y="5" width="3" height="7" rx="0.6" fill="#000" opacity="0.7" />
        <rect x="15" y="3" width="3" height="9" rx="0.6" fill="#000" opacity="0.55" />
      </svg>
      <svg width="20" height="12" viewBox="0 0 24 24">
        <path d="M2 8c5.5-5 14.5-5 20 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" />
        <path d="M6 12c3.5-3 8.5-3 12 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" />
        <path d="M10 16c1.5-1 3.5-1 5 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="20" r="1.5" fill="#000" />
      </svg>
    </div>
  );

  return (
    <div className="quiz-wrapper">
      <div className="header-section">
        <div className="status-bar">
          <span className="time"> {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          <StatusIcons />
        </div>
        <div className="nav-icons">
          <Home size={22} color="#000" onClick={() => setPage('Home3')} />
          <div className="right-icons">
            <div className="bell-wrapper">
              <Bell size={22} color="#000" onClick={() => setPage('Notifications')} />
              <span className="notification-dot"></span>
            </div>
            <User size={22} color="#000" onClick={() => setPage('Profile')} />
          </div>
        </div>
      </div>
      <div className="main-section">
       <p className="quiz-title">{t("familyProblemsQuiz")}</p>
        <p className="quiz-question-number">
  <span className="question-white">{t("question")}</span>{" "}
  <span className="number-highlight">02</span>
  <span className="total-black">/05</span>
</p>

       <p className="quiz-question">{t("quizQuestion2")}</p>
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
          <span className="dot blue"></span>
          <span className="dot white"></span>
          <span className="dot white"></span>
          <span className="dot white"></span>
        </div>
           <div className="btns">
            <ChevronLeft size={33} style={{color:'#fff'}} onClick={()=> setPage('Home6')}></ChevronLeft> <span style={{color:'#fff'}}>............  2 / 5  ............</span>
            <ChevronRight size={33} style={{color:'#fff'}} onClick={()=> setPage('Home7')}></ChevronRight> 
           </div>      </div>
    </div>
  );
};

const QuizPage3 = ({ setPage }) => {
  const { t } = useLanguage();
  const [selected, setSelected] = useState("C");
const answers = [
  { id: "A", text: t("answer4A") },
  { id: "B", text: t("answer4B") },
  { id: "C", text: t("answer4C") },
  { id: "D", text: t("answer4D") },
];


  const StatusIcons = () => (
    <div className="status-icons" style={{ display: 'flex', gap: '6px' }}>
      <svg width="20" height="12" viewBox="0 0 20 12">
        <rect x="0" y="9" width="3" height="3" rx="0.6" fill="#000" />
        <rect x="5" y="7" width="3" height="5" rx="0.6" fill="#000" opacity="0.85" />
        <rect x="10" y="5" width="3" height="7" rx="0.6" fill="#000" opacity="0.7" />
        <rect x="15" y="3" width="3" height="9" rx="0.6" fill="#000" opacity="0.55" />
      </svg>
      <svg width="20" height="12" viewBox="0 0 24 24">
        <path d="M2 8c5.5-5 14.5-5 20 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" />
        <path d="M6 12c3.5-3 8.5-3 12 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" />
        <path d="M10 16c1.5-1 3.5-1 5 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="20" r="1.5" fill="#000" />
      </svg>
    </div>
  );

  return (
    <div className="quiz-wrapper">
      <div className="header-section">
        <div className="status-bar">
          <span className="time"> {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          <StatusIcons />
        </div>
        <div className="nav-icons">
          <Home size={22} color="#000" onClick={() => setPage('Home3')} />
          <div className="right-icons">
            <div className="bell-wrapper">
              <Bell size={22} color="#000" onClick={() => setPage('Notifications')} />
              <span className="notification-dot"></span>
            </div>
            <User size={22} color="#000" onClick={() => setPage('Profile')} />
          </div>
        </div>
      </div>
      <div className="main-section">
       <p className="quiz-title">{t("familyProblemsQuiz")}</p>
        <p className="quiz-question-number">
  <span className="question-white">{t("question")}</span>{" "}
  <span className="number-highlight">04</span>
  <span className="total-black">/05</span>
</p>

       <p className="quiz-question">{t("quizQuestion4")}</p>
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
          <span className="dot blue"></span>
          <span className="dot blue"></span>
          <span className="dot blue"></span>
          <span className="dot white"></span>
        </div>
           <div className="btns">
            <ChevronLeft size={33} style={{color:'#fff'}} onClick={()=> setPage('Home7')}></ChevronLeft> <span style={{color:'#fff'}}>............  4 / 5  ............</span>
            <ChevronRight size={33} style={{color:'#fff'}} onClick={()=> setPage('Home8')}></ChevronRight> 
           </div>      </div>
    </div>
  );
};

// Reusable option component for showing correct answer
const ChallengeOption = ({ label, value, correctAnswer }) => (
  <div
    className={`option ${correctAnswer === value ? "selected" : ""}`}
    style={{
      padding: "10px 16px",
      marginBottom: "10px",
      borderRadius: "80px",
      cursor: "default",
      backgroundColor: correctAnswer === value ? "#007BFF" : "#fff",
      color: correctAnswer === value ? "#fff" : "#000",
      userSelect: "none",
    }}
  >
    {label}
  </div>
);

const ChallengesScreen = ({ setPage }) => {
  const { t } = useLanguage();
  const StatusIcons = () => (
    <div className="status-icons" style={{ display: "flex", gap: "5px" }}>
      <svg width="20" height="12" viewBox="0 0 20 12"> <rect x="0" y="9" width="3" height="3" rx="0.6" fill="#000" /> <rect x="5" y="7" width="3" height="5" rx="0.6" fill="#000" opacity="0.85" /> <rect x="10" y="5" width="3" height="7" rx="0.6" fill="#000" opacity="0.7" /> <rect x="15" y="3" width="3" height="9" rx="0.6" fill="#000" opacity="0.55" /> </svg> {/* wifi */} <svg width="20" height="12" viewBox="0 0 24 24"> <path d="M2 8c5.5-5 14.5-5 20 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round"/> <path d="M6 12c3.5-3 8.5-3 12 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round"/> <path d="M10 16c1.5-1 3.5-1 5 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round"/> <circle cx="12.5" cy="19" r="1.2" fill="#000"/> </svg> {/* battery */} <svg width="28" height="12" viewBox="0 0 28 12"> <rect x="1" y="1" width="22" height="10" rx="2" fill="none" stroke="#000" strokeWidth="2"/> <rect x="24" y="4" width="3" height="4" rx="1" fill="#000"/> <rect x="3" y="3" width="18" height="6" rx="1" fill="#000"/> </svg>
    </div>
  );

  return (
    <div className="screen">
      <div className="header-challenges">
        <div className="status-bar">
          <span className="time">{new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
          <StatusIcons />
        </div>
        <div className="nav-icons">
          <ChevronLeft size={24} className="nav-icon" onClick={() => setPage("QuizPage2")} />
          <div className="bell-container">
            <Bell size={24} className="nav-icon" onClick={() => setPage("Notifications")} />
            <User size={24} className="nav-icon" onClick={() => setPage("Profile")} />
          </div>
        </div>
      </div>

      <div className="content-challenges">
        <h2 className="title">
          <span className="white-text">{t("challengesTitle")}</span>{" "}
          <span className="black-text">
            <span className="white-text">1</span>/4
          </span>
        </h2>

        <p className="questionChallenge">{t("challengeQuestion1")}</p>

        <div className="options">
          <ChallengeOption label={t("yesOption1")} value="Yego" correctAnswer="Yego" />
          <ChallengeOption label={t("noOption1")} value="Oya" correctAnswer="Yego" />
        </div>

        <div className="dots">
          <span className="dot active"></span>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>

        <div className="btns">
          <button className="next-button-back" onClick={() => setPage("QuizPage2")}>
            {t("back")}
          </button>
          <button className="next-button-next" onClick={() => setPage("Challenges2")}>
            {t("next")}
          </button>
        </div>
      </div>
    </div>
  );
};

const ChallengesScreen2 = ({ setPage }) => {
  const { t } = useLanguage();
  const StatusIcons = () => (
    <div className="status-icons" style={{ display: "flex", gap: "5px" }}>
      <svg width="20" height="12" viewBox="0 0 20 12"> <rect x="0" y="9" width="3" height="3" rx="0.6" fill="#000" /> <rect x="5" y="7" width="3" height="5" rx="0.6" fill="#000" opacity="0.85" /> <rect x="10" y="5" width="3" height="7" rx="0.6" fill="#000" opacity="0.7" /> <rect x="15" y="3" width="3" height="9" rx="0.6" fill="#000" opacity="0.55" /> </svg> {/* wifi */} <svg width="20" height="12" viewBox="0 0 24 24"> <path d="M2 8c5.5-5 14.5-5 20 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round"/> <path d="M6 12c3.5-3 8.5-3 12 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round"/> <path d="M10 16c1.5-1 3.5-1 5 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round"/> <circle cx="12.5" cy="19" r="1.2" fill="#000"/> </svg> {/* battery */} <svg width="28" height="12" viewBox="0 0 28 12"> <rect x="1" y="1" width="22" height="10" rx="2" fill="none" stroke="#000" strokeWidth="2"/> <rect x="24" y="4" width="3" height="4" rx="1" fill="#000"/> <rect x="3" y="3" width="18" height="6" rx="1" fill="#000"/> </svg>
    </div>
  );

  return (
    <div className="screen">
      <div className="header-challenges">
        <div className="status-bar">
          <span className="time">{new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
          <StatusIcons />
        </div>
        <div className="nav-icons">
          <ChevronLeft size={24} className="nav-icon" onClick={() => setPage("Challenges")} />
          <div className="bell-container">
            <Bell size={24} className="nav-icon" onClick={() => setPage("Notifications")} />
            <User size={24} className="nav-icon" onClick={() => setPage("Profile")} />
          </div>
        </div>
      </div>

      <div className="content-challenges">
        <h2 className="title">
          <span className="white-text">{t("challengesTitle")}</span>{" "}
          <span className="black-text">
            <span className="white-text">2</span>/4
          </span>
        </h2>

        <p className="questionChallenge">{t("challengeQuestion2")}</p>

        <div className="options">
          <ChallengeOption label={t("yesOption2")} value="Yego" correctAnswer="Oya" />
          <ChallengeOption label={t("noOption2")} value="Oya" correctAnswer="Oya" />
        </div>

        <div className="dots">
          <span className="dot active"></span>
          <span className="dot active"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>

        <div className="btns">
          <button className="next-button-back" onClick={() => setPage("Challenges")}>
            {t("back")}
          </button>
          <button className="next-button-next" onClick={() => setPage("Challenges3")}>
            {t("next")}
          </button>
        </div>
      </div>
    </div>
  );
};

const ChallengesScreen3 = ({ setPage }) => {
  const { t } = useLanguage();
  const StatusIcons = () => (
    <div className="status-icons" style={{ display: "flex", gap: "5px" }}>
      <svg width="20" height="12" viewBox="0 0 20 12"> <rect x="0" y="9" width="3" height="3" rx="0.6" fill="#000" /> <rect x="5" y="7" width="3" height="5" rx="0.6" fill="#000" opacity="0.85" /> <rect x="10" y="5" width="3" height="7" rx="0.6" fill="#000" opacity="0.7" /> <rect x="15" y="3" width="3" height="9" rx="0.6" fill="#000" opacity="0.55" /> </svg> {/* wifi */} <svg width="20" height="12" viewBox="0 0 24 24"> <path d="M2 8c5.5-5 14.5-5 20 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round"/> <path d="M6 12c3.5-3 8.5-3 12 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round"/> <path d="M10 16c1.5-1 3.5-1 5 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round"/> <circle cx="12.5" cy="19" r="1.2" fill="#000"/> </svg> {/* battery */} <svg width="28" height="12" viewBox="0 0 28 12"> <rect x="1" y="1" width="22" height="10" rx="2" fill="none" stroke="#000" strokeWidth="2"/> <rect x="24" y="4" width="3" height="4" rx="1" fill="#000"/> <rect x="3" y="3" width="18" height="6" rx="1" fill="#000"/> </svg>
    </div>
  );

  return (
    <div className="screen">
      <div className="header-challenges">
        <div className="status-bar">
          <span className="time">{new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
          <StatusIcons />
        </div>
        <div className="nav-icons">
          <ChevronLeft size={24} className="nav-icon" onClick={() => setPage("Challenges2")} />
          <div className="bell-container">
            <Bell size={24} className="nav-icon" onClick={() => setPage("Notifications")} />
            <User size={24} className="nav-icon" onClick={() => setPage("Profile")} />
          </div>
        </div>
      </div>

      <div className="content-challenges">
        <h2 className="title">
          <span className="white-text">{t("challengesTitle")}</span>{" "}
          <span className="black-text">
            <span className="white-text">3</span>/4
          </span>
        </h2>

        <p className="questionChallenge">{t("challengeQuestion3")}</p>

        <div className="options">
          <ChallengeOption label={t("yesOption3")} value="Yego" correctAnswer="Yego" />
          <ChallengeOption label={t("noOption3")} value="Oya" correctAnswer="Yego" />
        </div>

        <div className="dots">
          <span className="dot active"></span>
          <span className="dot active"></span>
          <span className="dot active"></span>
          <span className="dot"></span>
        </div>

        <div className="btns">
          <button className="next-button-back" onClick={() => setPage("Challenges2")}>
            {t("back")}
          </button>
          <button className="next-button-next" onClick={() => setPage("Challenges4")}>
            {t("next")}
          </button>
        </div>
      </div>
    </div>
  );
};

const ChallengesScreen4 = ({ setPage }) => {
  const { t } = useLanguage();
  const StatusIcons = () => (
    <div className="status-icons" style={{ display: "flex", gap: "5px" }}>
      <svg width="20" height="12" viewBox="0 0 20 12"> <rect x="0" y="9" width="3" height="3" rx="0.6" fill="#000" /> <rect x="5" y="7" width="3" height="5" rx="0.6" fill="#000" opacity="0.85" /> <rect x="10" y="5" width="3" height="7" rx="0.6" fill="#000" opacity="0.7" /> <rect x="15" y="3" width="3" height="9" rx="0.6" fill="#000" opacity="0.55" /> </svg> {/* wifi */} <svg width="20" height="12" viewBox="0 0 24 24"> <path d="M2 8c5.5-5 14.5-5 20 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round"/> <path d="M6 12c3.5-3 8.5-3 12 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round"/> <path d="M10 16c1.5-1 3.5-1 5 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round"/> <circle cx="12.5" cy="19" r="1.2" fill="#000"/> </svg> {/* battery */} <svg width="28" height="12" viewBox="0 0 28 12"> <rect x="1" y="1" width="22" height="10" rx="2" fill="none" stroke="#000" strokeWidth="2"/> <rect x="24" y="4" width="3" height="4" rx="1" fill="#000"/> <rect x="3" y="3" width="18" height="6" rx="1" fill="#000"/> </svg>
    </div>
  );

  return (
    <div className="screen">
      <div className="header-challenges">
        <div className="status-bar">
          <span className="time">{new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
          <StatusIcons />
        </div>
        <div className="nav-icons">
          <ChevronLeft size={24} className="nav-icon" onClick={() => setPage("Challenges3")} />
          <div className="bell-container">
            <Bell size={24} className="nav-icon" onClick={() => setPage("Notifications")} />
            <User size={24} className="nav-icon" onClick={() => setPage("Profile")} />
          </div>
        </div>
      </div>

      <div className="content-challenges">
        <h2 className="title">
          <span className="white-text">{t("challengesTitle")}</span>{" "}
          <span className="black-text">
            <span className="white-text">4</span>/4
          </span>
        </h2>

        <p className="questionChallenge">{t("challengeQuestion4")}</p>

        <div className="options">
          <ChallengeOption label={t("yesOption4")} value="Yego" correctAnswer="Oya" />
          <ChallengeOption label={t("noOption4")} value="Oya" correctAnswer="Oya" />
        </div>

        <div className="dots">
          <span className="dot active"></span>
          <span className="dot active"></span>
          <span className="dot active"></span>
          <span className="dot active"></span>
        </div>

        <div className="btns">
          <button className="next-button-back" onClick={() => setPage("Challenges3")}>
            {t("back")}
          </button>
          <button className="next-button-next" onClick={() => setPage("Activities")}>
            {t("next")}
          </button>
        </div>
      </div>
    </div>
  );
};





const ActivitiesScreen = ({ setPage }) => {
  const { t } = useLanguage();
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
    },
    { id: 4, emoji: "🎲", title: "Play a Game", description: "Playing a board game or card game." },
  ];

  const StatusIcons = () => (
    <div className="status-right" aria-hidden>
      <svg width="20" height="12" viewBox="0 0 20 12">
        <rect x="0" y="9" width="3" height="3" rx="0.6" fill="#000" />
        <rect x="5" y="7" width="3" height="5" rx="0.6" fill="#000" opacity="0.85" />
        <rect x="10" y="5" width="3" height="7" rx="0.6" fill="#000" opacity="0.7" />
        <rect x="15" y="3" width="3" height="9" rx="0.6" fill="#000" opacity="0.55" />
      </svg>
      <svg width="20" height="12" viewBox="0 0 24 24">
        <path d="M2 8c5.5-5 14.5-5 20 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
        <path d="M6 12c3.5-3 8.5-3 12 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
        <path d="M10 16c1.5-1 3.5-1 5 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="12" cy="20" r="1.5" fill="#000" />
      </svg>
    </div>
  );
  
  const BackIcon = () => (
    <ChevronLeft size={24} color="black" onClick={() => setPage('Challenges')} />
  );
  
  const BellIcon = () => (
    <div className="bell-wrap" onClick={() => setPage('Notifications')}>
      <Bell size={24} color="#000" />
      <div className="notif-dot"></div>
    </div>
  );
  
  const UserIcon = () => (<>
    <User size={24} color="#000" onClick={() => setPage('AddMember')} className="User" />
    <span style={{color:'black',position:'relative',top:'-0.6rem',left:'-1.5rem'}}>➕</span>
    </>
  );

  return (
    <div className="phone">
       <div className="header-activities">
        <div className="status-row">
          <span className="time"> {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          <StatusIcons />
        </div>
        <div className="nav-row">
          <BackIcon />
          <div className="nav-right">
            <BellIcon />
            <UserIcon />
          </div>
        </div>
        <h1 className="page-title">{t("activitiesTitle")}</h1>
      </div>
      <div className="content-activities">
        <div className="cards">
          {items.map((it) => (
            <div className="card" key={it.id}>
              <div className="medallion">
                <div className="medallion-inner">{it.emoji}</div>
              </div>
              <div className="card-body">
                <span className="green-pill">{t(`activity${it.id}Title`)}</span>
                <span className="card-title" style={{color:'#4f4f4fff'}}>{it.description ? t(`activity${it.id}Desc`) : ""}</span>
              </div>
            </div>
          ))}
        </div>
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
};

import './AddMember.css';
import { initializeApp, deleteApp } from "firebase/app";
import { firebaseConfig } from "../../BackEnd/firebase.js"; 
import {   getFirestore } from "firebase/firestore";
import {  getAuth } from "firebase/auth";

const AddMember = ({ setPage }) => {
  const { t } = useLanguage();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [popup, setPopup] = useState({ show: false, message: "", type: "" });

  const db = getFirestore();

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setPopup({ show: true, message: "Passwords do not match.", type: "error" });
      return;
    }

    if (!email) {
      setPopup({ show: true, message: "Please enter a valid email address.", type: "error" });
      return;
    }

    try {
      // ✅ Create a temporary secondary Firebase app to add a new member
      const secondaryApp = initializeApp(firebaseConfig, "Secondary");
      const secondaryAuth = getAuth(secondaryApp);

      const userCredential = await createUserWithEmailAndPassword(
        secondaryAuth,
        email,
        password
      );

      const user = userCredential.user;

      // ✅ Save new member in Firestore
      await setDoc(doc(db, "users", user.uid), {
        fullName,
        phoneNumber,
        email,
        createdAt: serverTimestamp(),
      });

      // ✅ Clean up secondary app safely
      await deleteApp(secondaryApp);

      setPopup({
        show: true,
        message: `Member ${fullName} added successfully!`,
        type: "success",
      });

      setTimeout(() => {
        setPage("Activities");
      }, 2000);
    } catch (error) {
      console.error("Error during sign-up:", error);
      setPopup({
        show: true,
        message: `Sign up failed: ${error.message}`,
        type: "error",
      });
    }
  };

  const Popup = ({ message, type, onClose }) => {
    if (!message) return null;
    return (
      <div className="popup-overlay">
        <div className={`popup-box ${type}`}>
          <p>{message}</p>
          <button className="popup-btn" onClick={onClose}>
            OK
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="screen-add">
        {/* HEADER */}
<div className="header-add"> 
  <div className="status-bar-add">
     <span className="time"> {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span> 
     <div className="status-icons-add"> 
      <svg width="20" height="12" viewBox="0 0 20 12"> 
        <rect x="0" y="9" width="3" height="3" rx="0.6" fill="#000" />
         <rect x="5" y="7" width="3" height="5" rx="0.6" fill="#000" opacity="0.85" /> 
         <rect x="10" y="5" width="3" height="7" rx="0.6" fill="#000" opacity="0.7" />
          <rect x="15" y="3" width="3" height="9" rx="0.6" fill="#000" opacity="0.55" />
           </svg> {/* wifi */} <svg width="20" height="12" viewBox="0 0 24 24">
             <path d="M2 8c5.5-5 14.5-5 20 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
              <path d="M6 12c3.5-3 8.5-3 12 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
               <path d="M10 16c1.5-1 3.5-1 5 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="12.5" cy="19" r="1.2" fill="#000"/> </svg> {/* battery */} <svg width="28" height="12" viewBox="0 0 28 12">
                   <rect x="1" y="1" width="22" height="10" rx="2" fill="none" stroke="#000" strokeWidth="2"/> 
                   <rect x="24" y="4" width="3" height="4" rx="1" fill="#000"/> 
                   <rect x="3" y="3" width="18" height="6" rx="1" fill="#000"/> 
                   </svg> </div> </div> <div className="nav-icons-add"> {/* home */} 
                    <svg width="29" height="30" viewBox="0 0 24 24" fill="none" onClick={ ()=> setPage('Home3')} >
                       <path d="M3 9.5L12 3L21 9.5V20C21 20.55 20.55 21 
                       20 21H15C14.45 21 14 20.55 14 20V15C14 14.45 13.55 
                       14 13 14H11C10.45 14 10 14.45 10 15V20C10 20.55 9.55
                        21 9 21H4C3.45 21 3 20.55 3 20V9.5Z" stroke="#000"
                         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/> 
                         </svg> <div className="bell-container-add"> 
                          <svg width="29" height="30" viewBox="0 0 24 24" fill="none" 
                          stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                          onClick={ ()=>setPage('Notifications')}> <path d="M18 8a6 6 0 10-12 0c0 7-3 7-3 
                          7h18s-3 0-3-7"/> <path d="M13.73 21a2 2 0 01-3.46 0"/>
                           </svg> <span className="green-dot-add"></span>
                            <div className="profile-add"> <svg width="29" height="30"
                             viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2"
                              strokeLinecap="round" strokeLinejoin="round" className="profile-icon-add"onClick={ ()=>setPage('Profile')} > 
                              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                               <circle cx="12" cy="7" r="4"/>
                                </svg> 
                                </div> 
                                </div> 
                                </div> 
                                </div>

        {/* CONTENT */}
        <div className="content-add">
          <button className="signup-button-add2" onClick={() => setPage("ViewMembers")}>
            {t("viewMembers")}
          </button>

          <div className="header-add2">
            <div className="signup-area-add">
              <div className="signup-title-add">{t('addMembers')}!</div>

              <div className="main-content-add">
                <div className="input-group-add">
                  <User size={20} className="icon-add" />
                  <input
                    type="text"
                    placeholder={t("fullName")}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>

                <div className="input-group-add">
                  <Phone size={20} className="icon-add" />
                  <input
                    type="tel"
                    placeholder={t("phone")}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>

                <div className="input-group-add">
                  <Home size={20} className="icon-add" />
                  <input
                    type="email"
                    placeholder={t("email")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="input-group-add">
                  <Lock size={20} className="icon-add" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder={t("password")}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </span>
                </div>

                <div className="input-group-add">
                  <Lock size={20} className="icon-add" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder={t("confirmPassword")}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <span
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </span>
                </div>

                <button className="signup-button-add" onClick={handleSignup}>
                  {t("addMemberButton")}
                </button>
              </div>
            </div>
          </div>
        </div>

        {popup.show && (
          <Popup
            message={popup.message}
            type={popup.type}
            onClose={() => setPopup({ show: false, message: "", type: "" })}
          />
        )}
      </div>
    </>
  );
};




import { collection, getDocs } from "firebase/firestore";
import {  Mail } from "lucide-react";

const ViewMembers = ({ setPage }) => {
  const { t } = useLanguage();
  const [members, setMembers] = useState([]);
  const getAvatarColor = (id) => {
  const colors = ["#007bff", "#28a745", "#ffc107", "#dc3545", "#6f42c1"];
  let index = 0;
  for (let i = 0; i < id.length; i++) {
    index += id.charCodeAt(i);
  }
  return colors[index % colors.length];
};


  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMembers(usersData);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, []);

  return (
    <div className="mobile-frame">
      {/* Header */}
      <div className="header-view">
        <div className="nav-icons-view">
          <svg
            width="29"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            onClick={() => setPage("AddMember")}
          >
            <path
              d="M15 18l-6-6 6-6"
              stroke="#000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h3 className="header-title">{t('familyMembers')}</h3>
        </div>
      </div>

      {/* Content */}
      
      <div className="content-view members-container">
        {members.length === 0 ? (
          <p className="empty-text">{t('noMembers')}.</p>
        ) : (
          <ul className="members-list" style={{listStyleType:"none"}}>
            {members.map((member) => (
<li key={member.id} className="member-card">
  <div className="member-header">
    {member.photoURL ? (
      <img
        src={member.photoURL}
        alt={member.fullName || "Avatar"}
        className="avatar-circle"
        style={{ objectFit: "cover" }}
      />
    ) : (
      <div
        className="avatar-circle"
        style={{ background: getAvatarColor(member.id) }}
      >
        {member.fullName ? member.fullName.charAt(0).toUpperCase() : "?"}
      </div>
    )}
    <div>
      <div className="member-name">{member.fullName}</div>
      <div className="member-email">{member.email}</div>
    </div>
  </div>
  <div className="member-details">
    <Phone size={18} className="member-subicon" />
    <span>{member.phoneNumber}</span>
  </div>
</li>



            ))}
          </ul>
        )}
      </div>
    </div>
  );
};








import { limit } from "firebase/firestore";



// Helper for relative time
const formatTimeAgo = (date) => {
  if (!date) return "Just now";
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr${hours > 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;
  return `${days} day${days > 1 ? "s" : ""} ago`; // fallback for older messages
};

const NotificationsScreen = ({ setPage }) => {
  const { t } = useLanguage();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const messagesRef = collection(db, "chats", "familyBoard", "messages");
    const q = query(messagesRef, orderBy("timestamp", "desc"), limit(4));

    const unsub = onSnapshot(q, (snapshot) => {
      const notifs = snapshot.docs.map((doc) => {
        const data = doc.data();

        // Convert Firestore timestamp to JS Date
        let timestamp = new Date();
        if (data.timestamp && typeof data.timestamp.toDate === "function") {
          timestamp = data.timestamp.toDate();
        }

        return {
          id: doc.id,
          name: data.senderName || "Unknown",
          text: data.text || (data.fileType ? `Sent a ${data.fileType}` : ""),
          avatar: data.senderPic || data.senderName?.charAt(0).toUpperCase() || "👤",
          timestamp,
        };
      });

      setNotifications(notifs.reverse()); // oldest first
    });

    return () => unsub();
  }, []);

  const StatusIcons = () => (
    <div className="status-icons" style={{ display: "flex", gap: "5px" }}>
      <span>📶</span>
      <span>📡</span>
      <span>🔋</span>
    </div>
  );

  return (
    <div className="screen">
      <div className="headernoti">
        <div className="status-bar">
          <span className="time"> {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          <StatusIcons />
        </div>
        <ChevronLeft size={24} className="nav-icon" onClick={() => setPage("Challenges")} />
        <div className="nav-icons">
          <span className="nav-icon-home" onClick={() => setPage("Home3")}>🏠</span>
          <div className="bell-container">
            <span className="nav-icon" onClick={() => setPage("Notifications")}>🔔</span>
            <span className="nav-icon" onClick={() => setPage("Profile")}>👤</span>
          </div>
        </div>
      </div>

      <div className="contentnoti">
        <h2 className="notif-title">{t("notificationsTitle")}</h2>

        {notifications.length === 0 && <p>{t("noNotifications")}</p>}

        {notifications.map((n) => (
          <div
            key={n.id}
            className="notif-card"
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "12px",
              padding: "8px",
              background: "#f9f9f9",
              borderRadius: "20px",
            }}
          >
            <div className="avatar" style={{ marginRight: "10px" }}>
              {n.avatar.startsWith("http") ? (
                <img
                  src={n.avatar}
                  alt={n.name}
                  style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                />
              ) : (
                <span style={{ fontSize: "24px" }}>{n.avatar}</span>
              )}
            </div>

            <div className="notif-text" style={{ flex: 1 }}>
              <div style={{ fontSize: "14px", marginBottom: "4px" }}>
                {n.text && <span>{n.text} </span>}
                <strong>{n.name}</strong>
              </div>

              {/* Relative timestamp only */}
              <div
                style={{
                  fontSize: "12px",
                  color: "gray",
                  textAlign: "right",
                  marginTop: "2px",
                }}
              >
                {formatTimeAgo(n.timestamp)}
              </div>
            </div>
          </div>
        ))}

        <div className="arrow-down" style={{ textAlign: "center", marginTop: "10px" }}>
          <ChevronsDown
            className="ChevronsDown"
            style={{ color: "#fff" }}
            size={41}
            onClick={() => setPage("ChartBoard")}
          />
        </div>
      </div>
    </div>
  );
};








const Home6 = ({ setPage }) => {
  const { t } = useLanguage();
  const [selected, setSelected] = useState("B");
const answers = [
  { id: "A", text: t("answer1A") },
  { id: "B", text: t("answer1B") },
  { id: "C", text: t("answer1C") },
  { id: "D", text: t("answer1D") },
];

  const StatusIcons = () => (
    <div className="status-icons" style={{ display: 'flex', gap: '6px' }}>
      <svg width="20" height="12" viewBox="0 0 20 12">
        <rect x="0" y="9" width="3" height="3" rx="0.6" fill="#000" />
        <rect x="5" y="7" width="3" height="5" rx="0.6" fill="#000" opacity="0.85" />
        <rect x="10" y="5" width="3" height="7" rx="0.6" fill="#000" opacity="0.7" />
        <rect x="15" y="3" width="3" height="9" rx="0.6" fill="#000" opacity="0.55" />
      </svg>
      <svg width="20" height="12" viewBox="0 0 24 24">
        <path d="M2 8c5.5-5 14.5-5 20 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" />
        <path d="M6 12c3.5-3 8.5-3 12 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" />
        <path d="M10 16c1.5-1 3.5-1 5 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="20" r="1.5" fill="#000" />
      </svg>
    </div>
  );

  return (
    <div className="quiz-wrapper">
      <div className="header-section">
        <div className="status-bar">
          <span className="time"> {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          <StatusIcons />
        </div>
        <div className="nav-icons">
          <Home size={22} color="#000" onClick={() => setPage('Home3')} />
          <div className="right-icons">
            <div className="bell-wrapper">
              <Bell size={22} color="#000" onClick={() => setPage('Notifications')} />
              <span className="notification-dot"></span>
            </div>
            <User size={22} color="#000" onClick={() => setPage('Profile')} />
          </div>
        </div>
      </div>

      <div className="main-section">
        <p className="quiz-title">{t("familyProblemsQuiz")}</p>
        <p className="quiz-question-number">
          <span className="question-white">{t("question")}</span>{" "}
          <span className="number-highlight">01</span>
          <span className="total-black">/05</span>
        </p>
        <p className="quiz-question">
          {t("quizQuestion1")}
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
          <span className="dot white"></span>
        </div>
        <div className="btns">
            <ChevronLeft size={33} style={{color:'#fff'}} onClick={()=> setPage('StartQuiz')}></ChevronLeft> <span style={{color:'#fff'}}>............  1 / 5  ............</span>
            <ChevronRight size={33} style={{color:'#fff'}} onClick={()=> setPage('QuizPage2')}></ChevronRight> 
         </div>
      </div>
    </div>
  );
};


const Home7 = ({ setPage }) => {
  const { t } = useLanguage();
  const [selected, setSelected] = useState("C");
  const answers = [
    { id: "A", text: t("answer3A")  },
    { id: "B", text: t("answer3B")  },
    { id: "C", text: t("answer3C") },
    { id: "D", text:t("answer3D") },
  ];

  const StatusIcons = () => (
    <div className="status-icons" style={{ display: 'flex', gap: '6px' }}>
      <svg width="20" height="12" viewBox="0 0 20 12">
        <rect x="0" y="9" width="3" height="3" rx="0.6" fill="#000" />
        <rect x="5" y="7" width="3" height="5" rx="0.6" fill="#000" opacity="0.85" />
        <rect x="10" y="5" width="3" height="7" rx="0.6" fill="#000" opacity="0.7" />
        <rect x="15" y="3" width="3" height="9" rx="0.6" fill="#000" opacity="0.55" />
      </svg>
      <svg width="20" height="12" viewBox="0 0 24 24">
        <path d="M2 8c5.5-5 14.5-5 20 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" />
        <path d="M6 12c3.5-3 8.5-3 12 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" />
        <path d="M10 16c1.5-1 3.5-1 5 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="20" r="1.5" fill="#000" />
      </svg>
    </div>
  );

  return (
    <div className="quiz-wrapper">
      <div className="header-section">
        <div className="status-bar">
          <span className="time"> {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          <StatusIcons />
        </div>
        <div className="nav-icons">
          <Home size={22} color="#000" onClick={() => setPage('Home3')} />
          <div className="right-icons">
            <div className="bell-wrapper">
              <Bell size={22} color="#000" onClick={() => setPage('Notifications')} />
              <span className="notification-dot"></span>
            </div>
            <User size={22} color="#000" onClick={() => setPage('Profile')} />
          </div>
        </div>
      </div>

      <div className="main-section">
        <p className="quiz-title">{t("familyProblemsQuiz")}</p>
        <p className="quiz-question-number">
          <span className="question-white">{t("question")}</span>{" "}
          <span className="number-highlight">03</span>
          <span className="total-black">/05</span>
        </p>
        <p className="quiz-question">
          {t("quizQuestion3")}
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
          <span className="dot blue"></span>
          <span className="dot blue"></span>
          <span className="dot white"></span>
          <span className="dot white"></span>
        </div>
        <div className="btns">
            <ChevronLeft size={33} style={{color:'#fff'}} onClick={()=> setPage('QuizPage2')}></ChevronLeft> <span style={{color:'#fff'}}>............  3 / 5  ............</span>
            <ChevronRight size={33} style={{color:'#fff'}} onClick={()=> setPage('QuizPage3')}></ChevronRight> 
         </div>
      </div>
    </div>
  );
};


const Home8 = ({ setPage }) => {
  const { t } = useLanguage();
  const [selected, setSelected] = useState("B");
  const answers = [
    { id: "A", text: t("answer5A")  },
    { id: "B", text: t("answer5B")  },
    { id: "C", text: t("answer5C") },
    { id: "D", text:t("answer5D") },
  ];

  const StatusIcons = () => (
    <div className="status-icons" style={{ display: 'flex', gap: '6px' }}>
      <svg width="20" height="12" viewBox="0 0 20 12">
        <rect x="0" y="9" width="3" height="3" rx="0.6" fill="#000" />
        <rect x="5" y="7" width="3" height="5" rx="0.6" fill="#000" opacity="0.85" />
        <rect x="10" y="5" width="3" height="7" rx="0.6" fill="#000" opacity="0.7" />
        <rect x="15" y="3" width="3" height="9" rx="0.6" fill="#000" opacity="0.55" />
      </svg>
      <svg width="20" height="12" viewBox="0 0 24 24">
        <path d="M2 8c5.5-5 14.5-5 20 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" />
        <path d="M6 12c3.5-3 8.5-3 12 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" />
        <path d="M10 16c1.5-1 3.5-1 5 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="20" r="1.5" fill="#000" />
      </svg>
    </div>
  );

  return (
    <div className="quiz-wrapper">
      <div className="header-section">
        <div className="status-bar">
          <span className="time"> {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          <StatusIcons />
        </div>
        <div className="nav-icons">
          <Home size={22} color="#000" onClick={() => setPage('Home3')} />
          <div className="right-icons">
            <div className="bell-wrapper">
              <Bell size={22} color="#000" onClick={() => setPage('Notifications')} />
              <span className="notification-dot"></span>
            </div>
            <User size={22} color="#000" onClick={() => setPage('Profile')} />
          </div>
        </div>
      </div>

      <div className="main-section">
        <p className="quiz-title">{t("familyProblemsQuiz")}</p>
        <p className="quiz-question-number">
          <span className="question-white">{t("question")}</span>{" "}
          <span className="number-highlight">05</span>
          <span className="total-black">/05</span>
        </p>
        <p className="quiz-question">
          {t("quizQuestion5")}
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
          <span className="dot blue"></span>
          <span className="dot blue"></span>
          <span className="dot blue"></span>
          <span className="dot blue"></span>
        </div>
        <div className="btns">
            <ChevronLeft size={33} style={{color:'#fff'}} onClick={()=> setPage('QuizPage3')}></ChevronLeft> <span style={{color:'#fff'}}>............  5 / 5  ............</span>
            <ChevronRight size={33} style={{color:'#fff'}} onClick={()=> setPage('Challenges')}></ChevronRight> 
         </div>
      </div>
    </div>
  );
};




import { useRef } from "react";
import {
  
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  deleteDoc,
 
  updateDoc,
  arrayUnion
} from "firebase/firestore";
import EmojiPicker from "emoji-picker-react";
 // <- adjust path if needed
import "./ChartBoard.css";

/**
 * NOTE:
 * - Make sure EmojiPicker is installed: npm i emoji-picker-react
 * - Replace Cloudinary config in uploadToCloudinary below with your cloud name & preset.
 */

/* ---------------- Cloudinary upload utility ---------------- */
const uploadToCloudinary = async (file) => {
  if (!file) return null;
  const formData = new FormData();
  formData.append("file", file);

  // <<-- REPLACE these with your values
  formData.append("upload_preset", "charts_preset");
  const cloudName = "dzorwdfjc"; // replace with yours
  // ----------------------------------------------------------

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
    { method: "POST", body: formData }
  );
  const data = await response.json();
  return {
    url: data.secure_url,
    resource_type: data.resource_type || (file.type.startsWith("audio") ? "audio" : "image"),
  };
};

/* ---------------- Timestamp formatter ---------------- */
const formatTimestamp = (ts) => {
  if (!ts) return "";
  try {
    const d = ts.toDate();
    return d.toLocaleString();
  } catch {
    return "";
  }
};

/* ---------------- ChartBoard Component ---------------- */





const ChartBoard = ({ setPage }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [file, setFile] = useState(null);
  const [showBottomEmoji, setShowBottomEmoji] = useState(false);
  const [pickerFor, setPickerFor] = useState(null);
  const [showMenuFor, setShowMenuFor] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [editMessageId, setEditMessageId] = useState(null);
  const [editText, setEditText] = useState("");
  const [theme, setTheme] = useState("black");
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [confirmPopup, setConfirmPopup] = useState({
  visible: false,
  title: "",
  message: "",
  onConfirm: null,
  onCancel: null,
});

// helper to show confirm
const showConfirmPopup = (title, message, onConfirm, onCancel = () => setConfirmPopup({ visible: false })) => {
  setConfirmPopup({ visible: true, title, message, onConfirm, onCancel });
};

  // popup states
  const [popup, setPopup] = useState({ visible: false, title: "", message: "" });
  

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const messagesEndRef = useRef(null);
  const messagesCollectionPath = collection(db, "chats", "familyBoard", "messages");

  const currentUid = auth?.currentUser?.uid;
  const currentName = auth?.currentUser?.email || auth?.currentUser?.displayName || "You";

  // realtime subscription
  useEffect(() => {
    const q = query(messagesCollectionPath, orderBy("timestamp", "asc"));
    const unsub = onSnapshot(q, (snap) => {
      setMessages(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, []);

  // auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  const showPopup = (title, message) => setPopup({ visible: true, title, message });
  const closePopup = () => setPopup({ visible: false, title: "", message: "" });

  const detectFileType = (filename) => {
    const ext = filename.split(".").pop().toLowerCase();
    if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) return "image";
    if (["mp3", "wav", "ogg", "webm"].includes(ext)) return "audio";
    if (["mp4", "mov", "avi", "mkv"].includes(ext)) return "video";
    if (["pdf", "doc", "docx", "txt", "ppt", "pptx"].includes(ext)) return "doc";
    return "raw";
  };

  const isImage = (url) => typeof url === "string" && url.match(/\.(jpeg|jpg|png|gif)$/i);
  const isAudio = (url) => typeof url === "string" && url.match(/\.(webm|wav|mp3|ogg)$/i);
  const isVideo = (url) => typeof url === "string" && url.match(/\.(mp4|mov|avi|mkv|webm)$/i);
  const isDoc = (url) => typeof url === "string" && url.match(/\.(pdf|docx?|txt|pptx?)$/i);

  const groupedReactions = (reactions = []) => {
    const map = new Map();
    reactions.forEach((r) => map.set(r.emoji, (map.get(r.emoji) || 0) + 1));
    return Array.from(map.entries());
  };

  // send message
  const sendMessage = async () => {
    if (!newMessage && !file) return;

    let fileUrl = null;
    let fileType = null;

    if (file) {
      try {
        const uploaded = await uploadToCloudinary(file);
        fileUrl = uploaded.secure_url || uploaded.url || null;
        fileType = uploaded.resource_type || detectFileType(file.name);
      } catch (err) {
        console.error("Upload failed", err);
        return showPopup("Upload Error", "File upload failed. Check console.");
      }
    }

    let senderName = "Unknown";
    let senderPic = null;

    if (auth.currentUser) {
      const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        senderName = data.fullName || auth.currentUser.email;
        senderPic = data.photoURL || null;
      } else senderName = auth.currentUser.email;
    }

    try {
      if (editMessageId) {
        await updateDoc(doc(db, "chats", "familyBoard", "messages", editMessageId), {
          text: newMessage,
          fileUrl,
          fileType,
          timestamp: serverTimestamp(),
        });
        setEditMessageId(null);
      } else {
        await addDoc(messagesCollectionPath, {
          senderId: auth.currentUser?.uid || "guest",
          senderName,
          senderPic,
          text: newMessage,
          replyTo,
          fileUrl,
          fileType,
          timestamp: serverTimestamp(),
        });
      }
      setNewMessage("");
      setFile(null);
      setReplyTo(null);
    } catch (err) {
      console.error("Message send failed", err);
      showPopup("Send Error", "Failed to send message. Check console.");
    }
  };

  // reactions
  const addReaction = async (messageId, emoji) => {
    try {
      await updateDoc(doc(db, "chats", "familyBoard", "messages", messageId), {
        reactions: arrayUnion({ uid: currentUid || "guest", emoji }),
      });
    } catch (err) {
      console.error("Reaction failed", err);
      showPopup("Reaction Error", "Failed to add reaction.");
    } finally {
      setPickerFor(null);
    }
  };

  // copy message
  const copyText = async (text) => {
    try {
      if (!text) return;
      await navigator.clipboard.writeText(text);
      showPopup("Copied!", "Message text copied to clipboard.");
    } catch (err) {
      console.warn("Copy failed", err);
      showPopup("Copy Error", "Failed to copy text.");
    } finally {
      setShowMenuFor(null);
    }
  };

  // unsend message
const unsendMessage = async (messageId, msgSenderId) => {
  if (!currentUid || currentUid !== msgSenderId) {
    return showPopup("Permission Denied", "You can only unsend your own messages.");
  }

  showConfirmPopup(
    "Confirm Unsend",
    "Unsend this message for everyone?",
    async () => {
      try {
        await deleteDoc(doc(db, "chats", "familyBoard", "messages", messageId));
      } catch (err) {
        console.error("Delete failed", err);
        showPopup("Delete Error", "Failed to unsend message.");
      } finally {
        setShowMenuFor(null);
        setConfirmPopup({ visible: false });
      }
    },
    () => setConfirmPopup({ visible: false }) // cancel
  );
};

  // reply
  const startReplyTo = (msg) => setReplyTo({ id: msg.id, text: msg.text, senderName: msg.senderName });

  // recording
  const startRecording = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      return showPopup("Recording Not Supported", "This browser does not support audio recording.");
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      mediaRecorderRef.current = mr;
      audioChunksRef.current = [];

      mr.ondataavailable = (e) => audioChunksRef.current.push(e.data);
      mr.onstop = async () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const fileForUpload = new File([blob], `voice-${Date.now()}.webm`, { type: "audio/webm" });
        try {
          const uploaded = await uploadToCloudinary(fileForUpload);
          if (uploaded) {
            await addDoc(messagesCollectionPath, {
              senderId: currentUid || "guest",
              senderName: currentName,
              text: "",
              fileUrl: uploaded.url,
              fileType: uploaded.resource_type || "audio",
              replyTo: replyTo ? { ...replyTo } : null,
              reactions: [],
              timestamp: serverTimestamp(),
            });
          }
        } catch (err) {
          console.error("Recording upload failed", err);
          showPopup("Upload Error", "Failed to upload recorded audio.");
        }
        setIsRecording(false);
        setReplyTo(null);
      };

      mr.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Recording error", err);
      showPopup("Recording Error", err.message || "Could not start recording.");
    }
  };

  const stopRecording = () => mediaRecorderRef.current?.stop();

  const editMessage = (messageId, text) => {
    setEditMessageId(messageId);
    setNewMessage(text);
    setShowMenuFor(null);
  };

  const changeTheme = (selectedTheme) => {
    setTheme(selectedTheme);
    setShowThemeMenu(false);
  };

  return (
    <div className="chat-board">
      <ChevronLeft size={30} onClick={() => setPage("Notifications")} />
      <h2>Family Chat Board</h2>

      <div className="messages">
        {messages.map((msg) => {
          const mine = msg.senderId === currentUid;
          return (
            <div key={msg.id} className={`message ${mine ? "message--me" : "message--other"}`}>
              <div className="message-row">
                <div className="avatar-chart">
                  {msg.senderPic ? <img src={msg.senderPic} alt={msg.senderName} className="avatar-img-chart" /> : msg.senderName?.charAt(0).toUpperCase() || "?"}
                </div>
                <div className="bubble-wrap">
                  <div className="message-header">
                    <span className="sender-name">{msg.senderName}</span>
                    <span className="timestamp">{formatTimestamp(msg.timestamp)}</span>
                  </div>

                  {msg.replyTo && (
                    <div className="reply-preview">
                      <span className="reply-label">You replied to {msg.replyTo.senderName}:</span>
                      <div className="reply-text">{msg.replyTo.text}</div>
                    </div>
                  )}

                  <div className="bubble">
                    {msg.text && <p className="bubble-text">{msg.text}</p>}
                    {isAudio(msg.fileUrl) ? (
                      <audio controls src={msg.fileUrl} className="chat-audio" />
                    ) : isVideo(msg.fileUrl) ? (
                      <video controls src={msg.fileUrl} className="chat-video" />
                    ) : isImage(msg.fileUrl) ? (
                      <img src={msg.fileUrl} alt="uploaded" className="chat-image" />
                    ) : isDoc(msg.fileUrl) ? (
                      <a href={msg.fileUrl} target="_blank" rel="noreferrer" className="file-link">📎 Open document</a>
                    ) : null}
                  </div>

                  {msg.reactions?.length > 0 && (
                    <div className="reactions">
                      {groupedReactions(msg.reactions).map(([emoji, count]) => (
                        <div key={emoji} className="reaction-pill">{emoji} {count}</div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="message-actions">
                  <button className="action-btn" title="React" onClick={() => setPickerFor(pickerFor === msg.id ? null : msg.id)}>😊</button>
                  <button className="action-btn" title="Reply" onClick={() => startReplyTo(msg)}>↩</button>

                  <div className="three-dots">
                    <button className="action-btn" onClick={() => setShowMenuFor(showMenuFor === msg.id ? null : msg.id)} title="More">⋯</button>

                    {showMenuFor === msg.id && (
                      <div className="menu-dropdown">
                        <button onClick={() => copyText(msg.text)}>Copy</button>
                        {mine && <button onClick={() => editMessage(msg.id, msg.text)}>Edit</button>}
                        {mine && <button onClick={() => unsendMessage(msg.id, msg.senderId)}>Unsend</button>}
                      </div>
                    )}
                  </div>

                  {pickerFor === msg.id && (
                    <div className="inline-emoji-picker">
                      <EmojiPicker onEmojiClick={(e) => addReaction(msg.id, e.emoji)} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {replyTo && (
        <div className="replying-to">
          Replying to <strong>{replyTo.senderName}</strong>: "{replyTo.text}"
          <button className="cancel-reply" onClick={() => setReplyTo(null)}>✕</button>
        </div>
      )}

      <div className="input-area">
        {editMessageId && <button className="cancel-edit" title="Cancel editing" onClick={() => { setEditMessageId(null); setNewMessage(""); }}>×</button>}

        <div className="left-controls">
          <button className="icon-btn" onClick={() => setShowBottomEmoji(!showBottomEmoji)}>😊</button>
          <button className={`icon-btn ${isRecording ? "recording" : ""}`} onMouseDown={startRecording} onMouseUp={stopRecording}>🎙</button>
          <label className="file-label" title="Attach image or file">
            📎
            <input type="file" accept="image/*,audio/*" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} />
          </label>
        </div>

        <input type="text" placeholder="Message..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") sendMessage(); }} />
        <button className="send-btn" onClick={sendMessage}>Send</button>

        {showBottomEmoji && (
          <div className="bottom-emoji-pop">
            <EmojiPicker onEmojiClick={(ev) => setNewMessage((m) => m + ev.emoji)} />
          </div>
        )}
      </div>

      {/* Popup */}
      {popup.visible && (
        <div className="popup-overlay">
          <div className="popup-card">
            <button className="popup-close" onClick={closePopup}>✖</button>
            <h3>{popup.title}</h3>
            <p>{popup.message}</p>
          </div>
          <style>{`
            .popup-overlay {
              position: fixed; inset: 0;
              background: rgba(0,0,0,0.6);
              display: flex; align-items: center; justify-content: center;
              z-index: 9999;
            }
            .popup-card {
              background: #fff; padding: 24px; border-radius: 16px; width: 90%; max-width: 420px;
              box-shadow: 0 8px 40px rgba(0,0,0,0.3); position: relative;
              animation: slideIn 0.3s ease-out;
            }
            @keyframes slideIn { from { transform: translateY(-30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
            .popup-close {
              position: absolute; top: 12px; right: 12px; border: none; background: none; font-size: 20px; cursor: pointer;
            }
            .popup-card h3 { margin-top: 0; }
          `}</style>
        </div>
      )}
      {/* Confirm Popup */}
{confirmPopup.visible && (
  <div className="popup-overlay">
    <div className="popup-card">
      <h3>{confirmPopup.title}</h3>
      <p>{confirmPopup.message}</p>
      <div className="popup-buttons">
        <button onClick={confirmPopup.onConfirm}>Yes</button>
        <button onClick={confirmPopup.onCancel}>No</button>
      </div>
    </div>
    <style>{`
      .popup-overlay {
        position: fixed; inset: 0;
        background: rgba(0,0,0,0.6);
        display: flex; align-items: center; justify-content: center;
        z-index: 9999;
      }
      .popup-card {
        background: #fff; padding: 24px; border-radius: 16px; width: 90%; max-width: 420px;
        box-shadow: 0 8px 40px rgba(0,0,0,0.3); position: relative;
        animation: slideIn 0.3s ease-out;
        color: black;
      }
      .popup-buttons {
        display: flex; justify-content: flex-end; gap: 12px; margin-top: 16px;
      }
      .popup-buttons button {
        padding: 8px 16px; border-radius: 8px; border: none; cursor: pointer;
      }
      .popup-buttons button:first-child { background: #d9534f; color: white; }
      .popup-buttons button:last-child { background: #ccc; color: black; }
      @keyframes slideIn { from { transform: translateY(-30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    `}</style>
  </div>
)}

    </div>
  );
};









import axios from "axios";
import { getDoc } from "firebase/firestore";
import { updatePassword, updateEmail } from "firebase/auth";
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";


const CLOUD_NAME = "dzorwdfjc"; // from Cloudinary
const UPLOAD_PRESET = "profile_upload"; // create this in Cloudinary dashboard

const ProfileScreen = ({ setPage }) => {
  const { user, logout } = useAuth();
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [displayName, setDisplayName] = useState("No Name");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("********");
  const [showPassword, setShowPassword] = useState(false);
  // password change state (add near your other state declarations)
const [newPassword, setNewPassword] = useState("");
const [showNewPassword, setShowNewPassword] = useState(false);
const [currentPassword, setCurrentPassword] = useState("");
const [saving, setSaving] = useState(false);
const [showImageErrorPopup, setShowImageErrorPopup] = useState(false);
const [imageErrorMessage, setImageErrorMessage] = useState("");
const [showImagePopup, setShowImagePopup] = useState(false);







  // new state for popup
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPhone, setEditPhone] = useState("");

  // Load profile picture URL from Firestore
useEffect(() => {
  const fetchProfile = async () => {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const snap = await getDoc(userRef);

    if (!snap.exists()) {
      // Create default document if missing
      await setDoc(userRef, {
        fullName: user.email.split("@")[0], // default
        email: user.email,
        phoneNumber: "",
        photoURL: "",
      });
      setDisplayName(user.email.split("@")[0]);
      setProfilePic(null);
       setPhoneNumber("");
    } else {
        const data = snap.data();
        setDisplayName(data.fullName || user.email.split("@")[0]);
        setProfilePic(data.photoURL || null);
        setPhoneNumber(data.phoneNumber || "");
        setEditName(data.fullName || "");
        setEditEmail(data.email || "");
        setEditPhone(data.phoneNumber || "");
      }
    setLoading(false);
  };

  fetchProfile();
}, [user]);

  // submit handler
const handleEditSubmit = async (e) => {
  e.preventDefault();
  if (!user) return;

  setSaving(true); // show loading

  try {
    // reauthenticate if needed
    if (currentPassword) {
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
    }

    const userRef = doc(db, "users", user.uid);

    // update Firestore
    await setDoc(
      userRef,
      {
        fullName: editName,
        email: editEmail,
        phoneNumber: editPhone,
      },
      { merge: true }
    );

    // update Firebase email if changed
    if (editEmail && editEmail !== user.email) {
      await updateEmail(user, editEmail);
    }

    // update password if provided
    if (newPassword) {
      if (newPassword.length < 6) throw new Error("Password must be at least 6 characters.");
      await updatePassword(user, newPassword);
    }

    // update UI data
    setDisplayName(editName);
    setPhoneNumber(editPhone);
    setNewPassword("");
    setCurrentPassword("");
    setShowNewPassword(false);

    // simulate a short delay before redirect
    setTimeout(() => {
      setSaving(false);
      setShowEditPopup(false);
      setPage("Profile"); // reload or redirect back
    }, 1000);

  } catch (err) {
    console.error("Profile update failed:", err);
    setTimeout(() => {
      setSaving(false);
      setShowEditPopup(false);
      setPage("Profile");
    }, 1000);
  }
};



  // Upload image to Cloudinary
const handleImageChange = async (e) => {
  const file = e.target.files[0];
  if (!file || !user) return;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  try {
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      formData
    );

    const url = res.data.secure_url;
    if (!url) throw new Error("Upload failed, no URL returned");

    // Save URL to Firestore
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, { photoURL: url }, { merge: true });

    // Update state so avatar re-renders
    setProfilePic(url);
  } catch (err) {
    console.error("Upload failed:", err);

    // Show popup instead of alert
    setImageErrorMessage("Image upload failed. Check console.");
    setShowImageErrorPopup(true);
  }
};

if (saving) {
  return (
    <>
      <style>
        {`
          .saving-overlay {
            position: fixed;
            inset: 0;
            background: rgba(255, 255, 255, 0.9);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 10000;
          }
          .saving-spinner {
            width: 80px;
            height: 80px;
            border: 8px solid #ddd;
            border-top: 8px solid #0d6efd;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          .saving-text {
            margin-top: 16px;
            font-size: 18px;
            font-weight: 600;
            color: #333;
          }
        `}
      </style>

      <div className="saving-overlay">
        <div className="saving-spinner"></div>
        <p className="saving-text">Saving changes...</p>
      </div>
    </>
  );
}


if (loading) {
  return (
    <>
      <style>
        {`
          .loading-screen {
            position: fixed;
            inset: 0; /* full screen */
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            background: linear-gradient(135deg, #0d6efd, #6610f2);
            z-index: 9999;
            gap: 24px;
          }
          .spinner {
            width: 120px;   /* bigger size */
            height: 120px;
            border-radius: 50%;
            border: 12px solid rgba(255, 255, 255, 0.25);
            border-top-color: #fff;
            animation: spin 1.2s linear infinite;
            box-shadow: 0 10px 30px rgba(0,0,0,0.25);
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          .loading-text {
            font-size: 22px;
            font-weight: 600;
            color: #fff;
            text-shadow: 0 3px 10px rgba(0,0,0,0.25);
            animation: fadePulse 1.9s ease-in-out infinite;
          }
          @keyframes fadePulse {
            0%,100% { opacity: 0.3; }
            50% { opacity: 1; }
          }
        `}
      </style>

      <div className="loading-screen">
        <div className="spinner"></div>
        <p className="loading-text">Loading your profile...</p>
      </div>
    </>
  );
}


  const displayLetter = user?.email ? user.email[0].toUpperCase() : "?";

    const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    localStorage.removeItem("lastPage");
    setPage("LoginForm");
  };

  return (
    <div className="screen-profile">
      <div className="header-profile">
        <ChevronLeft
          size={24}
          className="nav-icon"
          onClick={() => setPage("Activities")}
        />
        <h2>Profile</h2>
      </div>

      <div className="profile-card">
<div className="avatar-wrapper">
  {profilePic ? (
    <img
      src={profilePic}
      alt={`${displayLetter}`}
      className="avatar-img"
      onClick={() => setShowImagePopup(true)} // open popup on click
      style={{ cursor: "pointer" }}
    />
  ) : (
    <div className="avatar-circle-profile">{displayLetter}</div>
  )}

  {/* + sign below avatar */}
  <label className="avatar-upload">
    +
    <input
      type="file"
      accept="image/*"
      onChange={handleImageChange}
      style={{ display: "none" }}
    />
  </label>
</div>

        <h3>{displayName}</h3>
                {/* User Info with icons */}
        <div className="profile-info">
          {/* Email */}
          <div className="info-row">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 16 16"
              className="info-icon"
            >
              <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4z"/>
              <path d="M.05 4.555L8 9.414l7.95-4.86A1.99 1.99 0 0 0 14 4H2c-.265 0-.52.104-.707.293z"/>
            </svg>
            <span className="info-text">{user?.email || "No email"}</span>
          </div>

          {/* Password */}
          <div className="info-row">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 16 16"
              className="info-icon"
            >
              <path d="M8 1a4 4 0 0 0-4 4v2H3a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1h-1V5a4 4 0 0 0-4-4zM5 5a3 3 0 0 1 6 0v2H5V5z"/>
            </svg>
            <span className="info-text">{showPassword ? "userpassword123" : "********"}</span>
            <button
              className="eye-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"} {/* replace with professional icon if needed */}
            </button>
          </div>

          {/* Phone number */}
          <div className="info-row">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 16 16"
              className="info-icon"
            >
              <path d="M3.654 1.328a.678.678 0 0 1 .738-.071l2.261 1.13c.329.164.445.566.278.896L6.44 4.516a11.478 11.478 0 0 0 5.045 5.045l.233-.492a.678.678 0 0 1 .896.278l1.13 2.26a.678.678 0 0 1-.071.738l-1.018 1.518a1.745 1.745 0 0 1-1.678.768c-2.447-.436-4.895-2.02-7.268-4.393-2.373-2.373-3.957-4.82-4.393-7.268a1.745 1.745 0 0 1 .768-1.678L3.654 1.328z"/>
            </svg>
            <span className="info-text">{phoneNumber || "No phone number"}</span>
          </div>
        </div>

<div className="profile-buttons">
  <button className="btn-edit" onClick={() => setShowEditPopup(true)}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="currentColor"
      viewBox="0 0 16 16"
      className="btn-icon"
    >
      <path d="M15.502 1.94a.5.5 0 0 1 0 .706l-1 1a.5.5 0 0 1-.708 0L10.5 1.854 14.146 0l1.356 1.94zM1 13.5V16h2.5l9.147-9.146-2.5-2.5L1 13.5z"/>
    </svg>
    Edit Profile
  </button>

  <button className="btn-logout"
      onClick={handleLogout}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="currentColor"
      viewBox="0 0 16 16"
      className="btn-icon"
    >
      <path d="M6 2a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v3h-1V2H7v12h5v-3h1v3a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V2z"/>
      <path d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
    </svg>
    Logout
  </button>
</div>

      </div>
      {showEditPopup && (
  <>
    <style>
      {`
        .popup-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }
        .popup-card {
          background: #fff;
          width: 90%;
          max-width: 420px;
          padding: 24px;
          border-radius: 16px;
          box-shadow: 0 8px 40px rgba(0,0,0,0.3);
          position: relative;
          animation: slideIn 0.3s ease-out;
        }
        @keyframes slideIn {
          from { transform: translateY(-30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .popup-close {
          position: absolute;
          top: 12px;
          right: 12px;
          font-size: 20px;
          background: none;
          border: none;
          cursor: pointer;
          color: #555;
        }
        .popup-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-top: 16px;
        }
        .popup-input {
          width: 100%;
          padding: 12px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 15px;
        }
        .popup-btn {
          background: linear-gradient(135deg, #0d6efd, #6610f2);
          border: none;
          padding: 12px;
          border-radius: 10px;
          color: #fff;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.2s;
        }
        .popup-btn:hover {
          opacity: 0.9;
        }
      `}
    </style>

    <div className="popup-overlay">
      <div className="popup-card">
        <button className="popup-close" onClick={() => setShowEditPopup(false)}>✖</button>
        <h3>Edit Profile</h3>
        <form className="popup-form" onSubmit={handleEditSubmit}>
          <input
            className="popup-input"
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            placeholder="Full Name"
          />
          <input
            className="popup-input"
            type="email"
            value={editEmail}
            onChange={(e) => setEditEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            className="popup-input"
            type="tel"
            value={editPhone}
            onChange={(e) => setEditPhone(e.target.value)}
            placeholder="Phone Number"
          />
          <div>
  <input
    className="popup-input"
    type="password"
    value={currentPassword}
    onChange={(e) => setCurrentPassword(e.target.value)}
    placeholder="Current Password"
  />
</div>

 {/* NEW Password input with toggle */}
<div style={{ position: "relative" }}>
  <input
    className="popup-input"
    type={showNewPassword ? "text" : "password"}
    value={newPassword}
    onChange={(e) => setNewPassword(e.target.value)}
    placeholder="New Password (min 6 chars)"
  />
  <button
    type="button"                       /* VERY IMPORTANT */
    onClick={() => setShowNewPassword((s) => !s)}
    style={{
      position: "absolute",
      right: "12px",
      top: "50%",
      transform: "translateY(-50%)",
      border: "none",
      background: "none",
      cursor: "pointer",
      fontSize: "16px",
      color: "#555",
    }}
    aria-label={showNewPassword ? "Hide password" : "Show password"}
  >
    {showNewPassword ? "🙈" : "👁️"}
  </button>
</div>


          <button className="popup-btn" type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  </>
)}

{showImageErrorPopup && (
  <>
    <div className="popup-overlay">
      <div className="popup-card">
        <button
          className="popup-close"
          onClick={() => setShowImageErrorPopup(false)}
        >
          ✖
        </button>
        <h3>Error</h3>
        <p>{imageErrorMessage}</p>
        <button
          className="popup-btn"
          onClick={() => setShowImageErrorPopup(false)}
        >
          OK
        </button>
      </div>
    </div>
  </>
)}

{showImagePopup && (
  <div className="popup-overlay">
    <div className="popup-card">
      <button
        className="popup-close"
        onClick={() => setShowImagePopup(false)}
      >
        ✖
      </button>
      <h3>Profile Picture</h3>
      <img
        src={profilePic}
        alt="Profile"
        style={{ width: "100%", borderRadius: "12px" }}
      />
      <button
        className="popup-btn"
        style={{ background: "#dc3545", marginTop: "12px" }}
        onClick={async () => {
          try {
            const userRef = doc(db, "users", user.uid);
            await setDoc(userRef, { photoURL: "" }, { merge: true });
            setProfilePic(null);
            setShowImagePopup(false);
          } catch (err) {
            console.error("Failed to delete image:", err);
          }
        }}
      >
        Delete Photo
      </button>
    </div>
  </div>
)}


    </div>
  );
};




import { LanguageProvider } from "./LanguageContext.jsx";
import { 
  onAuthStateChanged,
  signOut
} from "firebase/auth";

export default function App() {
  const [user, setUser] = useState(null);
   const [page, setPage] = useState(localStorage.getItem("lastPage") || "Home3");
    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // Restore last visited page, default to StartQuiz after login
        const savedPage = localStorage.getItem("lastPage") || "StartQuiz";
        setPage(savedPage);
      } else {
        setUser(null);
        setPage("LoginForm"); // redirect to login if not logged in
      }
    });

    return () => unsubscribe();
  }, []);

  // Save page whenever it changes and user is logged in
  useEffect(() => {
    if (user) {
      localStorage.setItem("lastPage", page);
    }
  }, [page, user]);


  return (
    <LanguageProvider>
    <div>
      <style>{customStyles}</style>

      {page === "Home3" && <Home3 setPage={setPage} />}
      {page === "Home2" && <Home2 setPage={setPage} />}
      {page === "SignupForm" && <SignupForm setPage={setPage} />}
      {page === "LoginForm" && <LoginForm setPage={setPage} />}
      {page === "QuizPage2" &&  <QuizPage2 setPage={setPage}  />}
      {page === "QuizPage3" &&  <QuizPage3 setPage={setPage}  />}
      {page === "Challenges" && <ChallengesScreen setPage={setPage} />}
      {page === "Challenges2" && <ChallengesScreen2 setPage={setPage} />}
      {page === "Challenges3" && <ChallengesScreen3 setPage={setPage} />}
      {page === "Challenges4" && <ChallengesScreen4 setPage={setPage} />}
      {page === "Activities" && <ActivitiesScreen setPage={setPage} />}
      {page === "Notifications" && <NotificationsScreen setPage={setPage} />}
      {page === "Profile" && <ProfileScreen setPage={setPage} />}
      {page === "StartQuiz" && <StartQuiz setPage={setPage} /> }
      {page === "AddMember" && <AddMember setPage={setPage} />}
      {page === "ViewMembers" && <ViewMembers setPage={setPage} />}
      {page === "Home6" && <Home6 setPage={setPage} />}
      {page === "Home7" && <Home7 setPage={setPage} />}
      {page === "Home8" && <Home8 setPage={setPage} />}
      {page === "ChartBoard" && <ChartBoard setPage={setPage} />}



    </div>
  </LanguageProvider>
  );
}
