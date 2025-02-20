"use client";

import "./event-create.css"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import { useState } from 'react';
import { db } from '../../../utils/firebaseConfig';
import { collection, addDoc } from "firebase/firestore";

/*

TODO:

style page
have calendar route to this page (once calendar is done)

*/

export default function CreateEvent() {

    const [eventName, setEventName] = useState("");
    const [description, setDescription] = useState("");
    const [datetime, setDatetime] = useState("");
    const [location, setLocation] = useState("");
    const [loading, setLoading] = useState(false);

    const eventCreation = async () => {

        if (!eventName || !datetime) {
            alert("Event Name and Date & Time fields are required.");
            return;
        }

        setLoading(true);

        try {

            const docref = await addDoc(collection(db, "Event"), {
                name: eventName,
                description,
                datetime,
                location,
            });

            alert("Event successfulling created!");

            setEventName("");
            setDescription("");
            setDatetime("");
            setLocation("");

        } catch (error) {
            console.error("Error adding document: ", error);
            alert("Failed to create event.");
        } finally {
            setLoading(false);
        }

    }

    return (

        <Card>
            <CardHeader>
                <CardTitle>Create Event</CardTitle>
            </CardHeader>

            <CardContent>
                <form>
                    <div>
                        <Label>Event Name</Label>
                        <Input placeholder="My Event" value={eventName} onChange={(e) => setEventName(e.target.value)}></Input>
                    </div>

                    <div>
                        <Label>Event Description</Label>
                        <Textarea placeholder="My event description" value={description} onChange={(e) => setDescription(e.target.value)}></Textarea>
                    </div>

                    <div>
                        <Label>Event Date & Time</Label>
                        <Input type="datetime-local" value={datetime} onChange={(e) => setDatetime(e.target.value)}></Input>
                    </div>

                    <div>
                        <Label>Event Location</Label>
                        <Input placeholder="My Event Location" value={location} onChange={(e) => setLocation(e.target.value)}></Input>
                    </div>
                </form>
            </CardContent>

            <CardFooter>
                <Button>Cancel</Button>
                <Button onClick={eventCreation} disabled={loading}>Create Event</Button>
            </CardFooter>
        </Card>

    );

}
