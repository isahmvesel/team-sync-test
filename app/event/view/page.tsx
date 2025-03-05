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
import RSVPView from "@/components/ui/rsvp-card";
import RSVPStatus from "@/components/ui/rsvp-status";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { db, firebaseApp } from "../../../utils/firebaseConfig";
import { doc, getDoc, DocumentData } from "firebase/firestore";
import { getAuth } from "@firebase/auth";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ViewEvent() {
  const auth = getAuth(firebaseApp);
  const uid = auth.currentUser?.uid;

  const [data, setData] = useState<DocumentData | null>(null);
  const docId = useSearchParams().get("docId");

  // workout related data
  const [workoutData, setWorkoutData] = useState<string[]>([]);
  const [workoutCount, setWorkoutCount] = useState<number>(0);
  const [workoutNameList, setWorkoutNameList] = useState<string[]>([]);
  const [workoutDict, setWorkoutDict] = useState<{ [key: string]: string }>({});

  // use effect for fetching workout data
  useEffect(() => {
    const parseWorkoutData = async () => {
      var nameList = [];
      var dict: { [key: string]: string } = {};
      for (var id in workoutData) {
        const workoutId = workoutData[id];
        const workoutDoc = doc(db, "Workouts", workoutId);
        const workoutSnap = await getDoc(workoutDoc);

        const workoutName = workoutSnap.data()?.name || "name not found";
        nameList.push(workoutName);
        dict[workoutName] = workoutId;
      }

      setWorkoutNameList(nameList);
      setWorkoutDict(dict);
    };

    parseWorkoutData();
  }, [workoutCount]);

  // use effect for fetching data
  useEffect(() => {
    const fetchDocument = async () => {
      if (!docId) {
        return "";
      }

      const docRef = doc(db, "Event", docId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const currData = docSnap.data();
        setData(currData);
        setWorkoutData(currData.workouts);
        setWorkoutCount(currData.workouts.length);
      } else {
        console.log("data can't be found.");
      }
    };

    fetchDocument();
  }, []);

  const router = useRouter();

  const toWorkout = (workoutName: string) => {
    const workoutId = workoutDict[workoutName];
    router.push(`/workout/modify?workoutId=${workoutId}&userId=${uid}`);
  };

  const modifyNavigation = () => {
    router.push(`/event/modify?docId=${docId}`);
  };

  const handleBack = () => {
    router.push("/calendar");
  };

  return (
    <div className="flex items-center justify-center">
      <Card className="w-full max-w-md p-6 shadow-lg bg-white rounded-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            {data?.name || "Error loading event name."}
          </CardTitle>
          <CardDescription className="text-sm font-medium text-gray-600 mb-4">
            {data?.description || ""}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {!data?.allDay && (
            <div className="mb-1">
              <Label className="text-sm font-medium">
                Start Date:{" "}
                {data?.start
                  ? data.start.toDate().toLocaleString("en-US")
                  : "Error loading date."}
              </Label>
            </div>
          )}

          {data?.allDay && (
            <div className="mb-1">
              <Label className="text-sm font-medium">
                Start Date:{" "}
                {data?.start
                  ? data.start.toDate().toLocaleDateString("en-US")
                  : "Error loading start date."}
              </Label>
            </div>
          )}

          {!data?.allDay && (
            <div className="mb-1">
              <Label className="text-sm font-medmium">
                End Date:{" "}
                {data?.end
                  ? data.end.toDate().toLocaleString("en-US")
                  : "Error loading end date."}
              </Label>
            </div>
          )}

          {data?.allDay && (
            <div className="mb-1">
              <Label className="text-sm font-medium">
                End Date:{" "}
                {data?.end
                  ? data.end.toDate().toLocaleDateString("en-US")
                  : "Error loading end date."}
              </Label>
            </div>
          )}

          <div className="mb-1">
            <Label className="text-sm font-medium">
              Location: {data?.location || "N/A"}
            </Label>
          </div>

          <div className="mb-1 mt-3">
            <Label>Your RSVP Status:</Label>
            <RSVPStatus eventId={docId}></RSVPStatus>
          </div>

          <div className="mb-1 mt-1">
            <Label>View RSVP Statuses:</Label>
            <RSVPView eventId={docId}></RSVPView>
          </div>

          {workoutCount != 0 && (
            <div>
              <Label>Workouts:</Label>
              <ScrollArea className="h-28 w-full rounded-md border shadow-md mt-2 px-2 pt-1">
                {workoutNameList.map((item, index) => (
                  <Button
                    className="m-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all"
                    key={index}
                    onClick={() => toWorkout(item)}
                  >
                    {item}
                  </Button>
                ))}
              </ScrollArea>
            </div>
          )}
        </CardContent>

        <CardFooter>
          <Button
            onClick={handleBack}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all"
          >
            Back
          </Button>
          <Button
            onClick={modifyNavigation}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all"
          >
            Modify
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
