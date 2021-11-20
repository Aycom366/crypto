// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4oaPOAWb3c83adF1vsKqVU4wVjATe790",
  authDomain: "crypto-a4a9f.firebaseapp.com",
  projectId: "crypto-a4a9f",
  storageBucket: "crypto-a4a9f.appspot.com",
  messagingSenderId: "27338411716",
  appId: "1:27338411716:web:cdaaf71561a29b9f1bc391",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export { auth, db };
