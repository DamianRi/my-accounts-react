import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyA6jHdb1tdDDNHwbkhnVJMfp63C3ZxBY80",
    authDomain: "personal-project-352ac.firebaseapp.com",
    projectId: "personal-project-352ac",
    storageBucket: "personal-project-352ac.appspot.com",
    messagingSenderId: "314701737314",
    appId: "1:314701737314:web:56b259b9cf03836336d03b",
};

// Initialize Firebase
export const firebaseAppConfig = initializeApp(firebaseConfig);
import("./firebase/firebase_auth_google_provider");
import("./firebase/firebase_firestore_users");
import("./firebase/firebase_firestore_users_accounts");
import("./firebase/firebase_firestore_users_accounts_movements");
