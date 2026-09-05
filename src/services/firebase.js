// Firebase SDK Configuration & Initialization
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyB1Qq6gwgO9E0wnI4wU7QZU7M0k_UFVqcQ",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "fordportro.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "fordportro",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "fordportro.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "15756171006",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:15756171006:web:58c6832ce7253457b977af",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://fordportro-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);

export default app;
