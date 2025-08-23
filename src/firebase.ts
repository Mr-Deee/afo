// // src/firebase.ts
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getDatabase } from "firebase/database";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBr8N0ZzY72y0ngGJgvFonq34CmWUDw1u8",
//   authDomain: "attendacefaceid.firebaseapp.com",
//   databaseURL: "https://attendacefaceid-default-rtdb.firebaseio.com",
//   projectId: "attendacefaceid",
//   storageBucket: "attendacefaceid.appspot.com",
//   messagingSenderId: "398296892498",
//   appId: "1:398296892498:web:9781e44efcc40d03fc0b8b",
//   measurementId: "G-43GFWPZ0Q8"
// };

// // Initialize Firebase only once
// const app = initializeApp(firebaseConfig);

// // Initialize Analytics (optional, only runs in browser)
// let analytics;
// if (typeof window !== "undefined") {
//   analytics = getAnalytics(app);
// }

// // Export Firebase services
// const db = getDatabase(app);

// export { app, db, analytics };





// src/firebase.ts
import { initializeApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";
// import { getAnalytics } from "firebase/analytics"; // optional

// Config pulled from env variables (never hardcode keys!)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Prevent re-initialization during hot reload
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Export Database
const db = getDatabase(app);

// (Optional) Analytics - only load on client
// let analytics;
// if (typeof window !== "undefined") {
//   analytics = getAnalytics(app);
// }

export { app, db };
