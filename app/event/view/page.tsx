"use client";

import "./event-view.css";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import { useState, useEffect } from 'react';
import { db } from "../../../utils/firebaseConfig";
import { doc, getDoc, DocumentData } from "firebase/firestore";

/*

TODO:

figure out how to pass specific event to the page
connect back button to wherever

*/

export default function ViewEvent() {

  const [data, setData] = useState<DocumentData | null>(null);
  const docId = "JPl1zo2uBRy0BNJZCybm";

  useEffect(() => {

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

  }, []);

  return (

    <div className="flex items-center justify-center">
      <Card className="w-full max-w-md p-6 shadow-lg bg-white rounded-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">{data?.name || "Error loading event name."}</CardTitle>
          <CardDescription className="text-sm font-medium text-gray-600 mb-4">{data?.description || ""}</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="mb-4">
            <Label className="text-sm font-medium">Date & Time: {data?.datetime.toDate().toLocaleString("en-US") || "Error loading date."}</Label>
          </div>

          <div className="mb-4">
            <Label className="text-sm font-medium">Location: {data?.location || "N/A"}</Label>
          </div>
        </CardContent>

        <CardFooter>
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all">Back</Button>
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all">Modify</Button>
          </CardFooter>
      </Card>
    </div>

  );
}
