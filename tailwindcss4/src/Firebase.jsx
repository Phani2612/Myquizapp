// Import the functions you need from the SDKs you need
import myFirebase from "firebase/compat/app";
import { getAnalytics } from "firebase/analytics";
import "firebase/compat/firestore"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDduI6xBABHdN9h8RWhQonrKszqOku9-N8",
  authDomain: "fooddeliveryapp-909e0.firebaseapp.com",
  projectId: "fooddeliveryapp-909e0",
  storageBucket: "fooddeliveryapp-909e0.firebasestorage.app",
  messagingSenderId: "304803153426",
  appId: "1:304803153426:web:84ad9fce2e595be206bacb",
  measurementId: "G-4RKWC830W2"
};

// Initialize Firebase
const app = myFirebase.initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const myAuth = getAuth(app)//Authentication in Firebase

export const myProvider = new GoogleAuthProvider()//Google Authentication in Firebase