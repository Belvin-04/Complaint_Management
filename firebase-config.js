// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCM26UxvEzgoqbSz8LVQAFeEXN4y3IzVQA",
  authDomain: "complaint-management-55344.firebaseapp.com",
  projectId: "complaint-management-55344",
  storageBucket: "complaint-management-55344.appspot.com",
  messagingSenderId: "226180572961",
  appId: "1:226180572961:web:d442bf5dbc250016aa8060",
  measurementId: "G-97NJZ4JGW2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const db = getFirestore(app);
