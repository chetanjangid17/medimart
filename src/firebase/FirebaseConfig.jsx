// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANkFYsyNhMfjMGgWm98X7KiDzoRPqT-98",
  authDomain: "myecom-bfe44.firebaseapp.com",
  projectId: "myecom-bfe44",
  storageBucket: "myecom-bfe44.appspot.com",
  messagingSenderId: "1055291343006",
  appId: "1:1055291343006:web:57df8e3276d427a3fe7b8f",
  measurementId: "G-GEB5Z4SC78"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export {auth,fireDB}