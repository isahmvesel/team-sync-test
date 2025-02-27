"use client";

import "./event-modify.css";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { useState, useEffect, SetStateAction } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { db } from "../../../utils/firebaseConfig";
import {
  collection,
  addDoc,
  Timestamp,
  DocumentData,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

/*

TODO:

fix date time situation

*/

export default function ModifyEvent() {
  const router = useRouter();
  const docId = useSearchParams().get("docId");

  // fetch data on load
  const [data, setData] = useState<DocumentData | null>(null);
  const [updatedData, setUpdatedData] = useState({
    name: "",
    description: "",
    datetime: "",
    location: "",
  });
  const [loading, setLoading] = useState(true);

  // format datetime variable for displaying
  const formatDatetime = (timestamp: Timestamp) => {
    if (!timestamp) {
      return "";
    }

    const date = timestamp.toDate();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const mins = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${mins}`;
  };

  useEffect(() => {
    if (!docId) {
      return;
    }

    const fetchEvent = async () => {
      try {
        const docRef = doc(db, "Event", docId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const fetchedData = docSnap.data();
          setData(fetchedData);
          setUpdatedData((prevData) => ({
            name: prevData.name || fetchedData.name || "",
            description: prevData.description || fetchedData.description || "",
            datetime:
              prevData.datetime || formatDatetime(fetchedData.datetime) || "",
            location: prevData.location || fetchedData.location || "",
          }));
        } else {
          console.error("Event not found.");
        }
      } catch (error) {
        console.error("Error fetching event data.", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [docId]);

  if (loading) {
    return <p>Loading ...</p>;
  }
  if (!data) {
    return <p>Error: Event not found.</p>;
  }

  // change updatedData variable on input field change
  const handleDataChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // handle navigation when buttons are pressed

  const handleBack = () => {
    router.push(`/event/view?docId=${docId}`);
  };

  const handleSave = async () => {
    if (!docId) {
      console.error("No docId found.");
      return;
    }

    try {
      const docRef = doc(db, "Event", docId);

      if (updatedData.name == "") {
        alert("Event Name field is required.");
        return;
      }

      if (updatedData.datetime == "") {
        alert("Date & Time field is required.");
        return;
      }

      await updateDoc(docRef, {
        name: updatedData.name,
        description: updatedData.description,
        datetime: Timestamp.fromDate(new Date(updatedData.datetime)),
        location: updatedData.location,
      });

      alert("Event successfully updated.");
      router.push(`/event/view?docId=${docId}`);
    } catch (error) {
      console.error("Error updating event", error);
      alert("There was an error updating the event.");
    }
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
              <Input
                name="name"
                value={updatedData.name}
                onChange={handleDataChange}
                className="mt-1"
              ></Input>
            </div>

            <div className="mb-4">
              <Label className="text-sm font-medium">Event Description</Label>
              <Textarea
                name="description"
                value={updatedData.description}
                onChange={handleDataChange}
                className="mt-1"
              ></Textarea>
            </div>

            <div className="mb-4">
              <Label className="text-sm font-medium">Event Date & Time</Label>
              <Input
                name="datetime"
                type="datetime-local"
                value={updatedData.datetime}
                onChange={handleDataChange}
                className="mt-1"
              ></Input>
            </div>

            <div className="mb-4">
              <Label className="text-sm font-medium">Event Location</Label>
              <Input
                name="location"
                value={updatedData.location}
                onChange={handleDataChange}
                className="mt-1"
              ></Input>
            </div>
          </form>
        </CardContent>

        <CardFooter>
          <Button
            onClick={handleBack}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all"
          >
            Back
          </Button>
          <Button
            onClick={handleSave}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all"
          >
            Save
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
