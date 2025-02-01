// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
import { getAnalytics } from "firebase/analytics"; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID
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