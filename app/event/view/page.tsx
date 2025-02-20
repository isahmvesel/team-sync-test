"use client";

import "./event-view.css";

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"

import { db } from '../../../utils/firebaseConfig';
import { doc, getDoc } from "firebase/firestore";

/*

TODO:

style page
figure out how to pass specific event to the page
connect back button to wherever

*/

export default function ViewEvent() {

    const getEventData = async (docId) => {

        try {

            const docRef = doc(db, "Event", docId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return docSnap.data();
            } else {
                console.log("data doesn't exist");
                return null;
            }

        } catch (error) {
            console.error("Error fetching document: ", error);
        }

    };

    const docId = "TPnTQ4mNzBUombOjgcXx";
    const data = getEventData(docId);

    return (

        <Card>
            <CardHeader>
                <CardTitle>Name Placeholder</CardTitle>
                <CardDescription>Description placeholder</CardDescription>
            </CardHeader>

            <CardContent>
                <div className="event-info-div">
                    <Label>Time placeholder</Label>
                    <Label>Location placeholder</Label>
                </div>
            </CardContent>
        </Card>

    );

}
