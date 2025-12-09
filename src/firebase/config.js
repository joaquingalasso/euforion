// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// REPLACE these values with your project's credentials from the Firebase Console
const firebaseConfig = {
    apiKey: "AIzaSyCetLr1oXk_sAShK9tY9jrZDjOVVfqE9Uk",
    authDomain: "euforion-8b16d.firebaseapp.com",
    projectId: "euforion-8b16d",
    storageBucket: "euforion-8b16d.firebasestorage.app",
    messagingSenderId: "1067596159832",
    appId: "1:1067596159832:web:a2f944baf75006caba232d",
    measurementId: "G-N88GBZX74L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
