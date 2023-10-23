import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDxPAyQOckEj9TUb-Xc-FAldX6UFmQLiV0",
    authDomain: "frontend-cf-645a3.firebaseapp.com",
    projectId: "frontend-cf-645a3",
    storageBucket: "frontend-cf-645a3.appspot.com",
    messagingSenderId: "488199446660",
    appId: "1:488199446660:web:d970a4dfcbe89b2e4fa2d1",
};

export const firebaseAppConfig = initializeApp(firebaseConfig);
import("./firebase/firebase_auth_google_provider");
import("./firebase/firebase_firestore_users");
import("./firebase/firebase_firestore_users_accounts");
import("./firebase/firebase_firestore_users_accounts_movements");
