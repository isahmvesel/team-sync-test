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
import { useRouter } from "next/navigation";
import { db } from '../../../utils/firebaseConfig';
import { collection, addDoc, Timestamp } from "firebase/firestore";

/*

TODO:

have calendar route to this page (once calendar is done)

*/

export default function CreateEvent() {

    const router = useRouter();

    const [eventName, setEventName] = useState("");
    const [description, setDescription] = useState("")
    const [datetime, setDatetime] = useState("");
    const [location, setLocation] = useState("");
    const [loading, setLoading] = useState(false);

    const eventCreation = async () => {

        if (!eventName) {
            alert("Event Name field is required.");
            return;
        }

        if (!datetime) {
            alert("Date & Time field is required.");
            return;
        }

        setLoading(true);

        try {

            const docref = await addDoc(collection(db, "Event"), {
                name: eventName,
                description,
                datetime: Timestamp.fromDate(new Date(datetime)),
                location,
            });

            alert("Event successfulling created!");
            router.push(`/event/view?docId=${docref.id}`);

        } catch (error) {
            console.error("Error adding document: ", error);
            alert("Failed to create event.");
        } finally {
            setLoading(false);
        }

    }

    return (

        <div className="flex items-center justify-center">
            <Card className="w-full max-w-md p-6 shadow-lg bg-white rounded-xl">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-semibold">Create Event</CardTitle>
                </CardHeader>

                <CardContent>
                    <form>
                        <div className="mb-4">
                            <Label className="text-sm font-medium">Event Name</Label>
                            <Input placeholder="New Event Name" value={eventName} onChange={(e) => setEventName(e.target.value)} className="mt-1"></Input>
                        </div>

                        <div className="mb-4">
                            <Label className="text-sm font-medium">Event Description</Label>
                            <Textarea placeholder="New event description" value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1"></Textarea>
                        </div>

                        <div className="mb-4">
                            <Label className="text-sm font-medium">Event Date & Time</Label>
                            <Input type="datetime-local" value={datetime} onChange={(e) => setDatetime(e.target.value)} className="mt-1"></Input>
                        </div>

                        <div className="mb-4">
                            <Label className="text-sm font-medium">Event Location</Label>
                            <Input placeholder="New Event Location" value={location} onChange={(e) => setLocation(e.target.value)} className="mt-1"></Input>
                        </div>
                    </form>
                </CardContent>

                <CardFooter>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all">Cancel</Button>
                    <Button onClick={eventCreation} disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all">Create Event</Button>
                </CardFooter>
            </Card>
        </div>

    );

}
