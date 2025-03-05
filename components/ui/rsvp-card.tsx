"use client";

import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useState, useEffect } from "react";
import { db } from "@/utils/firebaseConfig";
import { doc, getDoc, DocumentData, onSnapshot } from "firebase/firestore";

function RSVPView({ eventId }) {
  const [yesList, setYesList] = useState([]);
  const [maybeList, setMaybeList] = useState([]);
  const [noList, setNoList] = useState([]);

  useEffect(() => {

    if (!eventId) {
      return;
    }

    const docRef = doc(db, "Event", eventId);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();

        setYesList(data?.RSVP_yes);
        setMaybeList(data?.RSVP_maybe);
        setNoList(data?.RSVP_no);
      } else {
        console.log("error getting rsvp statuses");
      }
    });

    return () => unsubscribe();
  }, ["Event", eventId])

  useEffect(() => {
    const fetchDocument = async () => {
      if (!eventId) {
        return "";
      }

      const docRef = doc(db, "Event", eventId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();

        setYesList(data?.RSVP_yes);
        setMaybeList(data?.RSVP_maybe);
        setNoList(data?.RSVP_no);
      } else {
        console.log("data can't be found.");
      }
    };

    fetchDocument();
  }, []);

  return (
    <Tabs defaultValue="yes" className="p-3 pt-2">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="yes">Yes</TabsTrigger>
        <TabsTrigger value="maybe">Maybe</TabsTrigger>
        <TabsTrigger value="no">No</TabsTrigger>
      </TabsList>

      <TabsContent value="yes">
        <ScrollArea className="h-28 w-full rounded-md border shadow-md mt-2 px-2 py-1">
          <div className="grid">
            {yesList.map((item, index) => (
              <Label key={index} className="text-md px-2">{item}</Label>
            ))}
          </div>
        </ScrollArea>
      </TabsContent>

      <TabsContent value="maybe">
        <ScrollArea className="h-28 w-full rounded-md border shadow-md mt-2 px-2 py-1">
          <div className="grid">
            {maybeList.map((item, index) => (
              <Label key={index} className="text-md px-2">{item}</Label>
            ))}
          </div>
        </ScrollArea>
      </TabsContent>

      <TabsContent value="no">
        <ScrollArea className="h-28 w-full rounded-md border shadow-md mt-2 px-2 py-1">
          <div className="grid">
            {noList.map((item, index) => (
              <Label key={index} className="text-md px-2">{item}</Label>
            ))}
          </div>
        </ScrollArea>
      </TabsContent>
    </Tabs>
  );
}

export default RSVPView;
