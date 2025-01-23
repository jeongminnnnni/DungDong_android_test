// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
import { getAnalytics } from "firebase/analytics"; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAi38KZkhRRruvIBy0Fi3a2BXPLGnO3kDU",
    authDomain: "findingroommate-37b2a.firebaseapp.com",
    projectId: "findingroommate-37b2a",
    storageBucket: "findingroommate-37b2a.firebasestorage.app",
    messagingSenderId: "799445753557",
    appId: "1:799445753557:web:e59ffaa67e7e7b17298c5c",
    measurementId: "G-FMX05RGM9E"
  };

// Log: Check if Firebase is already initialized
if (!getApps().length) {
  console.log("Firebase --- Initializing...");
} else {
  console.log("Firebase --- Firebase is already initialized");
}

// Initialize Firebase (prevent duplicate initialization)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
console.log("Firebase --- Firebase App Initialized:", app.name);

// Optional: Initialize Analytics (if needed)
// const analytics = getAnalytics(app);
// logEvent(analytics, "page_view", { page: "home" });
// console.log("Analytics initialized");

// Initialize Firestore
const db = getFirestore(app);
console.log("Firebase --- Firestore initialized");

export { db };