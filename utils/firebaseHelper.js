import { db } from "./firebaseConfig.js";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const auth = getAuth();

async function setDocument(collectionName, docId, data) {
    try {
        // const user = auth.currentUser;
        // if (!user) {
        //     throw new Error("User not authenticated. Cannot write document.");
        // }

        await setDoc(doc(db, collectionName, docId), data);
        console.log("Document successfully written!");
    } catch (error) {
        console.error("Error writing document: ", error);
    }
}

async function viewDocument(collectionName, docId) {
    try {
        const user = auth.currentUser;
        if (!user) {
            throw new Error("User not authenticated. Cannot fetch document.");
        }

        const documentRef = doc(db, collectionName, docId);
        const documentSnapshot = await getDoc(documentRef);
        if (documentSnapshot.exists()) {
            return documentSnapshot.data();
        } else {
            console.log("No such document!");
            return null;
        }
    } catch (error) {
        console.error("Error fetching document: ", error);
        return null;
    }
}

export { setDocument, viewDocument };
