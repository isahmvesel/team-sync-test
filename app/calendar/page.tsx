"use client";

import "./calendar.css";

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useRouter } from "next/navigation";
import { firebaseApp } from "@/utils/firebaseConfig";
import { db } from '@/utils/firebaseConfig';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { time } from "console";

export default function Calendar() {
  const router = useRouter();
  const auth = getAuth(firebaseApp);

  onAuthStateChanged(auth, async (user) => {
    //! TODO: fix if statement
    if (1) {//user) {

      // User is signed in, get the UID
      const user = auth.currentUser;

      //! TODO: remove hard coded UID (for testing)
      const uid = "mxO6ABVshPM5HGrbmnA1PGpeGAI2"; //user ? user.uid : null;

      if (uid) {
        const userDocRef = doc(db, "Users", uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();

          // Get the events for the user
          for (let i = 0; i < userData.events.length; i++) {
            const event = userData.events[i];
            const eventDoc = await getDoc(event);
            const eventData = eventDoc.data();

            console.log("Event data:", eventData.timestamp);
          }

        }
        else { console.log("No such document!"); }
      } else { console.error("Invalid UID."); }
    } else { console.error("User is not signed in."); }
  });
  return (
    <>
      <FullCalendar
        themeSystem='standard'
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        customButtons={{
          createEvent: {
            text: 'Create Event',
            click: () => {
              router.push('/event/create');
            },
            },
          }}
          headerToolbar={{
            left: 'timeGridDay,timeGridWeek,dayGridMonth',
            center: 'title',
            right: 'createEvent today prevYear,prev,next,nextYear'
          }}

          //! Event Testing
          events={[
            {
              title: 'Event 1',
              startTime: '11:00:00',
              endTime: '11:30:00',
              startRecur: '2025-03-01',
              endRecur: '2025-03-02',
            },
            {
              title: 'Event 2',
              startTime: '12:00:00',
              endTime: '1:30:00',
              startRecur: '2025-03-01',
              endRecur: '2025-03-02',
            },
          ]}
      />
      <style jsx global>{`
        .fc .fc-toolbar-title {
        font-weight: bold;
        }
      `}</style>
    </>
  )
}