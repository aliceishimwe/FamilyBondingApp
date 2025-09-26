// // import React, { useState } from "react";
// // import "./QuizPage2.css";
// // import { Home, Bell, User } from "lucide-react";

// // function QuizPage2() {
// //   const [selected, setSelected] = useState("B");

// //   const answers = [
// //     { id: "A", text: "Gufasha abandi mu byo bakeneye" },
// //     { id: "B", text: "Kuganira kenshi tugahana amakuru" },
// //     { id: "C", text: "Gutanga ibyishimo n’umutuzo" },
// //     { id: "D", text: "Kwihanganirana mu makosa" },
// //   ];

// //   return (
// //     <div className="quiz-wrapper">
// //       {/* HEADER SECTION */}
// //       <div className="header-section">
// //         <div className="status-bar">
// //           <span className="time">9:41</span>
// //           <div className="status-icons">
// //             <span>📶</span>
// //             <span>📡</span>
// //             <span>🔋</span>
// //           </div>
// //         </div>
// //         <div className="nav-icons">
// //           <Home size={22} color="#000" />
// //           <div className="right-icons">
// //             <div className="bell-wrapper">
// //               <Bell size={22} color="#000" />
// //               <span className="notification-dot"></span>
// //             </div>
// //             <User size={22} color="#000" />
// //           </div>
// //         </div>
// //       </div>

// //       {/* MAIN SECTION */}
// //       <div className="main-section">
// //         <p className="quiz-title">Family Problems Quiz</p>
// //         <p className="quiz-question-number">
// //           <span className="question-white">Question</span>{" "}
// //           <span className="number-highlight">02</span>
// //           <span className="total-black">/20</span>
// //         </p>
// //         <p className="quiz-question">
// //          Ni iki buri wese mu muryango yakora kugira ngo umuryango urusheho kugira urukundo n'ubwumvikane?
// //         </p>

// //         {answers.map((ans) => (
// //           <button
// //             key={ans.id}
// //             onClick={() => setSelected(ans.id)}
// //             className="answer-btn"
// //           >
// //             <span className="answer-text">
// //               {ans.id}. {ans.text}
// //             </span>
// //             <span
// //               className={`radio-circle ${
// //                 selected === ans.id ? "radio-selected" : ""
// //               }`}
// //             >
// //               {selected === ans.id && <span className="radio-dot"></span>}
// //             </span>
// //           </button>
// //         ))}

// //         <div className="pagination">
// //           <span className="dot blue"></span>
// //           <span className="dot blue"></span>
// //           <span className="dot white"></span>
// //           <span className="dot white"></span>
// //         </div>
        
// //       </div>
// //     </div>
// //   );
// // }

// // export default QuizPage2;








// import React, { useState, useEffect } from "react";
// import { initializeApp } from "firebase/app";
// import {
//   getAuth,
//   signInAnonymously,
//   onAuthStateChanged,
//   signInWithCustomToken,
// } from "firebase/auth";
// import { getFirestore, doc, setDoc, onSnapshot } from "firebase/firestore";
// import {
//   Home,
//   Bell,
//   User,
//   ChevronLeft,
//   Settings,
//   Shield,
//   LogOut,
//   MapPin,
//   Clipboard,
//   ShieldAlert,
//   HelpCircle,
//   Eye,
//   EyeOff,
//   Phone,
//   Lock,
//   ChevronRight,
//   ChevronDown
// } from "lucide-react";

// // This is the complete app. Replace your existing App.jsx with this code.

// // Global variables from the canvas environment
// const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : null;
// const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;
// const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

// // Use a placeholder if running locally, otherwise use the provided Firebase config.
// const firebaseApp = firebaseConfig
//   ? initializeApp(firebaseConfig)
//   : console.log("Firebase config not found. Using a dummy setup for local testing.");

// const db = firebaseConfig ? getFirestore(firebaseApp) : null;
// const auth = firebaseConfig ? getAuth(firebaseApp) : null;


// // Consolidated CSS from all files
// const allStyles = `
//   @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
  
//   body, #root {
//     margin: 0;
//     padding: 0;
//     font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    
//   }
  
//   .app-container {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     min-height: 100vh;
//     background-color : #eb1695;
//   }
  
//   .mobile-frame {
//     width: 100%;
//     min-width: 420px; /* Standard mobile width */
//     height: 100vh; /* Standard mobile height */
//     background-color: #d8d8d8; /* Light gray background color from the image */
//     box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
//     overflow: hidden;
//     position: relative;
//     display: flex;
//     flex-direction: column;
//   }
  
//   .top-bar {
//     background: linear-gradient(to bottom, #e00085, #d10078);
//     height: 120px;
//     padding: 20px;
//     color: black;
//     position: relative;
//     z-index: 1;
//   }
  
//   .back-arrow {
//     font-size: 24px;
//     cursor: pointer;
//   }
  
//   .status-icons {
//     position: absolute;
//     top: 20px;
//     right: 20px;
//     font-size: 14px;
//     color: black;
//   }
  
//   .form-box {
//     position: absolute;
//     top: 115px;
//     left: 0;
//     right: 0;
//     bottom: 0;
//     background-color: #d3d3d3;
//     border-top-left-radius: 40px;
//     border-top-right-radius: 40px;
//     padding: 30px 10px;
//     overflow-y: auto;
//     z-index: 2;
//   }
  
//   .form-box h2 {
//     margin-bottom: 20px;
//     font-size: 28px;
//     color: black;
//   }
  
//   .input-group {
//     background: #f0f0f0; /* Light gray background for input fields */
//     border-radius: 1.5rem;
//     padding: 0.75rem 1.5rem;
//     margin-bottom: 1.5rem;
//     display: flex;
//     align-items: center;
//     gap: 1rem;
//     box-shadow: none; /* No shadow on inputs to match the image */
//   }
  
//   .input-group input {
//     flex-grow: 1;
//     border: none;
//     outline: none;
//     background: transparent; /* Transparent background to show parent's gray color */
//     font-size: 1rem;
//     color: black;
//   }
//   .input-group .icon {
//     color: #a0a0a0;
//   }
  
//   .eye-icon {
//     position: absolute;
//     right: 70px;
//     top: 50%;
//     transform: translateY(-50%);
//     cursor: pointer;
//     font-size: 18px;
//   }
//     .input-group input::placeholder {
//     color: #a0a0a0;
//   }
//   .input-group .icon {
//     color: #a0a0a0;
//   }
//   .input-group .password-toggle {
//     cursor: pointer;
//   }
//   .signup-button {
//     background: #eb1695; /* Solid color as per the image */
//     color: white;
//     font-size: 1.25rem;
//     font-weight: bold;
//     padding: 1rem;
//     border-radius: 1.5rem;
//     border: none;
//     width: 100%;
//     margin-top: 2rem;
//     cursor: pointer;
//     box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
//     transition: background 0.3s ease;
//   }
  
//   .signup-button:hover {
//     background: #d4145a;
//   }

//   /* Home2 & Home3 Styles */
//   .mobile-frame-pink {
//     min-width:380px;
//     height: 94vh;
//     background: linear-gradient( #eb1695, #380323ff);
//     box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
//     overflow: hidden;
//     position: relative;
//     padding: 1.5rem;
//     display: flex;
//     flex-direction: column;
//     justify-content: flex-start;
//   }

//   .headerr {
//     background: transparent;
//   }
  
//   .status-icons {
//     display: flex;
//     align-items: center;
//   }
//    .main-title {
//     color: white;
//     font-size: 2.25rem;
//     font-weight: bold;
//     text-align: center;
//     margin-top: 3rem;
//     margin-bottom: 2rem;
//   }
//   .language-buttons {
//     height: 0px;
//     display: flex;
//     flex-direction: column;
//     gap: 1rem;
//     width: 100%;
//     padding: 0rem;
//   }
  
//   .language-button {
//     background: rgba(255, 255, 255, 1);
//     border: 1px solid transparent;
//     backdrop-filter: blur(10px);
//     border-radius: 1rem;
//     padding: 1.25rem 1.5rem;
//     color: black;
//     font-size: 1.125rem;
//     font-weight: 600;
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     transition: all 0.3s ease;
//     cursor: pointer;
//     box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//   }
//       .language-button:hover {
//     background: rgba(255, 255, 255, 0.3);
//   }
//   .language-button.selected {
//     border-color: white;
//     background: rgba(255, 255, 255, 0.3);
//   }
//   .checkbox {
//     width: 1.5rem;
//     height: 1.5rem;
//     border-radius: 50%;
//     border: 1px solid #d4145a;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     transition: background-color 0.3s ease;
//   }
//   .checkbox.selected {
//     background-color: white;
//   }
  
//  .checkbox .inner-circle {
//     width: 0.75rem;
//     height: 0.75rem;
//     border-radius: 50%;
//     background-color: #d4145a;
//     display: block;
//   }
  
//   .skip-button {
//     position: absolute;
//     bottom: 2rem;
//     right: 2rem;
//     color: black;
//     background: white;
//     font-weight: 600;
//     font-size: 1rem;
//     text-decoration: none;
//     cursor: pointer;
//     transition: transform 0.2s ease;
//   }
//       .skip-button:hover {
//     transform: translateX(5px);
//     cursor: pointer;
//   }
//   /* Home3 styles */
//   .header-3 {
//     background: transparent;
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//   }

//   .main-content {
//   flex-grow: 1; /* Allows content to take available space */
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: space-between; /* Distributes space between elements */
//     padding-bottom: 2rem;
//   }

//   .main-content h1 {
//     font-size: 2rem;
//     margin: 0;
//   }
  
//   .main-content p {
//     font-size: 1rem;
//     margin-top: 0.5rem;
//   }
//       .welcome-circle {
//     position: relative;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     width: 20rem; /* Adjust size to match image */
//     height: 20rem; /* Adjust size to match image */
//     background: transpalent;
//     border-radius: 50%;
//     border: 20px solid white;
//     text-align: center;
//     padding: 3rem;
//     box-sizing: border-box;
//     margin-top: 7rem; /* Position from top */
//   }
//   .continue-button {
//     position: absolute;
//     bottom: 0; /* Position at the bottom of the illustration area */
//     background: rgba(255, 255, 255, 0.1);
//     backdrop-filter: blur(10px);
//     border-radius: 3rem; /* Rounded pill shape */
//     padding: 0.75rem 1.5rem;
//     color: white;
//     font-size: 1.125rem;
//     font-weight: 600;
//     display: flex;
//     align-items: center;
//     gap: 0.5rem;
//     border: none;
//     cursor: pointer;
//     transition: transform 0.3s ease;
//     box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//   }
  
//   .continue-button span:first-child {
//     font-weight: bold;
//     color: #380323ff;
//     margin-right: 0.5rem;
//   }
  
//   .arrow-group {
//     display: flex;
//     color: #380323ff;
//   }
  
//   .arrow-group svg {
//     width: 20px;
//     height: 20px;
//   }
  
//   /* ActivitiesScreen styles */
//   .phone>*{ 
//     width:100%; 
//     max-width:400px;
//     margin: 0 auto;
//   }

//   .header-activities {
//   height: 110px;
//   background:#D9D9D9;
//   border-bottom-left-radius:50px;
//   border-bottom-right-radius:50px;
//   padding:8px 16px 15px;
//   position:relative;
//   z-index:2; /* above pink */
//   }

//   .status-row{
//     display:flex; justify-content:space-between; align-items:center;
//   }

//   .time { 
//     font-weight:700; 
//     font-size:13px; 
//     color:#000; 
//     letter-spacing:.2px;
//   }

//   .status-right{ 
//     display:flex; 
//     align-items:center; 
//     gap:6px; 
//   }

//   .nav-row {
//     display:flex; 
//     justify-content:space-between; 
//     align-items:center;
//     margin-top:10px;
//   }

//   .nav-right { 
//     display:flex; 
//     align-items:center; 
//     gap:18px; 
//   }
//     .bell-wrap{ position:relative; }
// .notif-dot{
//   position:absolute; width:8px; height:8px; background:#22c55e;
//   border-radius:999px; top:-1px; right:4px;
// }

//   .page-title {
//     text-align: center;
//     position: absolute;
//     left: 50%;
//     bottom: 5px;
//     transform: translateX(-50%);
//     margin: 0;
//     font-size: 15px;
//     font-weight: 800;
//     font-family: Georgia, 'Times New Roman', serif;
//     color: #1b1b1b;
//   }

//   .content-activities {
//     background: linear-gradient(180deg, rgba(235,22,149,1) 0%, rgba(56,3,35,1) 100%);
//     position:relative;
//     z-index:1;
//     margin-top:-46px;
//     padding:18px 16px 10px;
//     min-height: calc(110vh - 150px);
//    overflow:hidden; 
//   }

//   .cards { 
//     display:flex;
//     flex-direction:column;
//     gap:30px; 
//     margin-top: 80px;
//   }

//   .card {
//     display:flex; 
//     align-items:center; 
//     gap:14px;
//     background:#EDEDED;
//     border-radius:16px;
//     padding:12px 14px;
//     box-shadow:0 4px 14px rgba(0,0,0,.15) inset, 0 2px 10px rgba(0,0,0,.08);
//   }

//   .medallion {
//     width:48px; 
//     height:48px; 
//     border-radius:50%;
//     background:#2c2f3a;
//     display:flex; 
//     align-items:center; 
//     justify-content:center;
//     box-shadow:0 0 0 4px #2c2f3a, 0 0 0 8px #fff;
//   }

//   .medallion-inner {
//     width:40px; 
//     height:40px; 
//     border-radius:50%;
//     background:#fff;
//     font-size:28px;
//     display:flex; 
//     align-items:center; 
//     justify-content:center;
//   }

//   .card-body {
//     display:flex; 
//     flex-direction:column; 
//     gap:6px;
//   }

//   .green-pill {
//     background:#167a2f;
//     color:#fff;
//     padding:3px 10px;
//     border-radius:999px;
//     font-size:12px;
//     font-weight:bold;
//     align-self:flex-start;
//   }

//   .card-title {
//     font-size:16px; 
//     font-weight:bold;
//   }

//   .footer-blob {
//     position:absolute; 
//     bottom:-10px; 
//     left:0; 
//     width:100%; 
//     height:140px; 
//     z-index: -1; 
//   }
//   .User:hover{
//    cursor:pointer;
//   }
  
//   /* Challenges Screen styles */
//   .screen {
//     width: 100%;
//     max-width: 480px;
//     margin: auto;
//     background-color: #000;
//     height: 100vh;
//     overflow: hidden;
//   }

//   .header-challenges {
//     height: 15vh;
//     background: #d9d9d9;
//     border-bottom-right-radius: 80px;
//     padding: 10px 15px 20px;
//     position: relative;
//     z-index: 2;
//   }
  
//   .status-bar {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     font-size: 14px;
//     color: #000;
//   }

// .nav-icons {
//   display: flex;
//   justify-content: space-between;
//   margin-top: 36px;
// }

// .nav-icon {
//   font-size: 24px;
//   color: black;
//   cursor: pointer;
// }

//   .bell-container {
//     position: relative;
//     display: flex;
//     gap: 10px;
//     margin-right: 15px;
//   }

//   .content-challenges {
//   background: linear-gradient(to bottom, #cc197c, #86014c);
//   /* border-top-left-radius: 30px;
//   border-top-right-radius: 30px; */
//   margin-top: -80px; /* Overlap effect */
//   padding: 20px;
//   min-height: calc(100vh - 80px);
//   }
//   .btns{
//    display: flex;
//    justify-content: space-between;
//   }
//   .next-button{
//    background-color: transparent;
//   }
  
//   .title {
//     text-align: center;
//     font-size: 24px;
//     font-weight: bold;
//     margin-bottom: 20px;
//     margin-top: 100px;
//   }

// .white-text {
//  color: rgb(221, 216, 216);
//   font-weight: bold;
// }

//   .black-text {
//   color: rgb(49, 49, 49);
//  }

// .question {
//   color: rgb(221, 216, 216);
//   margin-top: 30px;
//   line-height: 1.5;
// }
  
// .options {
//   display: flex;
//   gap: 90px;
//   margin-top: 20px;
// }

// .option {
//   color:rgb(221, 216, 216);
//   font-size: 18px;
// }
// .option input[type="radio"] {
//   margin-right: 5px;
// }

//   .option input[type="radio"] + span::before {
//     content: '';
//     display: inline-block;
//     width: 20px;
//     height: 20px;
//     border-radius: 50%;
//     border: 2px solid #ccc;
//     background-color: #f0f0f0;
//     margin-right: 10px;
//   }

//   .option input[type="radio"]:checked + span::before {
//     background-color: #86014c;
//     border-color: #86014c;
//   }
//   .option:hover{
//   cursor: pointer;
//   }

//   .dots {
//     display: flex;
//     justify-content: center;
//     gap: 10px;
//     margin-top: 30px;
//   }

//   .dot {
//     width: 10px;
//     height: 10px;
//     border-radius: 50%;
//     background-color: #fff;
//     opacity: 0.5;
//   }

//   .dot.active {
//     background-color: #e00085;
//     opacity: 1;
//   }

//   .btns{
//     display: flex;

//   }
   
//   // .next-button {
//   //   background: #e00085;
//   //   color: white;
//   //   padding: 15px 30px;
//   //   border-radius: 50px;
//   //   border: none;
//   //   font-size: 16px;
//   //   font-weight: bold;
//   //   cursor: pointer;
//   //   margin-top: 20px;
//   //   align-self: center;
//   // }

//   .btns{
//     display: flex;
//     justify-content: space-between;
//     padding:10px;
//     margin-top: 40px;
//   }
//   .btns:hover{
//   cursor:pointer;
//   }
//   /* Notifications Screen styles */
//   .screen {
//   width: 100%;
//   max-width: 480px;
//   margin: auto;
//   background-color: #000;
//   height: 100vh;
//   overflow: hidden;
// }
//   .headernoti {
//   height: 15vh;
//   background: #d9d9d9;
//   border-bottom-left-radius: 80px;
//   padding: 10px 15px 20px;
//   position: relative;
//   z-index: 2;
// }

// .status-bar {
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   font-size: 14px;
//   color: #000;
// }

// .status-icons {
//   display: flex;
//   gap: 5px;
// }

// .nav-icons {
//   display: flex;
//   justify-content: space-between;
//   margin-top: 34px;
// }

// .nav-icon {
//   font-size: 24px;
//   color: black;
//   cursor: pointer;
// }

// .bell-container {
//   position: relative;
//   display: flex;
//   gap: 10px;
//   margin-right: 15px;
// }
//   .contentnoti {
//   background: linear-gradient(to bottom, #bd1471, #730141);
//   margin-top: -80px; /* Overlap */
//   padding: 20px;
//   min-height: calc(100vh - 80px);
// }
//   .notif-title {
//   text-align: center;
//   color: black;
//   font-size: 30px;
//   margin-top: 110px;
//   margin-bottom: 40px;
//   font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
//   letter-spacing: 4px;
//   line-height: 16px;
//   }
  
//   .notif-card {
//   display: flex;
//   align-items: center;
//   background: #f2f2f2;
//   border-radius: 40px;
//   padding: 10px 15px;
//   margin-bottom: 15px;
//   }
  
//   .notif-card .avatar {
//       background: white;
//   border-radius: 50%;
//   font-size: 30px;
//   padding: 8px;
//   margin-right: 12px;
//   }
  
//   .notif-text {
//   font-size: 14px;
//   flex: 1;
//   line-height: 1.4;
//   }
  
//   .dim {
//   color: #4f4c4cff;
//   }
  
//   .black {
//   color: black;
//   font-weight: bold;
//   }
  
//   .arrow-down {
//     text-align: center;
//     margin-top: 20px;
//   }

//   /* Quiz Pages styles */
//   .quiz-wrapper {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     background: #000;
//     font-family: sans-serif;
//     min-height: 100vh;
//   }

//   .header-section {
//     background: #d9d9d9;
//     border-bottom-left-radius: 25px;
//     border-bottom-right-radius: 25px;
//     padding: 40px 16px 14px;
//     width: 100%;
//     max-width: 408px;
//     position: relative;
//     z-index: 2;
//   }

//   .status-bar {
//     display: flex;
//     justify-content: space-between;
//     font-size: 13px;
//   }

//   .status-icons {
//     display: flex;
//     gap: 6px;
//   }
  
//   .status-icons:hover{
//    cursor: pointer;
//   }

//   .nav-icons {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     margin-top: 10px;
//   }

//   .right-icons {
//     display: flex;
//     align-items: center;
//     gap: 12px;
//   }

//   .bell-wrapper {
//     position: relative;
//   }

//   .notification-dot {
//     position: absolute;
//     top: -1px;
//     right: -1px;
//     width: 8px;
//     height: 8px;
//     background-color: limegreen;
//     border-radius: 50%;
//   }

// .main-section {
//   background: linear-gradient(to bottom, #db257d, #720247);
//   padding: 20px;
//   width: 100%;
//   height: 80vh;
//   max-width: 400px;
//   margin-top: -15px;
//   z-index: 1;
//   position: relative;
// }

//   .quiz-title {
//     font-size: 14px;
//     font-weight: 500;
//     font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
//     color: white;
//   }

//   .quiz-question-number {
//     font-size: 18px;
//     font-weight: bold;
//     margin-top: 4px;
//   }

//   .question-white {
//     color: white;
//   }

//   .number-highlight {
//     color: #fff;
//   }

//   .total-black {
//     font-size: 14px;
//     color: black;
//   }

//   .quiz-question {
//     margin-top: 8px;
//     font-size: 14px;
//     font-weight: 400;
//     line-height: 1.4;
//     color: white;
//   }

//   .answer-btn {
//     background: white;
//     border: none;
//     border-radius: 9999px;
//     padding: 10px 16px;
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     font-size: 14px;
//     font-weight: 500;
//     color: #000;
//     margin-bottom: 12px;
//     width: 100%;
//     cursor: pointer;
//   }
  
//   .answer-btn:focus {
//     outline: none;
//   }

//   .answer-text {
//     flex-grow: 1;
//   }

//   .radio-circle {
//     width: 20px;
//     height: 20px;
//     border-radius: 50%;
//     border: 2px solid #ccc;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     transition: all 0.2s ease;
//   }

//   .radio-selected {
//     border-color: #eb1695;
//   }

//   .radio-dot {
//     width: 12px;
//     height: 12px;
//     background-color: #eb1695;
//     border-radius: 50%;
//   }

//   .pagination {
//     display: flex;
//     justify-content: center;
//     gap: 8px;
//     margin-top: 20px;
//   }

//   .dot.blue {
//     background-color: #eb1695;
//     width: 10px;
//     height: 10px;
//     border-radius: 50%;
//   }

//   .dot.white {
//     background-color: white;
//     width: 10px;
//     height: 10px;
//     border-radius: 50%;
//   }
  
//   .quiz-submit-btn {
//     display: block;
//     width: 80%;
//     margin: 20px auto 0;
//     padding: 12px 20px;
//     border: none;
//     border-radius: 25px;
//     background-color: #d10078;
//     color: white;
//     font-size: 18px;
//     font-weight: bold;
//     cursor: pointer;
//     text-align: center;
//   }

//   .quiz-submit-btn:hover {
//     background-color: #c00075;
//   }

//   .score-card {
//     background: white;
//     border-radius: 20px;
//     padding: 20px;
//     text-align: center;
//     margin: 40px 0;
//     box-shadow: 0 4px 10px rgba(0,0,0,0.1);
//   }

//   .score-card h2 {
//     color: black;
//     font-size: 24px;
//     margin-bottom: 10px;
//   }

//   .score-card p {
//     color: #888;
//     font-size: 16px;
//   }
  
//   body {
//   margin: 0;
//   font-family: Arial, sans-serif;
// }

// .screen {
//   width: 100%;
//   max-width: 480px;
//   margin: auto;
//   background-color: #000;
//   height: 100vh;
//   overflow: hidden;
// }

// /* HEADER */
// .header {
//   height: 13vh;
//   background: #d9d9d9;
//   /* border-bottom-left-radius: 24px; */
//   border-bottom-right-radius: 40px;
//    border-bottom-left-radius: 40px;
//   padding: 10px 15px 20px;
//   position: relative;
//   z-index: 2;
// }
// .header2 {
//   height: 100vh;
//   background: #d9d9d9;
//   margin-left: -22px;
//   width: 103%;
//   /* border-bottom-left-radius: 24px; */
//   border-top-right-radius: 35px;
//    border-top-left-radius: 35px;
//   padding:10px 15px 20px;
//   position: relative;
//   bottom: -1rem;
//   z-index: 2;
// }

// .status-bar {
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   font-size: 14px;
//   color: #000;
// }

// .status-icons {
//   display: flex;
//   gap: 5px;
// }

// .nav-icons {
//   display: flex;
//   justify-content: space-between;
//   margin-top: 36px;
// }

// .nav-icon {
//   font-size: 24px;
//   color: black;
//   cursor: pointer;
// }
// .nav-icon-home {
//   font-size: 24px;
//   color: black;
//   cursor: pointer;
//   position: relative;
//   left: 2rem;
// }

// .bell-container {
//   position: relative;
//   display: flex;
//   gap: 10px;
//   margin-right: 15px;
// }

// .green-dot {
//   position: absolute;
//   top: 0;
//   right: 47px;
//   width: 10px;
//   height: 10px;
//   background-color: limegreen;
//   border-radius: 50%;
// }

// /* CONTENT */
// .content {
//   background: linear-gradient(to bottom, #cc197c, #86014c);
//   /* border-top-left-radius: 30px;
//   border-top-right-radius: 30px; */
//   margin-top: -80px; /* Overlap effect */
//   padding: 20px;
//   min-height: calc(100vh - 80px);
// }

// .title {
//   margin-top: 80px;
// }

// .white-text {
//  color: rgb(221, 216, 216);
//   font-weight: bold;
// }

// .black-text {
//   color: rgb(49, 49, 49);
// }

// .question {
//   color: rgb(221, 216, 216);
//   margin-top: 30px;
//   line-height: 1.5;
// }

// .h2{
//   color: #cc197c;
//   font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;

// }
// .p{
//   margin: 0px;
// }
// .btn-tangira{
//   background-color: #cc197c;
//   height: 50px;
//   width: 90%;
//   border-radius: 25px;
//   position: relative;
//   bottom: -3rem;
//   transition: transform 0.2s ease;
//   }
//    .btn-tangira:hover {
//     transform: translateX(5px);
//     cursor: pointer;
//   }
// .nav-icons:hover{
// cursor: pointer;
// }

//   // AddMember Css 
   

//   body {
//   margin: 0;
//   font-family: Arial, sans-serif;
// }

// .screen-add {
//   width: 100%;
//   max-width: 480px;
//   margin: auto;
//   background-color: #000;
//   height: 100vh;
//   overflow: hidden;

// }

// /* HEADER */
// .header-add {
//   height: 13vh;
//   background: transparent;
//   /* border-bottom-left-radius: 24px; */
//   border-bottom-right-radius: 40px;
//    border-bottom-left-radius: 40px;
//   padding: 10px 15px 20px;
//   bottom: 2rem;
//   position: relative;
//   z-index: 2;
// }
// .header-add2 {
//   height: 67vh;
//   background: #d9d9d9;
//   margin-left: -22px;
//   width: 103%;
//   /* border-bottom-left-radius: 24px; */
//   border-top-right-radius: 35px;
//    border-top-left-radius: 35px;
//   padding:10px 15px 20px;
//   position: relative;
//   bottom: -10rem;
//   z-index: 2;
  
// }

// .status-bar-add {
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   font-size: 14px;
//   color: #161616;
// }

// .status-icons-add {
//   display: flex;
//   gap: 5px;
// }

// .nav-icons-add {
//   display: flex;
//   justify-content: space-between;
//   margin-top: 36px;
// }

// .nav-icon-add {
//   font-size: 24px;
//   color: black;
//   cursor: pointer;
// }

// .bell-container-add {
//   position: relative;
//   display: flex;
//   gap: 10px;
//   margin-right: 15px;
// }

// .green-dot-add {
//   position: absolute;
//   top: 0;
//   right: 59px;
//   width: 10px;
//   height: 10px;
//   background-color: limegreen;
//   border-radius: 50%;
// }

// /* CONTENT */
// .content-add {
//   background: linear-gradient(to bottom, #cc197c, #86014c);
//   /* border-top-left-radius: 30px;
//   border-top-right-radius: 30px; */
//   margin-top: -130px; /* Overlap effect */
//   padding: 20px;
//  height: 100%;
// }

// .title-add {
//   margin-top: 80px;
// }

// .white-text-add {
//  color: rgb(221, 216, 216);
//   font-weight: bold;
// }

// .black-text-add {
//   color: rgb(49, 49, 49);
// }

// .question-add {
//   color: rgb(221, 216, 216);
//   margin-top: 30px;
//   line-height: 1.5;
// }
// .btn-tangira-add{
//   background-color: #cc197c;
//   height: 50px;
//   width: 90%;
//   border-radius: 25px;
//   position: relative;
//   bottom: -3rem;
// }
// .h2-add{
//   color: #cc197c;
//   font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;

// }
// .p-add{
//   margin: 0px;
// }
// .profile-add{
//   width: 45px;
//   height: 45px;
//   background-color: #bebaba;
//   border-radius: 50%;
//   display: flex;
//   position: relative;
//   top: -4px;
// }
// .profile-icon-add{
//   align-self: center;
//   margin-left: auto;
//   margin-right: auto;
// }

//   .signup-title-add {
//     color: rgb(38, 36, 36);
//     font-size: 2rem;
//     font-weight: bold;
//     margin: 1.5rem;
//   }
//   .main-content-add {
//     flex-grow: 1;
//     display: flex;
//     flex-direction: column;
//     padding: 1.5rem;
//   }
//   .input-group-add {
//     background: #f0f0f0; /* Light gray background for input fields */
//     border-radius: 1.5rem;
//     padding: 0.75rem 1.5rem;
//     margin-bottom: 1.5rem;
//     display: flex;
//     align-items: center;
//     gap: 1rem;
//     box-shadow: none; /* No shadow on inputs to match the image */
//   }
//   .input-group-add input {
//     flex-grow: 1;
//     border: none;
//     outline: none;
//     background: transparent; /* Transparent background to show parent's gray color */
//     font-size: 1rem;
//     color: black;
//   }
//   .input-group-add input::placeholder {
//     color: #a0a0a0;
//   }
//   .input-group-add .icon-add {
//     color: #a0a0a0;
//   }
//   .input-group-add .password-toggle-add {
//     cursor: pointer;
//   }
//   .signup-button-add{
//     background: #eb1695; /* Solid color as per the image */
//     color: white;
//     font-size: 1.25rem;

//     padding: 1rem;
//     border-radius: 1.5rem;
//     border: none;
//     width: 100%;
//     margin-top: 2rem;
//     cursor: pointer;
//     box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
//     transition: background 0.3s ease;
//   }
//     .signup-button-add2 {
//     background: #eb1695; /* Solid color as per the image */
//     color: white;
//     font-size: 1.25rem;
//     padding: 1rem;
//     border-radius: 1.5rem;
//     border: none;
//     width: 50%;
//     position: relative;
//     top: 8rem;
//     cursor: pointer;
//     box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
//     transition: background 0.3s ease;
//   }
//   .signup-button-add:hover {
//     background: #d4145a;
//   }

  

  
  

// `;

// // Helper components to be used inside the main App component

// const Home3 = ({ setPage }) => {
//   const StatusIcons = () => (
//     <div className="status-icons">
//       <svg width="20" height="12" viewBox="0 0 20 12">
//         <rect x="0" y="9" width="3" height="3" rx="0.6" fill="#000" />
//         <rect x="5" y="7" width="3" height="5" rx="0.6" fill="#000" opacity="0.85" />
//         <rect x="10" y="5" width="3" height="7" rx="0.6" fill="#000" opacity="0.7" />
//         <rect x="15" y="3" width="3" height="9" rx="0.6" fill="#000" opacity="0.55" />
//       </svg>
//       <svg width="20" height="12" viewBox="0 0 24 24">
//         <path d="M2 8c5.5-5 14.5-5 20 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" />
//         <path d="M6 12c3.5-3 8.5-3 12 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" />
//         <path d="M10 16c1.5-1 3.5-1 5 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" />
//         <circle cx="12" cy="20" r="1.5" fill="#000" />
//       </svg>
//       <div style={{ marginRight: '0.25rem', height: '0.5rem', width: '0.75rem', border: '1px solid black', borderRadius: '2px' }}></div>
//       <div style={{ height: '0.5rem', width: '1.25rem', backgroundColor: 'black', borderRadius: '2px' }}></div>
//     </div>
//   );
  
//   return (
//     <div className="mobile-frame-pink">
//       <div className="header-3">
//         <span style={{ color: "black" }}>9:41</span>
//         <StatusIcons />
//       </div>

//       <div className="main-content">
//         <div style={{ marginBottom: "2rem" }} className="welcome-circle">
//           <h1 style={{ fontWeight: 800 }}>Welcome to <br /> FamilyBonding App
// </h1>
//           <p>where Joy brings Togetherness</p>
//         </div>
//     <svg width="250" height="250" viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', bottom: '0' }}>
//               {/* Parent 1 (left) */}
//               <rect x="50" y="100" width="40" height="150" fill="#2d2d2d" />
//               <rect x="55" y="100" width="30" height="20" fill="#f5f5f5" />
//               <circle cx="70" cy="95" r="15" fill="#f5f5f5" />

//               {/* Parent 2 (right) */}
//               <rect x="160" y="100" width="40" height="150" fill="#2d2d2d" />
//               <rect x="165" y="100" width="30" height="20" fill="#f5f5f5" />
//               <circle cx="180" cy="95" r="15" fill="#f5f5f5" />
//             </svg>

//         <button className="continue-button" onClick={() => setPage('Home2')}>
//           <span>Continue</span>
//           <span className="arrow-group">
//             <ChevronRight size={24} />
//             <ChevronRight size={24} />
//           </span>
//         </button>
//       </div>
//     </div>
//   );
// };

// const Home2 = ({ setPage }) => {
//   const [selectedLanguage, setSelectedLanguage] = useState("Kinyarwanda");
//   const languages = ["Kinyarwanda", "English", "French"];

//   const StatusIcons = () => (
//     <div className="status-icons">
//       <svg width="20" height="12" viewBox="0 0 20 12">
//         <rect x="0" y="9" width="3" height="3" rx="0.6" fill="#000" />
//         <rect x="5" y="7" width="3" height="5" rx="0.6" fill="#000" opacity="0.85" />
//         <rect x="10" y="5" width="3" height="7" rx="0.6" fill="#000" opacity="0.7" />
//         <rect x="15" y="3" width="3" height="9" rx="0.6" fill="#000" opacity="0.55" />
//       </svg>
//       <svg width="20" height="12" viewBox="0 0 24 24">
//         <path d="M2 8c5.5-5 14.5-5 20 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" />
//         <path d="M6 12c3.5-3 8.5-3 12 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" />
//         <path d="M10 16c1.5-1 3.5-1 5 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" />
//         <circle cx="12" cy="20" r="1.5" fill="#000" />
//       </svg>
//       <div style={{ marginRight: '0.25rem', height: '0.5rem', width: '0.75rem', border: '1px solid black', borderRadius: '2px' }}></div>
//       <div style={{ height: '0.5rem', width: '1.25rem', backgroundColor: 'black', borderRadius: '2px' }}></div>
//     </div>
//   );

//   return (
//     <div className="mobile-frame-pink">
//       <div className="headerr" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//         <span style={{ color: "black" }}>9:41</span>
//         <StatusIcons />
//       </div>
//          <span className="back-arrow"  style={{ marginTop: '3.5rem' , color: "black" , fontSize: "30px" }} onClick={() => setPage('Home3')}>&#8592;</span>

//       <h1 className="main-title">Select Language !</h1>

//       <div className="language-buttons">
//         {languages.map((lang) => (
//           <button
//             key={lang}
//             onClick={() => setSelectedLanguage(lang)}
//             className={`language-button ${selectedLanguage === lang ? 'selected' : ''}`}
//           >
//             <span>{lang}</span>
//             <div className={`checkbox ${selectedLanguage === lang ? 'selected' : ''}`}>
//               {selectedLanguage === lang && <div className="inner-circle"></div>}
//             </div>
//           </button>
//         ))}
//       </div>

//       <button className="skip-button" onClick={() => setPage('SignupForm')}>
//         Next &gt;
//       </button>
//     </div>
//   );
// };


// const SignupForm = ({ setPage }) => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [fullName, setFullName] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   //   const togglePasswordVisibility = () => {
//   //   setPasswordShown(!passwordShown);
//   // };
//   const handleSignup = async () => {
//     // Basic validation
//     if (password !== confirmPassword) {
//       console.error("Passwords do not match.");
//       return;
//     }
//     setPage('StartQuiz');
//     console.log("Signing up with:", { fullName, phoneNumber });
    
//   };

  // const StatusIcons = () => (
  //   <div className="status-icons" style={{ display: 'flex', gap: '5px' }}>
  //     <svg width="20" height="12" viewBox="0 0 20 12">
  //       <rect x="0" y="9" width="3" height="3" rx="0.6" fill="#000" />
  //       <rect x="5" y="7" width="3" height="5" rx="0.6" fill="#000" opacity="0.85" />
  //       <rect x="10" y="5" width="3" height="7" rx="0.6" fill="#000" opacity="0.7" />
  //       <rect x="15" y="3" width="3" height="9" rx="0.6" fill="#000" opacity="0.55" />
  //     </svg>
  //     <svg width="20" height="12" viewBox="0 0 24 24">
  //       <path d="M2 8c5.5-5 14.5-5 20 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" />
  //       <path d="M6 12c3.5-3 8.5-3 12 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" />
  //       <path d="M10 16c1.5-1 3.5-1 5 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" />
  //       <circle cx="12" cy="20" r="1.5" fill="#000" />
  //     </svg>
  //   </div>
  // );

//   return (
//     <div className="mobile-frame">
//       <div className="top-bar">
//         <ChevronLeft size={24} className="back-arrow" onClick={() => setPage('Home3')} />
//         <div className="status-icons">
//           <span>9:41</span>
//           <StatusIcons />
//         </div>
//       </div>
//       <div className="form-box">
//         <h2>Signup</h2>
//         <div className="input-group">
//           <User size={20} className="icon" />
//           <input type="text" placeholder="Full Names" value={fullName} onChange={(e) => setFullName(e.target.value)} />
//         </div>
//         <div className="input-group">
//           <Phone size={20} className="icon" />
//           <input type="text" placeholder="Phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
//         </div>
//         <div className="input-group">
//           <Lock size={20} className="icon" />
//           <input
//             type={showPassword ? 'text' : 'password'}
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
//             {showPassword ? <EyeOff size={20} className="icon"  /> : <Eye size={20} className="icon"  />}
//           </span>
//         </div>
//         <div className="input-group">
//           <Lock size={20} className="icon" />
//           <input
//             type={showConfirmPassword ? 'text' : 'password'}
//             placeholder="Confirm Password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//           />
//           <span className="password-toggle"onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
//             {showConfirmPassword ? <EyeOff size={20} className="icon" /> : <Eye size={20} className="icon" />}
//           </span>
//         </div>
//         <button className="signup-button" onClick={handleSignup}>Signup</button>
//       </div>
//     </div>
//   );
// };

// const Home5 = ({ setPage }) => {
//   const [passwordShown, setPasswordShown] = useState(false);
//   const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
//   const togglePasswordVisibility = () => setPasswordShown(!passwordShown);
//   const toggleConfirmPasswordVisibility = () => setConfirmPasswordShown(!confirmPasswordShown);

//   const StatusIcons = () => (
//     <div className="status-icons">
//       <svg width="20" height="12" viewBox="0 0 20 12">
//         <rect x="0" y="9" width="3" height="3" rx="0.6" fill="#000" />
//         <rect x="5" y="7" width="3" height="5" rx="0.6" fill="#000" opacity="0.85" />
//         <rect x="10" y="5" width="3" height="7" rx="0.6" fill="#000" opacity="0.7" />
//         <rect x="15" y="3" width="3" height="9" rx="0.6" fill="#000" opacity="0.55" />
//       </svg>
//       <svg width="20" height="12" viewBox="0 0 24 24">
//         <path d="M2 8c5.5-5 14.5-5 20 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" />
//         <path d="M6 12c3.5-3 8.5-3 12 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" />
//         <path d="M10 16c1.5-1 3.5-1 5 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" />
//         <circle cx="12" cy="20" r="1.5" fill="#000" />
//       </svg>
//     </div>
//   );

//   return (
//     <div className="mobile-frame">
//       <div className="top-bar">
//         <ChevronLeft size={24} className="back-arrow" onClick={() => setPage('Home2')} />
//         <div className="status-icons">
//           <span>9:41</span>
//           <StatusIcons />
//         </div>
//       </div>
//       <div className="form-box">
//         <h2>Signup</h2>
//         <div className="input-group">
//           <User size={20} className="icon" />
//           <input type="text" placeholder="Full Names" />
//         </div>
//         <div className="input-group">
//           <Phone size={20} className="icon" />
//           <input type="tel" placeholder="Phone number" />
//         </div>
//         <div className="input-group">
//           <Lock size={20} className="icon" />
//           <input
//             type={passwordShown ? 'text' : 'password'}
//             placeholder="Password"
//           />
//           <span className="password-toggle" onClick={togglePasswordVisibility}>
//             {passwordShown ? <EyeOff size={20} className="icon" /> : <Eye size={20} className="icon" />}
//           </span>
//         </div>
//         <div className="input-group">
//           <Lock size={20} className="icon" />
//           <input
//             type={confirmPasswordShown ? 'text' : 'password'}
//             placeholder="Confirm Password"
//           />
//           <span className="password-toggle" onClick={toggleConfirmPasswordVisibility}>
//             {confirmPasswordShown ? <EyeOff size={20} className="icon" /> : <Eye size={20} className="icon" />}
//           </span>
//         </div>
//         <button className="signup-button" onClick={() => setPage('Home6')}>Signup</button>
//       </div>
//     </div>
//   );
// };

// const Home6 = ({ setPage }) => {
//   const [selected, setSelected] = useState("B");
//   const answers = [
//     { id: "A", text: "Gufasha abandi mu byo bakeneye" },
//     { id: "B", text: "Kuganira kenshi tugahana amakuru" },
//     { id: "C", text: "Gutanga ibyishimo n'umutuzo" },
//     { id: "D", text: "Kwihanganirana mu makosa" },
//   ];

//   const StatusIcons = () => (
//     <div className="status-icons" style={{ display: 'flex', gap: '6px' }}>
//       <svg width="20" height="12" viewBox="0 0 20 12">
//         <rect x="0" y="9" width="3" height="3" rx="0.6" fill="#000" />
//         <rect x="5" y="7" width="3" height="5" rx="0.6" fill="#000" opacity="0.85" />
//         <rect x="10" y="5" width="3" height="7" rx="0.6" fill="#000" opacity="0.7" />
//         <rect x="15" y="3" width="3" height="9" rx="0.6" fill="#000" opacity="0.55" />
//       </svg>
//       <svg width="20" height="12" viewBox="0 0 24 24">
//         <path d="M2 8c5.5-5 14.5-5 20 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" />
//         <path d="M6 12c3.5-3 8.5-3 12 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" />
//         <path d="M10 16c1.5-1 3.5-1 5 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" />
//         <circle cx="12" cy="20" r="1.5" fill="#000" />
//       </svg>
//     </div>
//   );

//   return (
//     <div className="quiz-wrapper">
//       <div className="header-section">
//         <div className="status-bar">
//           <span className="time">9:41</span>
//           <StatusIcons />
//         </div>
//         <div className="nav-icons">
//           <Home size={22} color="#000" onClick={() => setPage('Home3')} />
//           <div className="right-icons">
//             <div className="bell-wrapper">
//               <Bell size={22} color="#000" onClick={() => setPage('Notifications')} />
//               <span className="notification-dot"></span>
//             </div>
//             <User size={22} color="#000" onClick={() => setPage('Profile')} />
//           </div>
//         </div>
//       </div>

//       <div className="main-section">
//         <p className="quiz-title">Family Problems Quiz</p>
//         <p className="quiz-question-number">
//           <span className="question-white">Question</span>{" "}
//           <span className="number-highlight">01</span>
//           <span className="total-black">/20</span>
//         </p>
//         <p className="quiz-question">
//           Ni ikihe kintu gikomeye kigira uruhare mu kubaka urugo rwunze ubumwe?
//         </p>
//         {answers.map((ans) => (
//           <button
//             key={ans.id}
//             onClick={() => setSelected(ans.id)}
//             className="answer-btn"
//           >
//             <span className="answer-text">
//               {ans.id}. {ans.text}
//             </span>
//             <span
//               className={`radio-circle ${
//                 selected === ans.id ? "radio-selected" : ""
//               }`}
//             >
//               {selected === ans.id && <span className="radio-dot"></span>}
//             </span>
//           </button>
//         ))}
//         <div className="pagination">
//           <span className="dot blue"></span>
//           <span className="dot white"></span>
//           <span className="dot white"></span>
//           <span className="dot white"></span>
//           <span className="dot white"></span>
//         </div>
//         <div className="btns">
//             <ChevronLeft size={33} onClick={()=> setPage('StartQuiz')}></ChevronLeft>............  1 / 20  ............
//             <ChevronRight size={33} onClick={()=> setPage('QuizPage2')}></ChevronRight> 
//          </div>
//       </div>
//     </div>
//   );
// };


// const StartQuiz = ({setPage}) => {
//  const [selected, setSelected] = useState(null);
// return(
//  <div className="screen">
//       {/* Header */}
//       <div className="header">
//         <div className="status-bar">
//           <span className="time">9:41</span>
//           <div className="status-icons">
//           <svg width="20" height="12" viewBox="0 0 20 12">
//         <rect x="0" y="9" width="3" height="3" rx="0.6" fill="#000" />
//         <rect x="5" y="7" width="3" height="5" rx="0.6" fill="#000" opacity="0.85" />
//         <rect x="10" y="5" width="3" height="7" rx="0.6" fill="#000" opacity="0.7" />
//         <rect x="15" y="3" width="3" height="9" rx="0.6" fill="#000" opacity="0.55" />
//       </svg>
//       {/* wifi */}
//       <svg width="20" height="12" viewBox="0 0 24 24">
//         <path d="M2 8c5.5-5 14.5-5 20 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
//         <path d="M6 12c3.5-3 8.5-3 12 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
//         <path d="M10 16c1.5-1 3.5-1 5 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
//         <circle cx="12.5" cy="19" r="1.2" fill="#000"/>
//       </svg>
//       {/* battery */}
//       <svg width="28" height="12" viewBox="0 0 28 12">
//         <rect x="1" y="1" width="22" height="10" rx="2" fill="none" stroke="#000" strokeWidth="2"/>
//         <rect x="24" y="4" width="3" height="4" rx="1" fill="#000"/>
//         <rect x="3" y="3" width="18" height="6" rx="1" fill="#000"/>
//       </svg>
//           </div>
//         </div>
//         <div className="nav-icons">
//           {/* home */}
// <svg width="29" height="30" viewBox="0 0 24 24" fill="none" onClick={ ()=> setPage('Home3')} >
//   <path d="M3 9.5L12 3L21 9.5V20C21 20.55 20.55 21 20 21H15C14.45 21 14 20.55 14 20V15C14 14.45 13.55 14 13 14H11C10.45 14 10 14.45 10 15V20C10 20.55 9.55 21 9 21H4C3.45 21 3 20.55 3 20V9.5Z" 
//         stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
// </svg>

//           <div className="bell-container" >
//              <svg width="29" height="30" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" onClick={ ()=> setPage('Notifications')}>
//         <path d="M18 8a6 6 0 10-12 0c0 7-3 7-3 7h18s-3 0-3-7"/>
//         <path d="M13.73 21a2 2 0 01-3.46 0"/>
//       </svg>
//             <span className="green-dot"></span>
//             <svg width="29" height="30" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" onClick={ ()=> setPage('Profile')}>
//       <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
//       <circle cx="12" cy="7" r="4"/>
//     </svg>
//           </div>
          
//         </div>
//       </div>

//       {/* Pink Content */}
//       <div className="content">
//         <h2 className="title">
//           <span className="white-text">GUKUNDA UMURYANGO</span>{" "}
//         </h2>

//         <p className="question">
//           Gukunda umuryango ni uburyo bwo guhana ibitekerezo, gukorera hamwe ndetse no gusabana, ikigamijwe ari amahoro.
//         </p>
//            <div className="header2">
//             <div className="text1" style={{color:'black'}}>
//               <center>
//                   <p className="p" style={{marginTop:50}}>
//                   Urabona inota 1 kuri buri kibazo.
//                 </p>
//                  <p className="p">
//                   Nyuma yo gukora ibibazo byose amanota yawe arerekanwa.
//                 </p>
//                   <p className="p" style={{marginBottom:50}}>
//                   Amanota ntarengwa ni 20.
//                 </p>
//                   <h2 className="h2">Tangira Isuzumabumenyi</h2>
//                   <p>Amahirwe Masa!</p>
//                   <button  className="btn-tangira"  onClick={() => setPage('Home6')} >Tangira<span>{"  >>"}</span>   </button>
//               </center>

//             </div>
//       </div>
//       </div>
//     </div>

// );
// }

// const QuizPage2 = ({ setPage }) => {
//   const [selected, setSelected] = useState("B");
//   const answers = [
//     { id: "A", text: "Gufasha abandi mu byo bakeneye" },
//     { id: "B", text: "Kuganira kenshi tugahana amakuru" },
//     { id: "C", text: "Gutanga ibyishimo n'umutuzo" },
//     { id: "D", text: "Kwihanganirana mu makosa" },
//   ];

//   const StatusIcons = () => (
//     <div className="status-icons" style={{ display: 'flex', gap: '6px' }}>
//       <svg width="20" height="12" viewBox="0 0 20 12">
//         <rect x="0" y="9" width="3" height="3" rx="0.6" fill="#000" />
//         <rect x="5" y="7" width="3" height="5" rx="0.6" fill="#000" opacity="0.85" />
//         <rect x="10" y="5" width="3" height="7" rx="0.6" fill="#000" opacity="0.7" />
//         <rect x="15" y="3" width="3" height="9" rx="0.6" fill="#000" opacity="0.55" />
//       </svg>
//       <svg width="20" height="12" viewBox="0 0 24 24">
//         <path d="M2 8c5.5-5 14.5-5 20 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" />
//         <path d="M6 12c3.5-3 8.5-3 12 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" />
//         <path d="M10 16c1.5-1 3.5-1 5 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" />
//         <circle cx="12" cy="20" r="1.5" fill="#000" />
//       </svg>
//     </div>
//   );

//   return (
//     <div className="quiz-wrapper">
//       <div className="header-section">
//         <div className="status-bar">
//           <span className="time">9:41</span>
//           <StatusIcons />
//         </div>
//         <div className="nav-icons">
//           <Home size={22} color="#000" onClick={() => setPage('Home3')} />
//           <div className="right-icons">
//             <div className="bell-wrapper">
//               <Bell size={22} color="#000" onClick={() => setPage('Notifications')} />
//               <span className="notification-dot"></span>
//             </div>
//             <User size={22} color="#000" onClick={() => setPage('Profile')} />
//           </div>
//         </div>
//       </div>
//       <div className="main-section">
//         <p className="quiz-title">Family Problems Quiz</p>
//         <p className="quiz-question-number">
//           <span className="question-white">Question</span>{" "}
//           <span className="number-highlight">02</span>
//           <span className="total-black">/20</span>
//         </p>
//         <p className="quiz-question">
//           Ni iki buri wese mu muryango yakora kugira ngo umuryango urusheho kugira urukundo n'ubwumvikane?
//         </p>
//         {answers.map((ans) => (
//           <button
//             key={ans.id}
//             onClick={() => setSelected(ans.id)}
//             className="answer-btn"
//           >
//             <span className="answer-text">
//               {ans.id}. {ans.text}
//             </span>
//             <span
//               className={`radio-circle ${
//                 selected === ans.id ? "radio-selected" : ""
//               }`}
//             >
//               {selected === ans.id && <span className="radio-dot"></span>}
//             </span>
//           </button>
//         ))}
//         <div className="pagination">
//           <span className="dot blue"></span>
//           <span className="dot blue"></span>
//           <span className="dot white"></span>
//           <span className="dot white"></span>
//           <span className="dot white"></span>
//         </div>
//            <div className="btns">
//             <ChevronLeft size={33} onClick={()=> setPage('Home6')}></ChevronLeft>............  2 / 20  ............
//             <ChevronRight size={33} onClick={()=> setPage('Challenges')}></ChevronRight> 
//            </div>      </div>
//     </div>
//   );
// };

// const ChallengesScreen = ({ setPage }) => {
//   const [selected, setSelected] = useState(null);

//   const StatusIcons = () => (
//     <div className="status-icons" style={{ display: 'flex', gap: '5px' }}>
//              <svg width="20" height="12" viewBox="0 0 20 12">
//         <rect x="0" y="9" width="3" height="3" rx="0.6" fill="#000" />
//         <rect x="5" y="7" width="3" height="5" rx="0.6" fill="#000" opacity="0.85" />
//         <rect x="10" y="5" width="3" height="7" rx="0.6" fill="#000" opacity="0.7" />
//         <rect x="15" y="3" width="3" height="9" rx="0.6" fill="#000" opacity="0.55" />
//       </svg>
//       {/* wifi */}
//       <svg width="20" height="12" viewBox="0 0 24 24">
//         <path d="M2 8c5.5-5 14.5-5 20 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
//         <path d="M6 12c3.5-3 8.5-3 12 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
//         <path d="M10 16c1.5-1 3.5-1 5 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
//         <circle cx="12.5" cy="19" r="1.2" fill="#000"/>
//       </svg>
//       {/* battery */}
//       <svg width="28" height="12" viewBox="0 0 28 12">
//         <rect x="1" y="1" width="22" height="10" rx="2" fill="none" stroke="#000" strokeWidth="2"/>
//         <rect x="24" y="4" width="3" height="4" rx="1" fill="#000"/>
//         <rect x="3" y="3" width="18" height="6" rx="1" fill="#000"/>
//       </svg>
//     </div>
//   );
  
//   return (
//     <div className="screen">
//       <div className="header-challenges">
//         <div className="status-bar">
//           <span className="time">9:41</span>
//           <StatusIcons />
//         </div>
//         <div className="nav-icons">
//           <ChevronLeft size={24} className="nav-icon" onClick={() => setPage('QuizPage2')} />
//           <div className="bell-container">
//             <Bell size={24} className="nav-icon" onClick={() => setPage('Notifications')} />
//             <User size={24} className="nav-icon" onClick={() => setPage('Profile')} />
//           </div>
//         </div>
//       </div>
//       <div className="content-challenges">
//         <h2 className="title">
//           <span className="white-text">Challenges</span>{" "}
//           <span className="black-text"><span className="white-text">1</span>/3</span>
//         </h2>
//         <p className="question">
//           Umuryango ubaneneza ushiyirahamwe urangwa no kumvikana gukorerahamwe,
//           kuganira kubibazo bihari,gufashanya, gucyina ndetse no kuzuzanya??
//         </p>
//         <div className="options">
//           <label className="option">
//              Yego
//               <input
//               type="radio"
//               name="answer"
//               checked={selected === "Yego"}
//               onChange={() => setSelected("Yego")}
//             />
//           </label>
//           <label className="option">
//             Oya
//             <input
//               type="radio"
//               name="answer"
//               checked={selected === "Oya"}
//               onChange={() => setSelected("Oya")}
//             />
//           </label>
//         </div>
//         <div className="dots">
//           <span className="dot active"></span>
//           <span className="dot"></span>
//           <span className="dot"></span>
//         </div>
//         <div className="btns">
          
//         <button className="next-button" onClick={() => setPage('QuizPage2')}> Back </button>
//         <button className="next-button" onClick={() => setPage('Activities')}>Next</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const ActivitiesScreen = ({ setPage }) => {
//   const items = [
//  {
//       id: 1,
//       title: "Educational Sessions and Skill-Building",
//       emoji: "👨‍👩‍👧‍👦"
//     },
//     {
//       id: 2,
//       title: "Family Meetings for Problem Solving",
//       emoji: "🗣️"
//     },
//     {
//       id: 3,
//       title: "Home Maintenance Rotations",
//       emoji: "🧹"
//     },
//     { id: 5, emoji: "🎲", title: "Play a Game", description: "Playing a board game or card game." },
//   ];

//   const StatusIcons = () => (
//     <div className="status-right" aria-hidden>
//       <svg width="20" height="12" viewBox="0 0 20 12">
//         <rect x="0" y="9" width="3" height="3" rx="0.6" fill="#000" />
//         <rect x="5" y="7" width="3" height="5" rx="0.6" fill="#000" opacity="0.85" />
//         <rect x="10" y="5" width="3" height="7" rx="0.6" fill="#000" opacity="0.7" />
//         <rect x="15" y="3" width="3" height="9" rx="0.6" fill="#000" opacity="0.55" />
//       </svg>
//       <svg width="20" height="12" viewBox="0 0 24 24">
//         <path d="M2 8c5.5-5 14.5-5 20 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
//         <path d="M6 12c3.5-3 8.5-3 12 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
//         <path d="M10 16c1.5-1 3.5-1 5 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
//         <circle cx="12" cy="20" r="1.5" fill="#000" />
//       </svg>
//     </div>
//   );
  
//   const BackIcon = () => (
//     <ChevronLeft size={24} color="black" onClick={() => setPage('Challenges')} />
//   );
  
//   const BellIcon = () => (
//     <div className="bell-wrap" onClick={() => setPage('Notifications')}>
//       <Bell size={24} color="#000" />
//       <div className="notif-dot"></div>
//     </div>
//   );
  
//   const UserIcon = () => (<>
//     <User size={24} color="#000" onClick={() => setPage('AddMember')} className="User" />
//     <span style={{color:'black',position:'relative',top:'-0.6rem',left:'-1.5rem'}}>➕</span>
//     </>
//   );

//   return (
//     <div className="phone">
//        <div className="header-activities">
//         <div className="status-row">
//           <span className="time">9:41</span>
//           <StatusIcons />
//         </div>
//         <div className="nav-row">
//           <BackIcon />
//           <div className="nav-right">
//             <BellIcon />
//             <UserIcon />
//           </div>
//         </div>
//         <h1 className="page-title">Family Daily Activities</h1>
//       </div>
//       <div className="content-activities">
//         <div className="cards">
//           {items.map((it) => (
//             <div className="card" key={it.id}>
//               <div className="medallion">
//                 <div className="medallion-inner">{it.emoji}</div>
//               </div>
//               <div className="card-body">
//                 <span className="green-pill">{it.title}</span>
//                 <span className="card-title">{it.description}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//         <svg className="footer-blob" viewBox="0 0 400 140" preserveAspectRatio="none">
//   <path
//     d="M0,20 
//        C60,60 90,0 140,40 
//        C170,65 220,65 260,60 
//        C300,55 360,70 400,50 
//        L400,140 L0,140 Z"
//     fill="#a3b7a3"
//   />
// </svg>
//       </div>
//     </div>
//   );
// };


// const AddMember = ({setPage}) => {
//  const [selected, setSelected] = useState(null);
//    const [passwordShown, setPasswordShown] = useState(false);
//    const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
 
//    const togglePasswordVisibility = () => {
//      setPasswordShown(!passwordShown);
//    };
 
//    const toggleConfirmPasswordVisibility = () => {
//      setConfirmPasswordShown(!confirmPasswordShown);
//    };
 
// return(

// <>

//  <div className="screen-add">
//       {/* Header */}
//       <div className="header-add">
//         <div className="status-bar-add">
//           <span className="time">9:41</span>
//           <div className="status-icons-add">
//           <svg width="20" height="12" viewBox="0 0 20 12">
//         <rect x="0" y="9" width="3" height="3" rx="0.6" fill="#000" />
//         <rect x="5" y="7" width="3" height="5" rx="0.6" fill="#000" opacity="0.85" />
//         <rect x="10" y="5" width="3" height="7" rx="0.6" fill="#000" opacity="0.7" />
//         <rect x="15" y="3" width="3" height="9" rx="0.6" fill="#000" opacity="0.55" />
//       </svg>
//       {/* wifi */}
//       <svg width="20" height="12" viewBox="0 0 24 24">
//         <path d="M2 8c5.5-5 14.5-5 20 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
//         <path d="M6 12c3.5-3 8.5-3 12 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
//         <path d="M10 16c1.5-1 3.5-1 5 0" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
//         <circle cx="12.5" cy="19" r="1.2" fill="#000"/>
//       </svg>
//       {/* battery */}
//       <svg width="28" height="12" viewBox="0 0 28 12">
//         <rect x="1" y="1" width="22" height="10" rx="2" fill="none" stroke="#000" strokeWidth="2"/>
//         <rect x="24" y="4" width="3" height="4" rx="1" fill="#000"/>
//         <rect x="3" y="3" width="18" height="6" rx="1" fill="#000"/>
//       </svg>
//           </div>
//         </div>
//         <div className="nav-icons-add">
//           {/* home */}
// <svg width="29" height="30" viewBox="0 0 24 24" fill="none" onClick={ ()=> setPage('Home3')} >
//   <path d="M3 9.5L12 3L21 9.5V20C21 20.55 20.55 21 20 21H15C14.45 21 14 20.55 14 20V15C14 14.45 13.55 14 13 14H11C10.45 14 10 14.45 10 15V20C10 20.55 9.55 21 9 21H4C3.45 21 3 20.55 3 20V9.5Z" 
//         stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
// </svg>

//           <div className="bell-container-add">
//              <svg width="29" height="30" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" onClick={ ()=>setPage('Notifications')}>
//         <path d="M18 8a6 6 0 10-12 0c0 7-3 7-3 7h18s-3 0-3-7"/>
//         <path d="M13.73 21a2 2 0 01-3.46 0"/>
//       </svg>
//             <span className="green-dot-add"></span>
//             <div className="profile-add">
//                           <svg width="29" height="30" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="profile-icon-add">
//       <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
//       <circle cx="12" cy="7" r="4"/>
//     </svg>
//             </div>

//           </div>
          
//         </div>
//       </div>

//       {/* Pink Content */}
//       <div className="content-add">
  

      
//               <button className="signup-button-add2" onClick={() => console.log('Signup clicked!')}>
//                         View all Members
//                       </button>
        
//            <div className="header-add2">
//                   <div className="signup-area-add">
//                     <div className="signup-title-add">Add Family Members !</div>
//                     <div className="main-content-add">
//                       <div className="input-group-add">
//                         <User size={20} className="icon-add" />
//                         <input type="text" placeholder="Full Names" />
//                       </div>
        
//                       <div className="input-group-add">
//                         <Phone size={20} className="icon-add" />
//                         <input type="tel" placeholder="Phone number" />
//                       </div>
        
//                       <div className="input-group-add">
//                         <Lock size={20} className="icon-add" />
//                         <input
//                           type={passwordShown ? 'text' : 'password'}
//                           placeholder="Password"
//                         />
//                         <span className="password-toggle-add" onClick={togglePasswordVisibility}>
//                           {passwordShown ? <EyeOff size={20} className="icon-add" /> : <Eye size={20} className="icon-add" />}
//                         </span>
//                       </div>
        
//                       <div className="input-group-add">
//                         <Lock size={20} className="icon-add" />
//                         <input
//                           type={confirmPasswordShown ? 'text' : 'password'}
//                           placeholder="Confirm Password"
//                         />
//                         <span className="password-toggle-add" onClick={toggleConfirmPasswordVisibility}>
//                           {confirmPasswordShown ? <EyeOff size={20} className="icon-add" /> : <Eye size={20} className="icon-add" />}
//                         </span>
//                       </div>
        
//                       <button className="signup-button-add" onClick={() => console.log('Signup clicked!')}>
//                         Add Member
//                       </button>
//                     </div>
//                   </div>
            
//       </div>


//       </div>
//     </div>


// </>
  
// );
// }

// const NotificationsScreen = ({ setPage }) => {
//   const notifications = [
//     { id: 1, name: "Mutesi", message: "Success to", points: "300PTS", extra: "About Quize", avatar: "👧🏼" },
//     { id: 2, name: "Mama", message: "you have", points: "00PTS", extra: "your failed Please try again", avatar: "🙍🏽‍♀️" },
//     { id: 3, name: "Dady", message: "please try to finishing all the quition", points: "", extra: "", avatar: "👱🏽‍♂️" },
//     { id: 4, name: "Karim", message: "you have to updating your challenges and answering all quitions", points: "", extra: "", avatar: "👨🏽‍🦱" },
//   ];
  
//   const StatusIcons = () => (
//     <div className="status-icons" style={{ display: 'flex', gap: '5px' }}>
//             <span>📶</span>
//             <span>📡</span>
//             <span>🔋</span>
    
//     </div>
//   );

//   return (
//     <div className="screen">
//       <div className="headernoti">
//         <div className="status-bar">
//           <span className="time">9:41</span>
//           <StatusIcons />
//         </div>
//          <ChevronLeft size={24} className="nav-icon" onClick={() => setPage('Challenges')} />
//         <div className="nav-icons">
//            <span className="nav-icon-home" onClick={()=>setPage('Home3')}>🏠</span>
//           <div className="bell-container">
//             <span className="nav-icon" onClick={()=>setPage('Notifications')}>🔔</span>
//             {/* <span className="green-dot"></span> */}
//             <span className="nav-icon" onClick={()=>setPage('Profile')}>👤</span>
//           </div>
//         </div>
//       </div>
//       <div className="contentnoti">
//         <h2 className="notif-title">Notification</h2>
//         {notifications.map((n) => (
//           <div className="notif-card" key={n.id}>
//             <div className="avatar">{n.avatar}</div>
//             <div className="notif-text">
//               <span className="dim">{n.message} </span>
//               <strong className="black">{n.name}</strong>{" "}
//               {n.points && (
//                 <>
//                   <span className="dim">you have </span>
//                   <strong className="black">{n.points}</strong>{" "}
//                 </>
//               )}
//               <span className="dim">{n.extra}</span>
//             </div>
//           </div>
//         ))}
//         <div className="arrow-down">
//           <ChevronDown size={34} /><br />
//           <ChevronDown size={34} style={{position:"relative",top:'-1.7rem'}} />
//         </div>
//       </div>
//     </div>
//   );
// };

// const ProfileScreen = ({ setPage }) => {
//   return (
//     <div className="flex flex-col items-center justify-center h-full bg-gray-100 p-4">
//       <ChevronLeft className="absolute top-4 left-4 cursor-pointer" onClick={() => setPage('Home')} size={24} />
//       <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md flex flex-col items-center space-y-4">
//         <h2 className="text-xl font-bold">Profile</h2>
//         <div className="text-6xl">👤</div>
//         <p className="text-gray-600">This is a placeholder for your profile information.</p>
//         <button className="w-full py-2 px-4 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors">Edit Profile</button>
//       </div>
//     </div>
//   );
// };

// export default function App() {
//   const [page, setPage] = useState("Home3");
//   const [isLoading, setIsLoading] = useState(true);
//   const [user, setUser] = useState(null);
//   const [userData, setUserData] = useState(null);
//   const [dbInstance, setDbInstance] = useState(null);
//   const [authInstance, setAuthInstance] = useState(null);
  
//   useEffect(() => {
//     // Inject consolidated CSS
//     const styleSheet = document.createElement("style");
//     styleSheet.type = "text/css";
//     styleSheet.innerText = allStyles;
//     document.head.appendChild(styleSheet);
  
//     if (firebaseConfig) {
//       setDbInstance(db);
//       setAuthInstance(auth);
  
//       const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
//         if (currentUser) {
//           setUser(currentUser);
//           const userDocRef = doc(db, 'users', currentUser.uid);
//           const unsubscribeSnapshot = onSnapshot(userDocRef, (doc) => {
//             if (doc.exists()) {
//               setUserData(doc.data());
//             } else {
//               setDoc(userDocRef, { createdAt: new Date() });
//             }
//             setIsLoading(false);
//           });
//           return unsubscribeSnapshot;
//         } else {
//           // Sign in anonymously if no token is available
//           try {
//             if (initialAuthToken) {
//               await signInWithCustomToken(auth, initialAuthToken);
//             } else {
//               await signInAnonymously(auth);
//             }
//           } catch (error) {
//             console.error("Firebase auth error:", error);
//           }
//           setIsLoading(false);
//         }
//       });
  
//       return () => {
//         unsubscribeAuth();
//       };
//     } else {
//       setIsLoading(false);
//     }
//   }, []);
  

//   const renderPage = () => {
//     switch (page) {
//       case "Home2":
//         return <Home2 setPage={setPage} />;
//       case "Home3":
//         return <Home3 setPage={setPage} />;
//       case "SignupForm":
//         return <SignupForm setPage={setPage} />;
//       case "Home5":
//         return <Home5 setPage={setPage} />;
//       case "Home6":
//         return <Home6 setPage={setPage} />;
//       case "QuizPage2":
//         return <QuizPage2 setPage={setPage} />;
//       case "Challenges":
//         return <ChallengesScreen setPage={setPage} />;
//       case "Activities":
//         return <ActivitiesScreen setPage={setPage} />;
//       case "Notifications":
//         return <NotificationsScreen setPage={setPage} />;
//       case "Profile":
//         return <ProfileScreen setPage={setPage} />;
//       case "StartQuiz":
//         return <StartQuiz setPage={setPage} />;
//         case "AddMember":
//         return <AddMember setPage={setPage} />;
//       default:
//         return <div>Page Not Found</div>;
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-100">
//         <div className="text-xl font-semibold">Loading...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-100 flex items-center justify-center min-h-screen">
//       <div className="relative w-full max-w-sm h-[90vh] bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
//         <div className="flex-grow overflow-y-auto">
//           {renderPage()}
//         </div>
//         {/* <div className="flex justify-around items-center bg-gray-200 p-2 border-t-2 border-gray-300">
//           <button
//             onClick={() => setPage("Home3")}
//             className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${
//               (page === "Home2" || page === "Home3") ? "text-blue-500" : "text-gray-500 hover:text-gray-700"
//             }`}
//           >
//             <Home size={24} />
//             <span className="text-xs mt-1">Home</span>
//           </button>
//           <button
//             onClick={() => setPage("Challenges")}
//             className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${
//               page === "Challenges" ? "text-blue-500" : "text-gray-500 hover:text-gray-700"
//             }`}
//           >
//             <Shield size={24} />
//             <span className="text-xs mt-1">Challenges</span>
//           </button>
//           <button
//             onClick={() => setPage("Notifications")}
//             className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${
//               page === "Notifications" ? "text-blue-500" : "text-gray-500 hover:text-gray-700"
//             }`}
//           >
//             <Bell size={24} />
//             <span className="text-xs mt-1">Alerts</span>
//           </button>
//           <button
//             onClick={() => setPage("Activities")}
//             className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${
//               page === "Activities" ? "text-blue-500" : "text-gray-500 hover:text-gray-700"
//             }`}
//           >
//             <Clipboard size={24} />
//             <span className="text-xs mt-1">Activities</span>
//           </button>
//           <button
//             onClick={() => setPage("Profile")}
//             className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${
//               page === "Profile" ? "text-blue-500" : "text-gray-500 hover:text-gray-700"
//             }`}
//           >
//             <User size={24} />
//             <span className="text-xs mt-1">Profile</span>
//           </button>
//         </div> */}
//       </div>
//     </div>
//   );
// }



































