import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged,
  signInWithCustomToken,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
import { getFirestore, doc, setDoc, onSnapshot, collection, addDoc } from "firebase/firestore";
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
  ChevronDown
} from "lucide-react";

// This is the complete app. Replace your existing App.jsx with this code.

// Global variables from the canvas environment
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : null;
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

// Use a placeholder if running locally, otherwise use the provided Firebase config.
const firebaseApp = firebaseConfig
  ? initializeApp(firebaseConfig)
  : console.log("Firebase config not found. Using a dummy setup for local testing.");

const db = firebaseConfig ? getFirestore(firebaseApp) : null;
const auth = firebaseConfig ? getAuth(firebaseApp) : null;


// Consolidated CSS from all files
const allStyles = `
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
    margin: 0;
  }
  
  .main-content p {
    font-size: 1rem;
    margin-top: 0.5rem;
  }
      .welcome-circle {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 20rem; /* Adjust size to match image */
    height: 20rem; /* Adjust size to match image */
    background: transpalent;
    border-radius: 50%;
    border: 20px solid white;
    text-align: center;
    padding: 3rem;
    box-sizing: border-box;
    margin-top: 7rem; /* Position from top */
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
  
  .continue-button span:first-child {
    font-weight: bold;
    color: #380323ff;
    margin-right: 0.5rem;
  }
  
  .arrow-group {
    display: flex;
    color: #380323ff;
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

.question {
  color: rgb(221, 216, 216);
  margin-top: 30px;
  line-height: 1.5;
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
   
  // .next-button {
  //   background: #e00085;
  //   color: white;
  //   padding: 15px 30px;
  //   border-radius: 50px;
  //   border: none;
  //   font-size: 16px;
  //   font-weight: bold;
  //   cursor: pointer;
  //   margin-top: 20px;
  //   align-self: center;
  // }

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
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
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
    font-size: 14px;
    font-weight: 400;
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
}

.h2{
  color: #cc197c;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;

}
.p{
  margin: 0px;
}
.btn-tangira{
  background-color: #cc197c;
  height: 50px;
  width: 90%;
  border-radius: 25px;
  position: relative;
  bottom: -3rem;
  transition: transform 0.2s ease;
  }
   .btn-tangira:hover {
    transform: translateX(5px);
    cursor: pointer;
  }
.nav-icons:hover{
cursor: pointer;
}

  // AddMember Css 
   

  body {
  margin: 0;
  font-family: Arial, sans-serif;
}

.screen-add {
  width: 100%;
  max-width: 480px;
  margin: auto;
  background-color: #000;
  height: 100vh;
  overflow: hidden;

}

/* HEADER */
.header-add {
  height: 13vh;
  background: transparent;
  /* border-bottom-left-radius: 24px; */
  border-bottom-right-radius: 40px;
   border-bottom-left-radius: 40px;
  padding: 10px 15px 20px;
  bottom: 2rem;
  position: relative;
  z-index: 2;
}
.header-add2 {
  height: 67vh;
  background: #d9d9d9;
  margin-left: -22px;
  width: 103%;
  /* border-bottom-left-radius: 24px; */
  border-top-right-radius: 35px;
   border-top-left-radius: 35px;
  padding:10px 15px 20px;
  position: relative;
  bottom: -10rem;
  z-index: 2;
  
}

.status-bar-add {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #161616;
}

.status-icons-add {
  display: flex;
  gap: 5px;
}

.nav-icons-add {
  display: flex;
  justify-content: space-between;
  margin-top: 36px;
}

.nav-icon-add {
  font-size: 24px;
  color: black;
  cursor: pointer;
}

.bell-container-add {
  position: relative;
  display: flex;
  gap: 10px;
  margin-right: 15px;
}

.green-dot-add {
  position: absolute;
  top: 0;
  right: 59px;
  width: 10px;
  height: 10px;
  background-color: limegreen;
  border-radius: 50%;
}

/* CONTENT */
.content-add {
  background: linear-gradient(to bottom, #cc197c, #86014c);
  /* border-top-left-radius: 30px;
  border-top-right-radius: 30px; */
  margin-top: -130px; /* Overlap effect */
  padding: 20px;
 height: 100%;
}

.title-add {
  margin-top: 80px;
}

.white-text-add {
 color: rgb(221, 216, 216);
  font-weight: bold;
}

.black-text-add {
  color: rgb(49, 49, 49);
}

.question-add {
  color: rgb(221, 216, 216);
  margin-top: 30px;
  line-height: 1.5;
}
.btn-tangira-add{
  background-color: #cc197c;
  height: 50px;
  width: 90%;
  border-radius: 25px;
  position: relative;
  bottom: -3rem;
}
.h2-add{
  color: #cc197c;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;

}
.p-add{
  margin: 0px;
}
.profile-add{
  width: 45px;
  height: 45px;
  background-color: #bebaba;
  border-radius: 50%;
  display: flex;
  position: relative;
  top: -4px;
}
.profile-icon-add{
  align-self: center;
  margin-left: auto;
  margin-right: auto;
}

  .signup-title-add {
    color: rgb(38, 36, 36);
    font-size: 2rem;
    font-weight: bold;
    margin: 1.5rem;
  }
  .main-content-add {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
  }
  .input-group-add {
    background: #f0f0f0; /* Light gray background for input fields */
    border-radius: 1.5rem;
    padding: 0.75rem 1.5rem;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    box-shadow: none; /* No shadow on inputs to match the image */
  }
  .input-group-add input {
    flex-grow: 1;
    border: none;
    outline: none;
    background: transparent; /* Transparent background to show parent's gray color */
    font-size: 1rem;
    color: black;
  }
  .input-group-add input::placeholder {
    color: #a0a0a0;
  }
  .input-group-add .icon-add {
    color: #a0a0a0;
  }
  .input-group-add .password-toggle-add {
    cursor: pointer;
  }
  .signup-button-add{
    background: #eb1695; /* Solid color as per the image */
    color: white;
    font-size: 1.25rem;
    padding: 1rem;
    border-radius: 1.5rem;
    border: none;
    width: 100%;
    margin-top: 2rem;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    transition: background 0.3s ease;
  }
  .signup-button-add2 {
    background: #eb1695; /* Solid color as per the image */
    color: white;
    font-size: 1.25rem;
    padding: 1rem;
    border-radius: 1.5rem;
    border: none;
    width: 50%;
    position: relative;
    top: 8rem;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    transition: background 0.3s ease;
  }
  .signup-button-add:hover {
    background: #d4145a;
  }
  .login-link {
    display: block;
    text-align: center;
    margin-top: 1.5rem;
    color: #888;
    font-size: 1rem;
  }
  .login-link a {
    color: #eb1695;
    text-decoration: none;
    font-weight: bold;
  }

`;

// Helper components to be used inside the main App component
const Home3 = ({ setPage }) => {
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
        <span style={{ color: "black" }}>9:41</span>
        <StatusIcons />
      </div>
      <div className="main-content">
        <div style={{ marginBottom: "2rem" }} className="welcome-circle">
          <h1 style={{ fontWeight: 800 }}>Welcome to <br /> FamilyBonding App </h1>
          <p>where Joy brings Togetherness</p>
        </div>
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
        <button className="continue-button" onClick={() => setPage('Home2')}>
          <span>Continue</span>
          <span className="arrow-group">
            <ChevronRight size={24} />
            <ChevronRight size={24} />
          </span>
        </button>
      </div>
    </div>
  );
};
const Home2 = ({ setPage }) => {
  const [selectedLanguage, setSelectedLanguage] = useState("Kinyarwanda");
  const languages = ["Kinyarwanda", "English", "French"];
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
        <span style={{ color: "black" }}>9:41</span>
        <StatusIcons />
      </div>
      <span className="back-arrow" style={{ marginTop: '3.5rem' , color: "black" , fontSize: "30px" }} onClick={() => setPage('Home3')}>&#8592;</span>
      <h1 className="main-title">Select Language !</h1>
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
      <button className="skip-button" onClick={() => setPage('SignupForm')}>
        Next &gt;
      </button>
    </div>
  );
};
const SignupForm = ({ setPage }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    if (!email) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        fullName: fullName,
        phoneNumber: phoneNumber,
        email: email,
      });

      alert("Sign up successful!");
      setPage('StartQuiz');
    } catch (error) {
      console.error("Error during sign-up:", error);
      alert(`Sign up failed: ${error.message}`);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const StatusIcons = () => (
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
  );
  return (
    <div className="mobile-frame">
      <div className="top-bar">
        <ChevronLeft size={24} className="back-arrow" onClick={() => setPage('Home2')} />
        <StatusIcons />
      </div>
      <div className="form-box">
        <h2>Sign Up</h2>
        <div className="input-group">
          <User size={20} className="icon" />
          <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </div>
        <div className="input-group">
          <Phone size={20} className="icon" />
          <input type="tel" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </div>
        <div className="input-group">
          <Home size={20} className="icon" />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input-group">
          <Lock size={20} className="icon" />
          <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <span className="password-toggle" onClick={togglePasswordVisibility}>
            {showPassword ? <EyeOff size={20} className="icon" /> : <Eye size={20} className="icon" />}
          </span>
        </div>
        <div className="input-group">
          <Lock size={20} className="icon" />
          <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          <span className="password-toggle" onClick={toggleConfirmPasswordVisibility}>
            {showConfirmPassword ? <EyeOff size={20} className="icon" /> : <Eye size={20} className="icon" />}
          </span>
        </div>
        <button className="signup-button" onClick={handleSignup}>Sign Up</button>
        <div className="login-link">
          Already have an account? <a href="#" onClick={() => setPage('LoginForm')}>Log in</a>
        </div>
      </div>
    </div>
  );
};
const LoginForm = ({ setPage }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      setPage('Home6');
    } catch (error) {
      console.error("Error during login:", error);
      alert(`Login failed: ${error.message}`);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const StatusIcons = () => (
    <div className="status-icons">
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
        <circle cx="12.5" cy="19" r="1.2" fill="#000"/>
      </svg>
      <svg width="28" height="12" viewBox="0 0 28 12">
        <rect x="1" y="1" width="22" height="10" rx="2" fill="none" stroke="#000" strokeWidth="2"/>
        <rect x="24" y="4" width="3" height="4" rx="1" fill="#000"/>
        <rect x="3" y="3" width="18" height="6" rx="1" fill="#000"/>
      </svg>
    </div>
  );

  return (
    <div className="mobile-frame">
      <div className="top-bar">
        <ChevronLeft size={24} className="back-arrow" onClick={() => setPage('Home2')} />
        <StatusIcons />
      </div>
      <div className="form-box">
        <h2>Log In</h2>
        <div className="input-group">
          <Home size={20} className="icon" />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input-group">
          <Lock size={20} className="icon" />
          <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <span className="password-toggle" onClick={togglePasswordVisibility}>
            {showPassword ? <EyeOff size={20} className="icon" /> : <Eye size={20} className="icon" />}
          </span>
        </div>
        <button className="signup-button" onClick={handleLogin}>Log In</button>
        <div className="login-link">
          Don't have an account? <a href="#" onClick={() => setPage('SignupForm')}>Sign up</a>
        </div>
      </div>
    </div>
  );
};
const StartQuiz = ({ setPage }) => {
  const StatusIcons = () => (
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
  );

  return (
    <div className="screen">
      <div className="header">
        <div className="status-bar">
          <span className="time">9:41</span>
          <StatusIcons />
        </div>
        <div className="nav-icons">
          <div className="nav-icon-home">
            <Home size={24} onClick={() => setPage('Home6')} />
          </div>
          <div className="bell-container">
            <Bell size={24} className="nav-icon" onClick={() => setPage('Notifications')} />
            <span className="green-dot"></span>
            <User size={24} className="nav-icon" onClick={() => setPage('Profile')} />
          </div>
        </div>
      </div>
      <div className="content">
        <div className="title">
          <h2 className="white-text">Gushaka Igisubizo</h2>
          <p className="question white-text">
            Ibibazo byibanda ku buzima bw'umuryango
          </p>
          <p className="question white-text">
            Buryohe!
          </p>
          <div className="btns">
            <button className="btn-tangira" onClick={() => setPage('QuizPage2')}>
              <h2 className="h2">Tangira</h2>
              <p className="p">Gusubiza ibibazo</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
const QuizPage2 = ({ setPage }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const quizData = {
    question: "Which of the following describes a healthy family relationship?",
    options: [
      "Lack of communication",
      "Mutual respect and support",
      "Constant conflict",
      "Ignoring problems"
    ],
    translations: {
      kinyarwanda: {
        question: "Ni ibihe bikurikira biranga umuryango mwiza?",
        options: [
          "Kutaganira",
          "Kuba buri wese yubaha mugenzi we kandi amufasha",
          "Guhora mubitotezo",
          "Kwirengagiza ibibazo"
        ]
      },
      french: {
        question: "Laquelle des propositions suivantes décrit une relation familiale saine ?",
        options: [
          "Manque de communication",
          "Respect mutuel et soutien",
          "Conflit constant",
          "Ignorer les problèmes"
        ]
      }
    }
  };

  const StatusIcons = () => (
    <div className="status-icons">
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
      <div style={{ marginRight: '0.25rem', height: '0.5rem', width: '0.75rem', border: '1px solid black', borderRadius: '2px' }}></div>
      <div style={{ height: '0.5rem', width: '1.25rem', backgroundColor: 'black', borderRadius: '2px' }}></div>
    </div>
  );

  return (
    <div className="quiz-wrapper">
      <div className="header-section">
        <div className="status-bar">
          <span className="time">9:41</span>
          <StatusIcons />
        </div>
        <div className="nav-icons">
          <ChevronLeft size={24} onClick={() => setPage('StartQuiz')} style={{ cursor: 'pointer' }} />
          <div className="right-icons">
            <Settings size={24} style={{ cursor: 'pointer' }} onClick={() => setPage('Settings')} />
            <div className="bell-wrapper">
              <Bell size={24} style={{ cursor: 'pointer' }} onClick={() => setPage('Notifications')} />
              <div className="notification-dot"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="main-section">
        <p className="quiz-title">Daily Challenge</p>
        <h2 className="quiz-question-number">
          <span className="question-white">Question</span>
          <span className="number-highlight">1</span>
          <span className="total-black">/3</span>
        </h2>
        <p className="quiz-question">{quizData.translations.kinyarwanda.question}</p>
        <div style={{ marginTop: '20px' }}>
          {quizData.translations.kinyarwanda.options.map((option, index) => (
            <button
              key={index}
              className="answer-btn"
              onClick={() => setSelectedAnswer(option)}
              style={{
                background: selectedAnswer === option ? '#eb1695' : 'white',
                color: selectedAnswer === option ? 'white' : 'black'
              }}
            >
              <span className="answer-text">{option}</span>
              <div className={`radio-circle ${selectedAnswer === option ? 'radio-selected' : ''}`}>
                {selectedAnswer === option && <div className="radio-dot"></div>}
              </div>
            </button>
          ))}
        </div>
        <div className="pagination">
          <span className="dot blue"></span>
          <span className="dot white"></span>
          <span className="dot white"></span>
        </div>
        <button
          className="quiz-submit-btn"
          onClick={() => {
            if (selectedAnswer === "Kuba buri wese yubaha mugenzi we kandi amufasha") {
              alert("Correct answer!");
            } else {
              alert("Incorrect answer. Please try again.");
            }
            setPage('Challenges');
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};
const ChallengesScreen = ({ setPage }) => {
  const [selected, setSelected] = useState(null);

  const StatusIcons = () => (
    <div className="status-icons" style={{ display: 'flex', gap: '5px' }}>
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
  
  return (
    <div className="screen">
      <div className="header-challenges">
        <div className="status-bar">
          <span className="time">9:41</span>
          <StatusIcons />
        </div>
        <div className="nav-icons">
          <ChevronLeft size={24} className="nav-icon" onClick={() => setPage('QuizPage2')} />
          <div className="bell-container">
            <Bell size={24} className="nav-icon" onClick={() => setPage('Notifications')} />
            <User size={24} className="nav-icon" onClick={() => setPage('Profile')} />
          </div>
        </div>
      </div>
      <div className="content-challenges">
        <h2 className="title">
          <span className="white-text">Challenges</span>{" "}
          <span className="black-text"><span className="white-text">1</span>/3</span>
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
        </div>
        <div className="btns">
        <button className="next-button" onClick={() => setPage('QuizPage2')}> Back </button>
        <button className="next-button" onClick={() => setPage('Activities')}>Next</button>
        </div>
      </div>
    </div>
  );
};
const ActivitiesScreen = ({ setPage }) => {
  const items = [
    {
      id: 1,
      title: "Educational Sessions and Skill-Building",
      emoji: "👨‍👩‍👧‍👦",
      description: "Sessions to learn new things and improve skills."
    },
    {
      id: 2,
      title: "Family Meetings for Problem Solving",
      emoji: "🗣️",
      description: "Regular meetings to discuss and solve family issues."
    },
    {
      id: 3,
      title: "Home Maintenance Rotations",
      emoji: "🧹",
      description: "A schedule for everyone to help with house chores."
    },
    { 
      id: 5, 
      emoji: "🎲", 
      title: "Play a Game", 
      description: "Playing a board game or card game." 
    },
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
        <h1 className="page-title">Family Daily Activities</h1>
      </div>
      <div className="content-activities">
        <div className="cards">
          {items.map((it) => (
            <div className="card" key={it.id}>
              <div className="medallion">
                <div className="medallion-inner">{it.emoji}</div>
              </div>
              <div className="card-body">
                <span className="green-pill">{it.title}</span>
                <span className="card-title">{it.description}</span>
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
const Notifications = ({ setPage }) => {
  const StatusIcons = () => (
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
  );
  return (
    <div className="screen">
      <div className="headernoti">
        <div className="status-bar">
          <span className="time">9:41</span>
          <StatusIcons />
        </div>
        <div className="nav-icons">
          <ChevronLeft size={24} className="nav-icon" onClick={() => setPage('Challenges')} />
          <div className="bell-container">
            <Bell size={24} className="nav-icon" onClick={() => setPage('Notifications')} />
            <User size={24} className="nav-icon" onClick={() => setPage('Profile')} />
          </div>
        </div>
      </div>
      <div className="contentnoti">
        <h2 className="notif-title">Notifications</h2>
        <div className="notif-card">
          <div className="avatar">🔔</div>
          <p className="notif-text">
            <span className="black">You have a new challenge!</span><br />
            <span className="dim">10:00 AM</span>
          </p>
          <ChevronRight size={24} />
        </div>
        <div className="notif-card">
          <div className="avatar">👨‍👩‍👧‍👦</div>
          <p className="notif-text">
            <span className="black">Your family member accepted your request.</span><br />
            <span className="dim">8:30 AM</span>
          </p>
          <ChevronRight size={24} />
        </div>
        <div className="notif-card">
          <div className="avatar">🏆</div>
          <p className="notif-text">
            <span className="black">You earned a new badge!</span><br />
            <span className="dim">Yesterday</span>
          </p>
          <ChevronRight size={24} />
        </div>
        <div className="arrow-down">
          <ChevronDown size={24} />
        </div>
      </div>
    </div>
  );
};
const Home6 = ({setPage}) => {
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
        <span style={{ color: "black" }}>9:41</span>
        <StatusIcons />
      </div>
      <div className="main-content">
        <div style={{ marginBottom: "2rem" }} className="welcome-circle">
          <h1 style={{ fontWeight: 800 }}>Welcome to <br /> FamilyBonding App </h1>
          <p>where Joy brings Togetherness</p>
        </div>
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
        <button className="continue-button" onClick={() => setPage('Home2')}>
          <span>Continue</span>
          <span className="arrow-group">
            <ChevronRight size={24} />
            <ChevronRight size={24} />
          </span>
        </button>
      </div>
    </div>
  );
};
const Profile = ({setPage}) => {
   const StatusIcons = () => (
    <div className="status-icons-add">
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
  return (
    <div className="screen-add">
      <div className="header-add">
        <div className="status-bar-add">
          <span className="time">9:41</span>
          <StatusIcons/>
        </div>
        <div className="nav-icons-add">
          <ChevronLeft size={24} className="nav-icon-add" onClick={() => setPage('Home6')} />
          <div className="bell-container-add">
            <Bell size={24} className="nav-icon-add" />
            <span className="green-dot-add"></span>
            <User size={24} className="nav-icon-add" onClick={() => setPage('Home6')} />
          </div>
        </div>
      </div>
      <div className="content-add">
        <div className="title-add">
          <h2 className="white-text-add">My Profile</h2>
          <p className="question-add white-text-add">
            Update your profile
          </p>
        </div>
        <div className="header-add2">
          <div className="profile-add">
            <User size={30} className="profile-icon-add" />
          </div>
          <p style={{color:'black',position:'relative',top:'-1.5rem',textAlign:'center'}}>Family Name</p>
          <div className="main-content-add">
            <div className="input-group-add">
              <Clipboard size={20} className="icon-add" />
              <input type="text" placeholder="Update Name"/>
            </div>
            <div className="input-group-add">
              <MapPin size={20} className="icon-add" />
              <input type="tel" placeholder="Location" />
            </div>
            <div className="input-group-add">
              <ShieldAlert size={20} className="icon-add" />
              <input type="tel" placeholder="Security" />
            </div>
            <div className="input-group-add">
              <HelpCircle size={20} className="icon-add" />
              <input type="tel" placeholder="Help & Support" />
            </div>
            <div className="input-group-add">
              <LogOut size={20} className="icon-add" />
              <input type="tel" placeholder="Logout" onClick={() => setPage('Home3')}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};
const AddMember = ({setPage}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const StatusIcons = () => (
    <div className="status-icons-add">
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
  return (
    <div className="screen-add">
      <div className="header-add">
        <div className="status-bar-add">
          <span className="time">9:41</span>
          <StatusIcons/>
        </div>
        <div className="nav-icons-add">
          <ChevronLeft size={24} className="nav-icon-add" onClick={() => setPage('Activities')} />
          <div className="bell-container-add">
            <Bell size={24} className="nav-icon-add" />
            <span className="green-dot-add"></span>
            <User size={24} className="nav-icon-add" onClick={() => setPage('Home6')} />
          </div>
        </div>
      </div>
      <div className="content-add">
        <div className="title-add">
          <h2 className="white-text-add">Add Member</h2>
          <p className="question-add white-text-add">
            Create account for new family member
          </p>
        </div>
        <div className="header-add2">
          <p className="signup-title-add">Sign Up</p>
          <div className="main-content-add">
            <div className="input-group-add">
              <User size={20} className="icon-add" />
              <input type="text" placeholder="Full Name" />
            </div>
            <div className="input-group-add">
              <Phone size={20} className="icon-add" />
              <input type="tel" placeholder="Phone Number" />
            </div>
            <div className="input-group-add">
              <Lock size={20} className="icon-add" />
              <input type={showPassword ? "text" : "password"} placeholder="Password" />
              <span className="password-toggle-add" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={20} className="icon-add" /> : <Eye size={20} className="icon-add" />}
              </span>
            </div>
            <div className="input-group-add">
              <Lock size={20} className="icon-add" />
              <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password" />
              <span className="password-toggle-add" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <EyeOff size={20} className="icon-add" /> : <Eye size={20} className="icon-add" />}
              </span>
            </div>
          </div>
          <button className="signup-button-add2" onClick={() => setPage('Home6')}>Sign Up</button>
        </div>
      </div>
    </div>
  )
};

const Settings = ({setPage}) => {
  const StatusIcons = () => (
    <div className="status-icons-add">
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
  return (
    <div className="screen-add">
      <div className="header-add">
        <div className="status-bar-add">
          <span className="time">9:41</span>
          <StatusIcons/>
        </div>
        <div className="nav-icons-add">
          <ChevronLeft size={24} className="nav-icon-add" onClick={() => setPage('QuizPage2')} />
          <div className="bell-container-add">
            <Bell size={24} className="nav-icon-add" />
            <span className="green-dot-add"></span>
            <User size={24} className="nav-icon-add" onClick={() => setPage('Home6')} />
          </div>
        </div>
      </div>
      <div className="content-add">
        <div className="title-add">
          <h2 className="white-text-add">Settings</h2>
          <p className="question-add white-text-add">
            Update your settings
          </p>
        </div>
        <div className="header-add2">
          <p style={{color:'black',position:'relative',top:'2rem',textAlign:'center'}}>Family Name</p>
          <div className="main-content-add">
            <div className="input-group-add">
              <Clipboard size={20} className="icon-add" />
              <input type="text" placeholder="Update Name"/>
            </div>
            <div className="input-group-add">
              <MapPin size={20} className="icon-add" />
              <input type="tel" placeholder="Location" />
            </div>
            <div className="input-group-add">
              <ShieldAlert size={20} className="icon-add" />
              <input type="tel" placeholder="Security" />
            </div>
            <div className="input-group-add">
              <HelpCircle size={20} className="icon-add" />
              <input type="tel" placeholder="Help & Support" />
            </div>
            <div className="input-group-add">
              <LogOut size={20} className="icon-add" />
              <input type="tel" placeholder="Logout" onClick={() => setPage('Home3')}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

// Main App Component
const App = () => {
  const [page, setPage] = useState("Home6");
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (db && auth) {
      if (initialAuthToken) {
        signInWithCustomToken(auth, initialAuthToken)
          .then(() => console.log("Signed in with custom token."))
          .catch((error) => console.error("Error signing in with custom token:", error));
      } else {
        signInAnonymously(auth)
          .then(() => console.log("Signed in anonymously."))
          .catch((error) => console.error("Error signing in anonymously:", error));
      }

      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        if (currentUser) {
          console.log("Auth state changed, user is logged in.");
        } else {
          console.log("Auth state changed, user is logged out.");
        }
      });
      return () => unsubscribe();
    }
  }, []);

  const renderPage = () => {
    switch (page) {
      case "Home6":
        return <Home6 setPage={setPage} />;
      case "Home2":
        return <Home2 setPage={setPage} />;
      case "Home3":
        return <Home3 setPage={setPage} />;
      case "SignupForm":
        return <SignupForm setPage={setPage} />;
      case "LoginForm":
        return <LoginForm setPage={setPage} />;
      case "StartQuiz":
        return <StartQuiz setPage={setPage} />;
      case "QuizPage2":
        return <QuizPage2 setPage={setPage} />;
      case "Challenges":
        return <ChallengesScreen setPage={setPage} />;
      case "Activities":
        return <ActivitiesScreen setPage={setPage} />;
      case "Notifications":
        return <Notifications setPage={setPage} />;
      case "Profile":
        return <Profile setPage={setPage} />;
      case "AddMember":
        return <AddMember setPage={setPage} />;
      case "Settings":
        return <Settings setPage={setPage} />;
      default:
        return <Home6 setPage={setPage} />;
    }
  };

  return (
    <>
      <style>{allStyles}</style>
      <div className="app-container">
        {renderPage()}
      </div>
    </>
  );
};

export default App;





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
// .signup-title-add {
//   color: rgb(38, 36, 36);
//   font-size: 2rem;
//   font-weight: bold;
//   margin: 1.5rem;
// }
// .main-content-add {
//   flex-grow: 1;
//   display: flex;
//   flex-direction: column;
//   padding: 1.5rem;
// }
// .input-group-add {
//   background: #f0f0f0; /* Light gray background for input fields */
//   border-radius: 1.5rem;
//   padding: 0.75rem 1.5rem;
//   margin-bottom: 1.5rem;
//   display: flex;
//   align-items: center;
//   gap: 1rem;
//   box-shadow: none; /* No shadow on inputs to match the image */
// }
// .input-group-add input {
//   flex-grow: 1;
//   border: none;
//   outline: none;
//   background: transparent; /* Transparent background to show parent's gray color */
//   font-size: 1rem;
//   color: black;
// }
// .input-group-add input::placeholder {
//   color: #a0a0a0;
// }
// .input-group-add .icon-add {
//   color: #a0a0a0;
// }
// .input-group-add .password-toggle-add {
//   cursor: pointer;
// }
// .signup-button-add{
//   background: #eb1695; /* Solid color as per the image */
//   color: white;
//   font-size: 1.25rem;
//   padding: 1rem;
//   border-radius: 1.5rem;
//   border: none;
//   width: 100%;
//   margin-top: 2rem;
//   cursor: pointer;
//   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
//   transition: background 0.3s ease;
// }
// .signup-button-add2 {
//   background: #eb1695; /* Solid color as per the image */
//   color: white;
//   font-size: 1.25rem;
//   padding: 1rem;
//   border-radius: 1.5rem;
//   border: none;
//   width: 50%;
//   position: relative;
//   top: 8rem;
//   cursor: pointer;
//   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
//   transition: background 0.3s ease;
// }
// .signup-button-add:hover {
//   background: #d4145a;
// }
// `;

// // Translations object
// const translations = {
//   English: {
//     home3: {
//       welcome: "Welcome to",
//       appName: "FamilyBonding App",
//       slogan: "where Joy brings Togetherness",
//       continue: "Continue",
//     },
//     home2: {
//       selectLanguage: "Select Language!",
//       skip: "Skip",
//       next: "Next",
//     },
//     signup: {
//       title: "Sign Up",
//       namePlaceholder: "Full Name",
//       phonePlaceholder: "Phone Number",
//       passwordPlaceholder: "Password",
//       reenterPasswordPlaceholder: "Re-enter Password",
//       buttonText: "Sign Up",
//       alreadyHaveAccount: "Already have an account?",
//       login: "Login",
//     },
//     main: {
//       home: "Home",
//       challenges: "Challenges",
//       alerts: "Alerts",
//       activities: "Activities",
//       profile: "Profile",
//     },
//     quiz: {
//       quizTitle: "Daily Quiz",
//       question: "Question",
//       next: "Next",
//       submit: "Submit",
//       score: "Your Score",
//       tryAgain: "Try Again",
//       answers: "answers",
//     },
//     addMember: {
//       title: "Add a member",
//       namePlaceholder: "Full Name",
//       phonePlaceholder: "Phone Number",
//       emailPlaceholder: "Email Address",
//       rolePlaceholder: "Select Role",
//       addMemberBtn: "Add a new member",
//       cancel: "Cancel",
//     },
//     activities: {
//       title: "Activities",
//       join: "Join a challenge",
//       create: "Create a challenge",
//       date1: "15 Sep 2025",
//       challenge1Title: "Daily Challenge Quiz",
//       challenge1Desc: "Engage with fun questions about your family",
//       challenge2Title: "Weekly Scavenger Hunt",
//       challenge2Desc: "Find items around the house and share photos",
//       completed: "Completed",
//     },
//     notifications: {
//       title: "Alerts & Notifications",
//       notification1: {
//         dim: "You have a new challenge available. Click here to check it out!",
//         black: "New challenge!",
//       },
//       notification2: {
//         dim: "Your daily quiz is now ready. Click here to take it!",
//         black: "Quiz Ready!",
//       },
//       notification3: {
//         dim: "Someone responded to your challenge. See who it is!",
//         black: "Response Received!",
//       },
//     },
//     profile: {
//       title: "My Profile",
//       account: "Account",
//       changePassword: "Change Password",
//       notifications: "Notifications",
//       security: "Security",
//       helpCenter: "Help Center",
//       logout: "Log Out",
//     },
//   },
//   Kinyarwanda: {
//     home3: {
//       welcome: "Murakaza neza kuri",
//       appName: "FamilyBonding App",
//       slogan: "aho ibyishimo bihuriza abantu",
//       continue: "Komeza",
//     },
//     home2: {
//       selectLanguage: "Hitamo Ururimi!",
//       skip: "Simbuka",
//       next: "Komeza",
//     },
//     signup: {
//       title: "Iyandikishe",
//       namePlaceholder: "Amazina yose",
//       phonePlaceholder: "Nomero ya Telefone",
//       passwordPlaceholder: "Ijambo ry'ibanga",
//       reenterPasswordPlaceholder: "Subiramo ijambo ry'ibanga",
//       buttonText: "Iyandikishe",
//       alreadyHaveAccount: "Usanzwe ufite konte?",
//       login: "Injira",
//     },
//     main: {
//       home: "Ahabanza",
//       challenges: "Ibihugu",
//       alerts: "Ibibazo",
//       activities: "Ibikorwa",
//       profile: "Umwirondoro",
//     },
//     quiz: {
//       quizTitle: "Ikibazo cy'umunsi",
//       question: "Ikibazo",
//       next: "Komeza",
//       submit: "Ohereza",
//       score: "Amanota yawe",
//       tryAgain: "Ongera ugerageze",
//       answers: "Igisubizo",
//     },
//     addMember: {
//       title: "Ongeramo umuryango",
//       namePlaceholder: "Amazina yose",
//       phonePlaceholder: "Nomero ya telefone",
//       emailPlaceholder: "Adiresi ya imeyili",
//       rolePlaceholder: "Hitamo uruhare",
//       addMemberBtn: "Ongeramo umuryango mushya",
//       cancel: "Subira inyuma",
//     },
//     activities: {
//       title: "Ibikorwa",
//       join: "Injira mu ibyishimo",
//       create: "Tegura ibyishimo",
//       date1: "15 Nzeri 2025",
//       challenge1Title: "Ibiganiro bya buri munsi",
//       challenge1Desc: "Baza ibibazo bishimishije ku muryango wawe",
//       challenge2Title: "Gushakisha ibintu by'icyumweru",
//       challenge2Desc: "Shakisha ibintu mu nzu maze ubanze amafoto",
//       completed: "Byarangiye",
//     },
//     notifications: {
//       title: "Ibibazo & Imenyeshamakuru",
//       notification1: {
//         dim: "Ufite ibyishimo bishya. Kanda hano ugenzure!",
//         black: "Ibyishimo bishya!",
//       },
//       notification2: {
//         dim: "Ikibazo cyawe cya buri munsi cyarangiye. Kanda hano ukore!",
//         black: "Ikibazo cyarangiye!",
//       },
//       notification3: {
//         dim: "Hari uwagutoreye igisubizo. Reba uwakoze!",
//         black: "Igisubizo kirimo!",
//       },
//     },
//     profile: {
//       title: "Umwirondoro wanjye",
//       account: "Konti",
//       changePassword: "Hindura ijambo ry'ibanga",
//       notifications: "Imenyeshamakuru",
//       security: "Umutekano",
//       helpCenter: "Ubufasha",
//       logout: "Gusohoka",
//     },
//   },
//   Français: {
//     home3: {
//       welcome: "Bienvenue sur",
//       appName: "FamilyBonding App",
//       slogan: "où la joie rassemble",
//       continue: "Continuer",
//     },
//     home2: {
//       selectLanguage: "Sélectionnez la langue!",
//       skip: "Passer",
//       next: "Suivant",
//     },
//     signup: {
//       title: "S'inscrire",
//       namePlaceholder: "Nom complet",
//       phonePlaceholder: "Numéro de téléphone",
//       passwordPlaceholder: "Mot de passe",
//       reenterPasswordPlaceholder: "Confirmer le mot de passe",
//       buttonText: "S'inscrire",
//       alreadyHaveAccount: "Vous avez déjà un compte?",
//       login: "Se connecter",
//     },
//     main: {
//       home: "Accueil",
//       challenges: "Défis",
//       alerts: "Alertes",
//       activities: "Activités",
//       profile: "Profil",
//     },
//     quiz: {
//       quizTitle: "Quiz Quotidien",
//       question: "Question",
//       next: "Suivant",
//       submit: "Soumettre",
//       score: "Votre score",
//       tryAgain: "Réessayer",
//       answers: "réponses",
//     },
//     addMember: {
//       title: "Ajouter un membre",
//       namePlaceholder: "Nom complet",
//       phonePlaceholder: "Numéro de téléphone",
//       emailPlaceholder: "Adresse email",
//       rolePlaceholder: "Sélectionner le rôle",
//       addMemberBtn: "Ajouter un nouveau membre",
//       cancel: "Annuler",
//     },
//     activities: {
//       title: "Activités",
//       join: "Rejoindre un défi",
//       create: "Créer un défi",
//       date1: "15 Septembre 2025",
//       challenge1Title: "Quiz Quotidien",
//       challenge1Desc: "Répondez à des questions amusantes sur votre famille",
//       challenge2Title: "Chasse au trésor hebdomadaire",
//       challenge2Desc: "Trouvez des objets dans la maison et partagez des photos",
//       completed: "Terminé",
//     },
//     notifications: {
//       title: "Alertes & Notifications",
//       notification1: {
//         dim: "Un nouveau défi est disponible. Cliquez ici pour le découvrir!",
//         black: "Nouveau défi!",
//       },
//       notification2: {
//         dim: "Votre quiz quotidien est prêt. Cliquez ici pour le faire!",
//         black: "Quiz Prêt!",
//       },
//       notification3: {
//         dim: "Quelqu'un a répondu à votre défi. Voyez qui c'est!",
//         black: "Réponse reçue!",
//       },
//     },
//     profile: {
//       title: "Mon Profil",
//       account: "Compte",
//       changePassword: "Changer le mot de passe",
//       notifications: "Notifications",
//       security: "Sécurité",
//       helpCenter: "Centre d'aide",
//       logout: "Déconnexion",
//     },
//   },
//   Swahili: {
//     home3: {
//       welcome: "Karibu kwenye",
//       appName: "FamilyBonding App",
//       slogan: "ambapo furaha huleta umoja",
//       continue: "Endelea",
//     },
//     home2: {
//       selectLanguage: "Chagua Lugha!",
//       skip: "Ruka",
//       next: "Inayofuata",
//     },
//     signup: {
//       title: "Jisajili",
//       namePlaceholder: "Jina Kamili",
//       phonePlaceholder: "Nambari ya Simu",
//       passwordPlaceholder: "Neno la siri",
//       reenterPasswordPlaceholder: "Weka upya neno la siri",
//       buttonText: "Jisajili",
//       alreadyHaveAccount: "Tayari una akaunti?",
//       login: "Ingia",
//     },
//     main: {
//       home: "Nyumbani",
//       challenges: "Changamoto",
//       alerts: "Tahadhari",
//       activities: "Shughuli",
//       profile: "Wasifu",
//     },
//     quiz: {
//       quizTitle: "Jaribio la Kila Siku",
//       question: "Swali",
//       next: "Inayofuata",
//       submit: "Wasilisha",
//       score: "Alama zako",
//       tryAgain: "Jaribu tena",
//       answers: "majibu",
//     },
//     addMember: {
//       title: "Ongeza mwanachama",
//       namePlaceholder: "Jina Kamili",
//       phonePlaceholder: "Nambari ya Simu",
//       emailPlaceholder: "Barua pepe",
//       rolePlaceholder: "Chagua Jukumu",
//       addMemberBtn: "Ongeza mwanachama mpya",
//       cancel: "Ghairi",
//     },
//     activities: {
//       title: "Shughuli",
//       join: "Jiunge na changamoto",
//       create: "Tengeneza changamoto",
//       date1: "15 Septemba 2025",
//       challenge1Title: "Jaribio la Kila Siku",
//       challenge1Desc: "Jihusishe na maswali ya kufurahisha kuhusu familia yako",
//       challenge2Title: "Mchezo wa kutafuta vitu vya kila wiki",
//       challenge2Desc: "Tafuta vitu nyumbani na ushiriki picha",
//       completed: "Imekamilika",
//     },
//     notifications: {
//       title: "Tahadhari & Arifa",
//       notification1: {
//         dim: "Una changamoto mpya inapatikana. Bonyeza hapa ili kuichunguza!",
//         black: "Changamoto mpya!",
//       },
//       notification2: {
//         dim: "Jaribio lako la kila siku sasa liko tayari. Bonyeza hapa kulifanya!",
//         black: "Jaribio liko tayari!",
//       },
//       notification3: {
//         dim: "Mtu amejibu changamoto yako. Angalia ni nani!",
//         black: "Jibu limepokelewa!",
//       },
//     },
//     profile: {
//       title: "Wasifu Wangu",
//       account: "Akaunti",
//       changePassword: "Badilisha neno la siri",
//       notifications: "Arifa",
//       security: "Usalama",
//       helpCenter: "Kituo cha Usaidizi",
//       logout: "Ondoka",
//     },
//   },
// };


// // Helper components to be used inside the main App component
// const Home3 = ({ setPage, currentLanguage }) => {
//   const t = translations[currentLanguage];
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
//           <h1 style={{ fontWeight: 800 }}>{t.home3.welcome} <br /> {t.home3.appName} </h1>
//           <p>{t.home3.slogan}</p>
//         </div>
//         <svg width="250" height="250" viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', bottom: '0' }}>
//           {/* Parent 1 (left) */}
//           <rect x="50" y="100" width="40" height="150" fill="#2d2d2d" />
//           <rect x="55" y="100" width="30" height="20" fill="#f5f5f5" />
//           <circle cx="70" cy="95" r="15" fill="#f5f5f5" />
//           {/* Parent 2 (right) */}
//           <rect x="160" y="100" width="40" height="150" fill="#2d2d2d" />
//           <rect x="165" y="100" width="30" height="20" fill="#f5f5f5" />
//           <circle cx="180" cy="95" r="15" fill="#f5f5f5" />
//         </svg>
//         <button className="continue-button" onClick={() => setPage('Home2')}>
//           <span>{t.home3.continue}</span>
//           <span className="arrow-group">
//             <ChevronRight size={24} />
//             <ChevronRight size={24} />
//           </span>
//         </button>
//       </div>
//     </div>
//   );
// };

// const Home2 = ({ setPage, onLanguageSelect, currentLanguage }) => {
//   const t = translations[currentLanguage];
//   const languages = ["Kinyarwanda", "English", "Français", "Swahili"];
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
//       <span className="back-arrow" style={{ marginTop: '3.5rem', color: "black", fontSize: "30px" }} onClick={() => setPage('Home3')}>&#8592;</span>
//       <h1 className="main-title">{t.home2.selectLanguage}</h1>
//       <div className="language-buttons">
//         {languages.map((lang) => (
//           <button
//             key={lang}
//             onClick={() => onLanguageSelect(lang)}
//             className={`language-button ${currentLanguage === lang ? 'selected' : ''}`}
//           >
//             <span>{lang}</span>
//             <div className={`checkbox ${currentLanguage === lang ? 'selected' : ''}`}>
//               {currentLanguage === lang && <div className="inner-circle"></div>}
//             </div>
//           </button>
//         ))}
//       </div>
//       <div className="btns">
//         <a className="skip-button" onClick={() => setPage("Signup")}>
//           {t.home2.skip} &gt;
//         </a>
//       </div>
//     </div>
//   );
// };


// const SignupForm = ({ setPage, currentLanguage }) => {
//   const t = translations[currentLanguage];
//   const [showPassword, setShowPassword] = useState(false);
//   const [showReenterPassword, setShowReenterPassword] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };
//   const toggleReenterPasswordVisibility = () => {
//     setShowReenterPassword(!showReenterPassword);
//   };
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     setIsSubmitting(true);
//     setTimeout(() => {
//       setIsSubmitting(false);
//       setPage("QuizPage");
//     }, 2000); // Simulate a network request
//   };
//   return (
//     <div className="mobile-frame">
//       <div className="top-bar">
//         <span className="back-arrow" onClick={() => setPage('Home2')}>&#8592;</span>
//       </div>
//       <div className="form-box">
//         <div style={{ padding: "0 10px" }}>
//           <h2 style={{ fontWeight: 800 }}>{t.signup.title}</h2>
//           <form onSubmit={handleSubmit}>
//             <div className="input-group">
//               <User className="icon" size={20} />
//               <input type="text" placeholder={t.signup.namePlaceholder} />
//             </div>
//             <div className="input-group">
//               <Phone className="icon" size={20} />
//               <input type="tel" placeholder={t.signup.phonePlaceholder} />
//             </div>
//             <div className="input-group">
//               <Lock className="icon" size={20} />
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder={t.signup.passwordPlaceholder}
//               />
//               <span className="password-toggle" onClick={togglePasswordVisibility}>
//                 {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//               </span>
//             </div>
//             <div className="input-group">
//               <Lock className="icon" size={20} />
//               <input
//                 type={showReenterPassword ? "text" : "password"}
//                 placeholder={t.signup.reenterPasswordPlaceholder}
//               />
//               <span className="password-toggle" onClick={toggleReenterPasswordVisibility}>
//                 {showReenterPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//               </span>
//             </div>
//             <button
//               type="submit"
//               className="signup-button"
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? "Signing Up..." : t.signup.buttonText}
//             </button>
//           </form>
//           <div style={{ marginTop: "1rem", textAlign: "center", fontSize: "0.875rem" }}>
//             <span style={{ color: "#777" }}>{t.signup.alreadyHaveAccount}</span>
//             <a style={{ color: "#d4145a", fontWeight: "bold", marginLeft: "0.25rem" }} href="#">
//               {t.signup.login}
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const AddMember = ({ setPage, currentLanguage }) => {
//   const t = translations[currentLanguage];
//   const [selectedRole, setSelectedRole] = useState("Parent");

//   return (
//     <div className="screen-add">
//       <div className="header-add">
//         <div className="status-bar-add">
//           <span style={{ color: "#161616", fontSize: "14px", fontWeight: "bold" }}>9:41</span>
//           <div className="status-icons-add">
//             <svg width="20" height="12" viewBox="0 0 20 12">
//               <rect x="0" y="9" width="3" height="3" rx="0.6" fill="#161616" />
//               <rect x="5" y="7" width="3" height="5" rx="0.6" fill="#161616" opacity="0.85" />
//               <rect x="10" y="5" width="3" height="7" rx="0.6" fill="#161616" opacity="0.7" />
//               <rect x="15" y="3" width="3" height="9" rx="0.6" fill="#161616" opacity="0.55" />
//             </svg>
//             <svg width="20" height="12" viewBox="0 0 24 24">
//               <path d="M2 8c5.5-5 14.5-5 20 0" fill="none" stroke="#161616" strokeWidth="2" strokeLinecap="round" />
//               <path d="M6 12c3.5-3 8.5-3 12 0" fill="none" stroke="#161616" strokeWidth="2" strokeLinecap="round" />
//               <path d="M10 16c1.5-1 3.5-1 5 0" fill="none" stroke="#161616" strokeWidth="2" strokeLinecap="round" />
//               <circle cx="12" cy="20" r="1.5" fill="#161616" />
//             </svg>
//             <div style={{ marginRight: '0.25rem', height: '0.5rem', width: '0.75rem', border: '1px solid black', borderRadius: '2px' }}></div>
//             <div style={{ height: '0.5rem', width: '1.25rem', backgroundColor: 'black', borderRadius: '2px' }}></div>
//           </div>
//         </div>
//         <div className="nav-icons-add">
//           <ChevronLeft className="nav-icon-add" size={32} color="#161616" onClick={() => setPage('Profile')} />
//         </div>
//       </div>
//       <div className="content-add">
//         <h2 className="signup-title-add">{t.addMember.title}</h2>
//         <div className="main-content-add">
//           <div className="profile-add">
//             <User className="profile-icon-add" size={24} color="white" />
//           </div>
//           <div className="input-group-add">
//             <User className="icon-add" size={20} />
//             <input type="text" placeholder={t.addMember.namePlaceholder} />
//           </div>
//           <div className="input-group-add">
//             <Phone className="icon-add" size={20} />
//             <input type="tel" placeholder={t.addMember.phonePlaceholder} />
//           </div>
//           <div className="input-group-add">
//             <MapPin className="icon-add" size={20} />
//             <input type="email" placeholder={t.addMember.emailPlaceholder} />
//           </div>
//           <div className="input-group-add">
//             <User className="icon-add" size={20} />
//             <select
//               style={{
//                 background: "transparent",
//                 border: "none",
//                 outline: "none",
//                 flexGrow: "1",
//                 fontSize: "1rem"
//               }}
//               value={selectedRole}
//               onChange={(e) => setSelectedRole(e.target.value)}
//             >
//               <option value="" disabled>{t.addMember.rolePlaceholder}</option>
//               <option value="Parent">Parent</option>
//               <option value="Child">Child</option>
//             </select>
//           </div>
//           <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
//             <button className="signup-button-add" onClick={() => { /* add member logic */ }}>{t.addMember.addMemberBtn}</button>
//             <button className="signup-button-add2" onClick={() => setPage('Profile')}>{t.addMember.cancel}</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };


// const QuizPage = ({ setPage, currentLanguage }) => {
//   const t = translations[currentLanguage];
//   const [quizState, setQuizState] = useState(0); // 0: quiz, 1: score
//   const [selectedAnswer, setSelectedAnswer] = useState(null);
//   const quizData = [
//     {
//       question: "What is the capital of Rwanda?",
//       options: ["Kigali", "Kibungo", "Gisenyi", "Musanze"],
//       answer: "Kigali",
//     },
//     {
//       question: "Which of these is not a component of a healthy diet?",
//       options: ["Fruits", "Vegetables", "Sugary drinks", "Proteins"],
//       answer: "Sugary drinks",
//     },
//   ];
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [score, setScore] = useState(0);

//   const handleNext = () => {
//     if (selectedAnswer === quizData[currentQuestionIndex].answer) {
//       setScore(score + 1);
//     }
//     setSelectedAnswer(null);
//     if (currentQuestionIndex < quizData.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     } else {
//       setQuizState(1);
//     }
//   };

//   const handleTryAgain = () => {
//     setQuizState(0);
//     setCurrentQuestionIndex(0);
//     setScore(0);
//   };
//   const currentQuestion = quizData[currentQuestionIndex];

//   const StatusIcons = () => (
//     <div className="status-icons">
//       <svg width="20" height="12" viewBox="0 0 20 12">
//         <rect x="0" y="9" width="3" height="3" rx="0.6" fill="#161616" />
//         <rect x="5" y="7" width="3" height="5" rx="0.6" fill="#161616" opacity="0.85" />
//         <rect x="10" y="5" width="3" height="7" rx="0.6" fill="#161616" opacity="0.7" />
//         <rect x="15" y="3" width="3" height="9" rx="0.6" fill="#161616" opacity="0.55" />
//       </svg>
//       <svg width="20" height="12" viewBox="0 0 24 24">
//         <path d="M2 8c5.5-5 14.5-5 20 0" fill="none" stroke="#161616" strokeWidth="2" strokeLinecap="round" />
//         <path d="M6 12c3.5-3 8.5-3 12 0" fill="none" stroke="#161616" strokeWidth="2" strokeLinecap="round" />
//         <path d="M10 16c1.5-1 3.5-1 5 0" fill="none" stroke="#161616" strokeWidth="2" strokeLinecap="round" />
//         <circle cx="12" cy="20" r="1.5" fill="#161616" />
//       </svg>
//       <div style={{ marginRight: '0.25rem', height: '0.5rem', width: '0.75rem', border: '1px solid black', borderRadius: '2px' }}></div>
//       <div style={{ height: '0.5rem', width: '1.25rem', backgroundColor: 'black', borderRadius: '2px' }}></div>
//     </div>
//   );

//   return (
//     <div className="quiz-wrapper">
//       {quizState === 0 ? (
//         <>
//           <div className="header-section">
//             <div className="status-bar">
//               <span style={{ fontWeight: "bold" }}>9:41</span>
//               <StatusIcons />
//             </div>
//             <div className="nav-icons">
//               <ChevronLeft size={32} color="#161616" onClick={() => setPage('Signup')} />
//               <div className="right-icons">
//                 <div className="bell-wrapper">
//                   <Bell size={24} color="#161616" />
//                   <span className="notification-dot"></span>
//                 </div>
//                 <User size={24} color="#161616" />
//               </div>
//             </div>
//           </div>
//           <div className="main-section">
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <span className="quiz-title">{t.quiz.quizTitle}</span>
//             </div>
//             <h2 className="quiz-question-number question-white">{t.quiz.question} {currentQuestionIndex + 1}<span className="total-black">/{quizData.length}</span></h2>
//             <p className="quiz-question">{currentQuestion.question}</p>
//             <div style={{ marginTop: '20px' }}>
//               {currentQuestion.options.map((option, index) => (
//                 <button
//                   key={index}
//                   className="answer-btn"
//                   onClick={() => setSelectedAnswer(option)}
//                   style={{ backgroundColor: selectedAnswer === option ? "#fce4ec" : "white" }}
//                 >
//                   <span className="answer-text">{option}</span>
//                   <div className={`radio-circle ${selectedAnswer === option ? 'radio-selected' : ''}`}>
//                     {selectedAnswer === option && <div className="radio-dot"></div>}
//                   </div>
//                 </button>
//               ))}
//             </div>
//             <button
//               className="quiz-submit-btn"
//               onClick={handleNext}
//               disabled={!selectedAnswer}
//             >
//               {currentQuestionIndex < quizData.length - 1 ? t.quiz.next : t.quiz.submit}
//             </button>
//           </div>
//         </>
//       ) : (
//         <div className="main-section" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
//           <div className="score-card">
//             <h2>{t.quiz.score}: {score}/{quizData.length}</h2>
//             <p>{t.quiz.tryAgain}</p>
//           </div>
//           <button className="quiz-submit-btn" onClick={handleTryAgain}>{t.quiz.tryAgain}</button>
//           <button
//             onClick={() => setPage('Home')}
//             style={{ marginTop: '1rem', background: 'none', border: 'none', color: 'white', cursor: 'pointer', textDecoration: 'underline' }}
//           >
//             Go to Home
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };


// const ActivitiesScreen = ({ setPage, currentLanguage }) => {
//   const t = translations[currentLanguage];
//   return (
//     <div className="phone">
//       <div className="header-activities">
//         <div className="status-row">
//           <div className="time">9:41</div>
//           <div className="status-right">
//             <ChevronLeft size={24} color="#161616" onClick={() => setPage('Home')} />
//             <div style={{ display: 'flex', gap: '6px' }}>
//               <svg width="20" height="12" viewBox="0 0 20 12">
//                 <rect x="0" y="9" width="3" height="3" rx="0.6" fill="#161616" />
//                 <rect x="5" y="7" width="3" height="5" rx="0.6" fill="#161616" opacity="0.85" />
//                 <rect x="10" y="5" width="3" height="7" rx="0.6" fill="#161616" opacity="0.7" />
//                 <rect x="15" y="3" width="3" height="9" rx="0.6" fill="#161616" opacity="0.55" />
//               </svg>
//               <svg width="20" height="12" viewBox="0 0 24 24">
//                 <path d="M2 8c5.5-5 14.5-5 20 0" fill="none" stroke="#161616" strokeWidth="2" strokeLinecap="round" />
//                 <path d="M6 12c3.5-3 8.5-3 12 0" fill="none" stroke="#161616" strokeWidth="2" strokeLinecap="round" />
//                 <path d="M10 16c1.5-1 3.5-1 5 0" fill="none" stroke="#161616" strokeWidth="2" strokeLinecap="round" />
//                 <circle cx="12" cy="20" r="1.5" fill="#161616" />
//               </svg>
//               <div style={{ marginRight: '0.25rem', height: '0.5rem', width: '0.75rem', border: '1px solid black', borderRadius: '2px' }}></div>
//               <div style={{ height: '0.5rem', width: '1.25rem', backgroundColor: 'black', borderRadius: '2px' }}></div>
//             </div>
//           </div>
//         </div>
//         <div className="nav-row">
//           <div className="nav-right">
//             <div className="bell-wrap">
//               <Bell size={24} color="black" />
//               <div className="notif-dot"></div>
//             </div>
//           </div>
//         </div>
//         <h1 className="page-title">{t.activities.title}</h1>
//       </div>

//       <div className="content-activities">
//         <button style={{
//           width: '100%',
//           background: 'rgba(255,255,255,.25)',
//           color: '#fff',
//           borderRadius: '999px',
//           padding: '12px 18px',
//           fontSize: '14px',
//           fontWeight: 'bold',
//           border: 'none',
//           marginBottom: '20px',
//         }}>
//           {t.activities.join}
//         </button>
//         <button style={{
//           width: '100%',
//           background: 'rgba(255,255,255,.25)',
//           color: '#fff',
//           borderRadius: '999px',
//           padding: '12px 18px',
//           fontSize: '14px',
//           fontWeight: 'bold',
//           border: 'none',
//         }}>
//           {t.activities.create}
//         </button>

//         <div className="cards">
//           <div className="card">
//             <div className="medallion">
//               <div className="medallion-inner">
//                 <Clipboard size={24} color="#167a2f" />
//               </div>
//             </div>
//             <div className="card-body">
//               <div className="green-pill">{t.activities.completed}</div>
//               <div className="card-title">{t.activities.challenge1Title}</div>
//               <p style={{ fontSize: '14px' }}>{t.activities.challenge1Desc}</p>
//             </div>
//           </div>
//           <div className="card">
//             <div className="medallion">
//               <div className="medallion-inner">
//                 <Clipboard size={24} color="#167a2f" />
//               </div>
//             </div>
//             <div className="card-body">
//               <div className="green-pill">{t.activities.completed}</div>
//               <div className="card-title">{t.activities.challenge2Title}</div>
//               <p style={{ fontSize: '14px' }}>{t.activities.challenge2Desc}</p>
//             </div>
//           </div>
//           <p style={{
//             fontSize: '12px',
//             color: '#fff',
//             textAlign: 'center',
//             marginTop: '30px',
//             fontStyle: 'italic',
//           }}>
//             {t.activities.date1}
//           </p>
//         </div>
//         <svg className="footer-blob" width="400" height="140" viewBox="0 0 400 140" fill="none" xmlns="http://www.w3.org/2000/svg">
//           <path d="M-10.8753 145.454C-113.844 52.8872 -80.4485 -24.1685 10.6387 -52.0163C92.2152 -78.4907 194.571 -63.5518 286.823 -27.8631C373.194 7.29107 435.597 18.0673 481.547 51.5273C528.006 85.3412 433.275 141.654 400.932 163.654C365.176 187.358 297.809 174.524 223.738 174.524C154.218 174.524 10.5188 238.257 -10.8753 145.454Z" fill="#2c2f3a" />
//         </svg>
//       </div>
//     </div>
//   );
// };


// const ChallengesScreen = ({ setPage, currentLanguage }) => {
//   const t = translations[currentLanguage];
//   return (
//     <div className="screen">
//       <div className="header-challenges">
//         <div className="status-bar">
//           <span style={{ fontWeight: 'bold' }}>9:41</span>
//           <div className="status-icons">
//             <svg width="20" height="12" viewBox="0 0 20 12">
//               <rect x="0" y="9" width="3" height="3" rx="0.6" fill="#161616" />
//               <rect x="5" y="7" width="3" height="5" rx="0.6" fill="#161616" opacity="0.85" />
//               <rect x="10" y="5" width="3" height="7" rx="0.6" fill="#161616" opacity="0.7" />
//               <rect x="15" y="3" width="3" height="9" rx="0.6" fill="#161616" opacity="0.55" />
//             </svg>
//             <svg width="20" height="12" viewBox="0 0 24 24">
//               <path d="M2 8c5.5-5 14.5-5 20 0" fill="none" stroke="#161616" strokeWidth="2" strokeLinecap="round" />
//               <path d="M6 12c3.5-3 8.5-3 12 0" fill="none" stroke="#161616" strokeWidth="2" strokeLinecap="round" />
//               <path d="M10 16c1.5-1 3.5-1 5 0" fill="none" stroke="#161616" strokeWidth="2" strokeLinecap="round" />
//               <circle cx="12" cy="20" r="1.5" fill="#161616" />
//             </svg>
//             <div style={{ marginRight: '0.25rem', height: '0.5rem', width: '0.75rem', border: '1px solid black', borderRadius: '2px' }}></div>
//             <div style={{ height: '0.5rem', width: '1.25rem', backgroundColor: 'black', borderRadius: '2px' }}></div>
//           </div>
//         </div>
//         <div className="nav-icons">
//           <ChevronLeft size={32} color="#161616" onClick={() => setPage('Home')} />
//           <div className="bell-container">
//             <Bell size={24} color="#161616" />
//             <div className="notification-dot"></div>
//           </div>
//         </div>
//       </div>
//       <div className="content-challenges">
//         <h2 className="title white-text">
//           {t.main.challenges}
//         </h2>
//         <p className="question">
//           {t.activities.challenge1Desc}
//         </p>
//         <div className="options">
//           <label className="option">
//             <input type="radio" name="challenge-option" value="option1" />
//             <span>Option 1</span>
//           </label>
//           <label className="option">
//             <input type="radio" name="challenge-option" value="option2" />
//             <span>Option 2</span>
//           </label>
//         </div>
//         <div className="dots">
//           <div className="dot active"></div>
//           <div className="dot"></div>
//           <div className="dot"></div>
//         </div>
//         <div className="btns">
//           <button className="next-button" onClick={() => setPage('Home')}>
//             <ChevronLeft size={32} color="#fff" />
//           </button>
//           <button className="next-button" onClick={() => setPage('Home')}>
//             <ChevronRight size={32} color="#fff" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const NotificationsScreen = ({ setPage, currentLanguage }) => {
//   const t = translations[currentLanguage];
//   return (
//     <div className="screen">
//       <div className="headernoti">
//         <div className="status-bar">
//           <span style={{ fontWeight: 'bold' }}>9:41</span>
//           <div className="status-icons">
//             <svg width="20" height="12" viewBox="0 0 20 12">
//               <rect x="0" y="9" width="3" height="3" rx="0.6" fill="#161616" />
//               <rect x="5" y="7" width="3" height="5" rx="0.6" fill="#161616" opacity="0.85" />
//               <rect x="10" y="5" width="3" height="7" rx="0.6" fill="#161616" opacity="0.7" />
//               <rect x="15" y="3" width="3" height="9" rx="0.6" fill="#161616" opacity="0.55" />
//             </svg>
//             <svg width="20" height="12" viewBox="0 0 24 24">
//               <path d="M2 8c5.5-5 14.5-5 20 0" fill="none" stroke="#161616" strokeWidth="2" strokeLinecap="round" />
//               <path d="M6 12c3.5-3 8.5-3 12 0" fill="none" stroke="#161616" strokeWidth="2" strokeLinecap="round" />
//               <path d="M10 16c1.5-1 3.5-1 5 0" fill="none" stroke="#161616" strokeWidth="2" strokeLinecap="round" />
//               <circle cx="12" cy="20" r="1.5" fill="#161616" />
//             </svg>
//             <div style={{ marginRight: '0.25rem', height: '0.5rem', width: '0.75rem', border: '1px solid black', borderRadius: '2px' }}></div>
//             <div style={{ height: '0.5rem', width: '1.25rem', backgroundColor: 'black', borderRadius: '2px' }}></div>
//           </div>
//         </div>
//         <div className="nav-icons">
//           <ChevronLeft className="nav-icon" size={32} onClick={() => setPage('Home')} />
//           <div className="bell-container">
//             <User size={24} color="#161616" />
//           </div>
//         </div>
//       </div>
//       <div className="contentnoti">
//         <h2 className="notif-title">{t.notifications.title}</h2>
//         <div className="notif-card">
//           <div className="avatar">
//             <ShieldAlert size={30} color="#eb1695" />
//           </div>
//           <div className="notif-text">
//             <span className="black">{t.notifications.notification1.black}</span>
//             <br />
//             <span className="dim">{t.notifications.notification1.dim}</span>
//           </div>
//         </div>
//         <div className="notif-card">
//           <div className="avatar">
//             <Clipboard size={30} color="#eb1695" />
//           </div>
//           <div className="notif-text">
//             <span className="black">{t.notifications.notification2.black}</span>
//             <br />
//             <span className="dim">{t.notifications.notification2.dim}</span>
//           </div>
//         </div>
//         <div className="notif-card">
//           <div className="avatar">
//             <MapPin size={30} color="#eb1695" />
//           </div>
//           <div className="notif-text">
//             <span className="black">{t.notifications.notification3.black}</span>
//             <br />
//             <span className="dim">{t.notifications.notification3.dim}</span>
//           </div>
//         </div>
//         <div className="arrow-down">
//           <ChevronDown size={32} color="#fcfcfc" />
//         </div>
//       </div>
//     </div>
//   );
// };

// const ProfileScreen = ({ setPage, currentLanguage }) => {
//   const t = translations[currentLanguage];
//   return (
//     <div className="screen">
//       <div className="header">
//         <div className="status-bar">
//           <span style={{ fontWeight: 'bold' }}>9:41</span>
//           <div className="status-icons">
//             <svg width="20" height="12" viewBox="0 0 20 12">
//               <rect x="0" y="9" width="3" height="3" rx="0.6" fill="#161616" />
//               <rect x="5" y="7" width="3" height="5" rx="0.6" fill="#161616" opacity="0.85" />
//               <rect x="10" y="5" width="3" height="7" rx="0.6" fill="#161616" opacity="0.7" />
//               <rect x="15" y="3" width="3" height="9" rx="0.6" fill="#161616" opacity="0.55" />
//             </svg>
//             <svg width="20" height="12" viewBox="0 0 24 24">
//               <path d="M2 8c5.5-5 14.5-5 20 0" fill="none" stroke="#161616" strokeWidth="2" strokeLinecap="round" />
//               <path d="M6 12c3.5-3 8.5-3 12 0" fill="none" stroke="#161616" strokeWidth="2" strokeLinecap="round" />
//               <path d="M10 16c1.5-1 3.5-1 5 0" fill="none" stroke="#161616" strokeWidth="2" strokeLinecap="round" />
//               <circle cx="12" cy="20" r="1.5" fill="#161616" />
//             </svg>
//             <div style={{ marginRight: '0.25rem', height: '0.5rem', width: '0.75rem', border: '1px solid black', borderRadius: '2px' }}></div>
//             <div style={{ height: '0.5rem', width: '1.25rem', backgroundColor: 'black', borderRadius: '2px' }}></div>
//           </div>
//         </div>
//         <div className="nav-icons">
//           <ChevronLeft className="nav-icon" size={32} onClick={() => setPage('Home')} />
//           <div className="bell-container">
//             <Bell size={24} color="#161616" />
//             <div className="green-dot"></div>
//             <User className="User" size={24} color="#161616" onClick={() => setPage("Profile")} />
//           </div>
//         </div>
//       </div>
//       <div className="content">
//         <div className="profile-container" style={{ textAlign: "center", marginTop: "4rem" }}>
//           <div className="profile-add" style={{ margin: 'auto' }}>
//             <User size={40} color="white" />
//           </div>
//           <h2 className="title white-text" style={{ marginTop: '1rem', marginBottom: '1rem' }}>{t.profile.title}</h2>
//           <p className="white-text">User Name</p>
//         </div>
//         <div style={{
//           background: 'rgba(255,255,255,.25)',
//           color: '#fff',
//           borderRadius: '16px',
//           padding: '20px',
//           marginTop: '3rem',
//         }}>
//           <div className="setting-item" onClick={() => setPage('ChangePassword')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #777' }}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//               <Settings size={20} />
//               <span>{t.profile.account}</span>
//             </div>
//             <ChevronRight size={20} />
//           </div>
//           <div className="setting-item" onClick={() => setPage('ChangePassword')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #777' }}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//               <Lock size={20} />
//               <span>{t.profile.changePassword}</span>
//             </div>
//             <ChevronRight size={20} />
//           </div>
//           <div className="setting-item" onClick={() => setPage('Notifications')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #777' }}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//               <Bell size={20} />
//               <span>{t.profile.notifications}</span>
//             </div>
//             <ChevronRight size={20} />
//           </div>
//           <div className="setting-item" onClick={() => setPage('Security')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #777' }}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//               <Shield size={20} />
//               <span>{t.profile.security}</span>
//             </div>
//             <ChevronRight size={20} />
//           </div>
//           <div className="setting-item" onClick={() => setPage('HelpCenter')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #777' }}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//               <HelpCircle size={20} />
//               <span>{t.profile.helpCenter}</span>
//             </div>
//             <ChevronRight size={20} />
//           </div>
//           <div className="setting-item" onClick={() => setPage('Home3')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0' }}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//               <LogOut size={20} />
//               <span>{t.profile.logout}</span>
//             </div>
//             <ChevronRight size={20} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };


// const Home = ({ setPage, currentLanguage }) => {
//   const t = translations[currentLanguage];
//   return (
//     <div className="screen">
//       <div className="header">
//         <div className="status-bar">
//           <span style={{ fontWeight: 'bold' }}>9:41</span>
//           <div className="status-icons">
//             <svg width="20" height="12" viewBox="0 0 20 12">
//               <rect x="0" y="9" width="3" height="3" rx="0.6" fill="#161616" />
//               <rect x="5" y="7" width="3" height="5" rx="0.6" fill="#161616" opacity="0.85" />
//               <rect x="10" y="5" width="3" height="7" rx="0.6" fill="#161616" opacity="0.7" />
//               <rect x="15" y="3" width="3" height="9" rx="0.6" fill="#161616" opacity="0.55" />
//             </svg>
//             <svg width="20" height="12" viewBox="0 0 24 24">
//               <path d="M2 8c5.5-5 14.5-5 20 0" fill="none" stroke="#161616" strokeWidth="2" strokeLinecap="round" />
//               <path d="M6 12c3.5-3 8.5-3 12 0" fill="none" stroke="#161616" strokeWidth="2" strokeLinecap="round" />
//               <path d="M10 16c1.5-1 3.5-1 5 0" fill="none" stroke="#161616" strokeWidth="2" strokeLinecap="round" />
//               <circle cx="12" cy="20" r="1.5" fill="#161616" />
//             </svg>
//             <div style={{ marginRight: '0.25rem', height: '0.5rem', width: '0.75rem', border: '1px solid black', borderRadius: '2px' }}></div>
//             <div style={{ height: '0.5rem', width: '1.25rem', backgroundColor: 'black', borderRadius: '2px' }}></div>
//           </div>
//         </div>
//         <div className="nav-icons">
//           <ChevronLeft className="nav-icon" size={32} onClick={() => setPage('AddMember')} />
//           <div className="bell-container">
//             <Bell size={24} color="#161616" />
//             <div className="green-dot"></div>
//             <User className="User" size={24} color="#161616" onClick={() => setPage("Profile")} />
//           </div>
//         </div>
//       </div>
//       <div className="content">
//         <h2 className="title white-text">
//           {t.main.home}
//         </h2>
//         <h2 className="h2">
//           {t.quiz.quizTitle}
//         </h2>
//         <p className="p white-text">
//           {t.quiz.question} 1/2
//         </p>
//         <p className="question">
//           {t.quiz.question} 2/2
//         </p>
//         <button className="btn-tangira" onClick={() => setPage("QuizPage")}>
//           <p className="p white-text" style={{ textAlign: 'center', fontWeight: 'bold' }}>{t.quiz.next}</p>
//         </button>
//       </div>
//     </div>
//   );
// };

// // Main App Component
// const App = () => {
//   const [page, setPage] = useState("Home3");
//   const [user, setUser] = useState(null);
//   const [language, setLanguage] = useState("English");

//   useEffect(() => {
//     // Authenticate with Firebase on component mount
//     if (!auth) {
//       console.log("Firebase auth is not initialized. Skipping authentication.");
//       return;
//     }

//     if (initialAuthToken) {
//       signInWithCustomToken(auth, initialAuthToken)
//         .then(() => console.log("Signed in with custom token."))
//         .catch((error) => console.error("Error signing in with custom token:", error));
//     } else {
//       signInAnonymously(auth)
//         .then(() => console.log("Signed in anonymously."))
//         .catch((error) => console.error("Error signing in anonymously:", error));
//     }

//     // Listen for auth state changes
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       if (currentUser) {
//         console.log("Auth state changed, user is logged in.");
//       } else {
//         console.log("Auth state changed, user is logged out.");
//       }
//     });

//     // Clean up the subscription
//     return () => unsubscribe();
//   }, []);

//   const renderPage = () => {
//     switch (page) {
//       case "Home2":
//         return <Home2 setPage={setPage} onLanguageSelect={setLanguage} currentLanguage={language} />;
//       case "Home3":
//         return <Home3 setPage={setPage} currentLanguage={language} />;
//       case "Signup":
//         return <SignupForm setPage={setPage} currentLanguage={language} />;
//       case "QuizPage":
//         return <QuizPage setPage={setPage} currentLanguage={language} />;
//       case "Activities":
//         return <ActivitiesScreen setPage={setPage} currentLanguage={language} />;
//       case "Challenges":
//         return <ChallengesScreen setPage={setPage} currentLanguage={language} />;
//       case "Notifications":
//         return <NotificationsScreen setPage={setPage} currentLanguage={language} />;
//       case "Profile":
//         return <ProfileScreen setPage={setPage} currentLanguage={language} />;
//       case "AddMember":
//         return <AddMember setPage={setPage} currentLanguage={language} />;
//       case "Home":
//         return <Home setPage={setPage} currentLanguage={language} />;
//       default:
//         return <Home2 setPage={setPage} onLanguageSelect={setLanguage} currentLanguage={language} />;
//     }
//   };

//   return (
//     <>
//       <style>{allStyles}</style>
//       <div className="app-container">
//         {renderPage()}
//       </div>
//     </>
//   );
// };

// export default App;