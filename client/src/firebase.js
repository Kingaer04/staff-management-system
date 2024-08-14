// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "staff-management-system-532b2.firebaseapp.com",
  projectId: "staff-management-system-532b2",
  storageBucket: "staff-management-system-532b2.appspot.com",
  messagingSenderId: "530157176753",
  appId: "1:530157176753:web:0e79f0f3edbf3b24ae1f90"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);