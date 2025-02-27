import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyCOd2z43XYX84kFaSZoWvne0tPwlOdea20",
    authDomain: "team-sync-80bfb.firebaseapp.com",
    projectId: "team-sync-80bfb",
    storageBucket: "team-sync-80bfb.appspot.com",
    //storageBucket: "team-sync-80bfb.firebasestorage.app",
    messagingSenderId: "247475288681",
    appId: "1:247475288681:web:a0ca1753abe868553f00f8",
    measurementId: "G-GCWGDGHZB8"
};

//const firebaseApp = initializeApp(firebaseConfig);
const firebaseApp =!getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { firebaseApp, db, storage };
