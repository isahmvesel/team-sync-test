"use client"

import { useState } from 'react';
import { db } from '../../utils/firebaseConfig.js';
import { setDocument } from "../../utils/firebaseHelper.js";

import { collection, addDoc} from "firebase/firestore"; 


export default function Profile() {
    const [docId, setDocId] = useState('');
    const [value, setValue] = useState('');

    const handleSubmit = async (event:  React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await setDocument("items", docId, { name: value });

            console.log("Document written with ID: ", docId);
            setDocId('');
            setValue('');
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={docId}
                onChange={(e) => setDocId(e.target.value)}
                placeholder="Enter Key"
            />
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter Value"
            />
            <button type="submit">Add Item</button>
        </form>
    );
}
