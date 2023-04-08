// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAplHf0nLXVhjYZuOUqO6sNYwnk8GHPFEU",
  authDomain: "react-tms-c0f9a.firebaseapp.com",
  projectId: "react-tms-c0f9a",
  storageBucket: "react-tms-c0f9a.appspot.com",
  messagingSenderId: "712300766611",
  appId: "1:712300766611:web:6e2b8ee03e2e17e6b33466",
  measurementId: "G-YMWKP5KDY6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth , db, storage };
