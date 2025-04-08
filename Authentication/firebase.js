
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOADGRm_lwDuuGSf8VtYWU0b-jxPOqVQ8",
  authDomain: "job-poster-53d47.firebaseapp.com",
  projectId: "job-poster-53d47",
  storageBucket: "job-poster-53d47.firebasestorage.app",
  messagingSenderId: "787726755865",
  appId: "1:787726755865:web:2d19a889f1d24f4136a288"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);