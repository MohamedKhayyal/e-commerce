// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBG69kWYW9WjD8Ge5ae_yIZMqK04X8iznw",
  authDomain: "login-450e5.firebaseapp.com",
  projectId: "login-450e5",
  storageBucket: "login-450e5.firebasestorage.app",
  messagingSenderId: "625034254151",
  appId: "1:625034254151:web:ea7d1067ac9a9df7985e62",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;
