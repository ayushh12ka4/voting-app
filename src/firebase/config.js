// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA51BazknNexAedqOzUekfRcOsnzjv6JIk",
  authDomain: "user-authentication-be60f.firebaseapp.com",
  projectId: "user-authentication-be60f",
  storageBucket: "user-authentication-be60f.firebasestorage.app",
  messagingSenderId: "499419678177",
  appId: "1:499419678177:web:d30768b5ab141b091c3ea0",
  measurementId: "G-MWT2DD4HF0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
