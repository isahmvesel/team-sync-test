import { db } from "./firebaseConfig.js";
import { doc, setDoc } from "firebase/firestore";

async function setDocument(collectionName, docId, data) {
    try {
        await setDoc(doc(db, collectionName, docId), data);
        console.log("Document successfully written!");
    } catch (error) {
        console.error("Error writing document: ", error);
    }
}

export { setDocument };
