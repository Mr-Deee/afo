// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBr8N0ZzY72y0ngGJgvFonq34CmWUDw1u8",
  authDomain: "attendacefaceid.firebaseapp.com",
  databaseURL: "https://attendacefaceid-default-rtdb.firebaseio.com",
  projectId: "attendacefaceid",
  storageBucket: "attendacefaceid.appspot.com",
  messagingSenderId: "398296892498",
  appId: "1:398296892498:web:9781e44efcc40d03fc0b8b",
  measurementId: "G-43GFWPZ0Q8"
};

// Initialize Firebase only once
const app = initializeApp(firebaseConfig);

// Initialize Analytics (optional, only runs in browser)
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

// Export Firebase services
const db = getDatabase(app);

export { app, db, analytics };
