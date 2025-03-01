"use client";

import "./calendar.css";

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { useRouter } from "next/navigation";
import { firebaseApp } from "@/utils/firebaseConfig";
import { db } from '@/utils/firebaseConfig';
//import { collection, addDoc, Timestamp } from "firebase/firestore";
//import { getAuth, onAuthStateChanged } from "firebase/auth";


export default function Calendar() {
  const router = useRouter();
  //const auth = getAuth(firebaseApp);
  //const user = auth.currentUser;
  //const uid = user.uid;

  /*
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, get the UID
      const uid = user.uid;
    } else {
      // User is not signed in, display an error message
      console.error("User is not signed in.");
    }
  });
  */

  return (
    <>
      <FullCalendar
        themeSystem='standard'
        plugins={[dayGridPlugin]}
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
            left: 'dayGridDay,dayGridWeek,dayGridMonth',
            center: 'title',
            right: 'createEvent today prevYear,prev,next,nextYear'
          }}
          />
          <style jsx global>{`
          .fc .fc-toolbar-title {
            font-weight: bold;
          }
          `}</style>
    </>
  )
}