import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCOd2z43XYX84kFaSZoWvne0tPwlOdea20",
    authDomain: "team-sync-80bfb.firebaseapp.com",
    projectId: "team-sync-80bfb",
    storageBucket: "team-sync-80bfb.firebasestorage.app",
    messagingSenderId: "247475288681",
    appId: "1:247475288681:web:a0ca1753abe868553f00f8",
    measurementId: "G-GCWGDGHZB8"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export { firebaseApp, db };
