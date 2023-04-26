// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxyz1P04qsLUPdrKQy_0DTccC72ToIlQE",
  authDomain: "imob-13ce4.firebaseapp.com",
  projectId: "imob-13ce4",
  storageBucket: "imob-13ce4.appspot.com",
  messagingSenderId: "527674062015",
  appId: "1:527674062015:web:31d03cd62a039d2376820a",
  measurementId: "G-05LL62GT27"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)