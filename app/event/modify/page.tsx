"use client";

import "./event-modify.css"

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

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from "next/navigation";
import { db } from '../../../utils/firebaseConfig';
import { collection, 
    addDoc, 
    Timestamp, 
    DocumentData,
    doc,
    getDoc,
    setDoc,
} from "firebase/firestore";

/*

TODO:

fix date time situation

*/


export default function ModifyEvent() {

    const router = useRouter();
    const docId = useSearchParams().get("docId");

    const [data, setData] = useState<DocumentData | null>(null);

    const [eventName, setEventName] = useState("");
    const [nameChange, setNameChange] = useState(false);
    const [description, setDescription] = useState("");
    const [descriptionChange, setDescriptionChange] = useState(false);
    const [datetime, setDatetime] = useState("");
    const [datetimeChange, setDatetimeChange] = useState(false);
    const [location, setLocation] = useState("");
    const [locationChange, setLocationChange] = useState(false);

    // parses data from the firestore when docId is read
    useEffect(() => {

        if (!docId) {
            return;
        }

        const fetchDocument = async () => {
          const docRef = doc(db, "Event", docId);
          const docSnap = await getDoc(docRef);
    
          if (docSnap.exists()) {
            setData(docSnap.data());
          } else {
            console.log("data can't be found.");
          }
    
        };
    
        fetchDocument();
    
      }, [docId]);

    
    // formats the date time to be displayed
    const formatDatetime = (timestamp : Timestamp | null) => {
        if (!timestamp) {
            return "";
        }

        const date = timestamp.toDate();
        
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const mins = String(date.getMinutes()).padStart(2, "0");

        const dateString = `${year}-${month}-${day}T${hours}:${mins}`;
        return dateString;
    };



    // handles the changing of the input fields

    const handleName = (event) => {
        if (event.target.value != "") {
            setEventName(event.target.value);
            setNameChange(true);
        } else {
            setNameChange(false);
        }
    }

    const handleDescription = (event) => {
        setDescription(event.target.value);
        setDescriptionChange(true);
    }

    const handleDatetime = (event) => {
        setDatetime(event.target.value);
        setDatetimeChange(true);
    }

    const handleLocation = (event) => {
        setLocation(event.target.value);
        setLocationChange(true);
    }


    // handles the navigation buttons

    const handleCancel = () => {
        router.push(`/event/view?docId=${docId}`);
    };

    const handleSave = () => {
        if (docId) {
            setDoc(doc(db, "Event", docId), {
                name: nameChange ? eventName : data?.name,
                description: descriptionChange ? description : data?.description,
                datetime: datetimeChange ? Timestamp.fromDate(new Date(datetime)) : data?.datetime,
                location: locationChange ? location : data?.location
            });
        }

        router.push(`/event/view?docId=${docId}`);
    };

    return (

        <div className="flex items-center justify-center">
            <Card className="w-full max-w-md p-6 shadow-lg bg-white rounded-xl">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-semibold">
                        Modify Event
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <form>
                        <div className="mb-4">
                            <Label className="text-sm font-medium">Event Name</Label>
                            <Input placeholder={data?.name} className="mt-1" onChange={handleName}></Input>
                        </div>

                        <div className="mb-4">
                            <Label className="text-sm font-medium">Event Description</Label>
                            <Textarea placeholder={data?.description || "No event description."} className="mt-1" onChange={handleDescription}></Textarea>
                        </div>

                        <div className="mb-4">
                            <Label className="text-sm font-medium">Event Date & Time</Label>
                            <Input type="datetime-local" value={formatDatetime(data?.datetime)} className="mt-1"></Input>
                        </div>

                        <div className="mb-4">
                            <Label className="text-sm font-medium">Event Location</Label>
                            <Input placeholder={data?.location || "No event location"} className="mt-1" onChange={handleLocation}></Input>
                        </div>
                    </form>
                </CardContent>

                <CardFooter>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all" onClick={handleCancel}>Cancel</Button>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all" onClick={handleSave}>Save</Button>
                </CardFooter>
            </Card>
        </div>

    );

}
