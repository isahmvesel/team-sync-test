"use client";

import "./calendar.css";

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useRouter } from "next/navigation";
// import NavBar from "@/components/ui/navigation-bar";
import { firebaseApp } from "@/utils/firebaseConfig";
import { db } from '@/utils/firebaseConfig';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";

interface EventData {
  name: string;
  allDay: boolean;
  datetime: {
    seconds: number;
  };
  end: {
    seconds: number;
  };
  description: string;
  location: string;
}

interface CalendarEvent {
  title: string;
  start: number;
  end: number | undefined;
  allDay: boolean;
  description: string;
  location: string;
}

export default function Calendar() {
  const router = useRouter();
  const auth = getAuth(firebaseApp);
  
  const [eventList, setEventList] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async () => {
      //! TODO: Fix if statement
      if (1) { // user) {

        //! TODO: Fix hardcoded UID (For Testing)
        const uid = 'mxO6ABVshPM5HGrbmnA1PGpeGAI2'; // user.uid;

        if (uid) {
          const userDocRef = doc(db, "Users", uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            if (Array.isArray(userData.events)) {
              const newEventList = [];

              // Get the events for the user
              for (let i = 0; i < userData.events.length; i++) {
                const event = userData.events[i];
                const eventDoc = await getDoc(event);
                const eventData = eventDoc.data() as EventData;

                newEventList.push({
                  title: eventData.name,
                  allDay: eventData.allDay,
                  start: eventData.datetime.seconds * 1000,
                  end: eventData.allDay || eventData.end == undefined ? undefined : eventData.end.seconds * 1000,
                  description: eventData.description,
                  location: eventData.location,
                });
              }
              console.log(newEventList);
              setEventList(newEventList);
            }
          } else {
            console.log("No such document!");
          }
        } else {
          console.error("Invalid UID.");
        }
      } else {
        console.error("User is not signed in.");
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      {/* <NavBar /> */}
      <FullCalendar
        themeSystem='standard'
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        navLinks={true}
        selectable={true}

        /* Alternate Event Colors
        eventBackgroundColor="#f2f2f2"
        eventBorderColor="#3182ce"
        eventTextColor="black"
        */

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
        events={eventList}
        eventDidMount={(info) => {
          if (info.event.extendedProps.description && info.view.type !== 'dayGridMonth') {
            const descEl = document.createElement('p');

            descEl.textContent = info.event.extendedProps.description;
            descEl.style.fontSize = '0.9em';
            descEl.style.color = 'black';
            descEl.style.whiteSpace = 'normal';
            descEl.style.overflowWrap = 'anywhere';
            descEl.style.margin = '0';
            info.el.querySelector('.fc-event-title')?.appendChild(descEl);
          }
        }}
        eventMouseEnter={(info) => {
          if (info.event.extendedProps.description && info.view.type === 'dayGridMonth') {
            const rect = info.el.getBoundingClientRect();
            const tooltipEl = document.createElement('div');
            tooltipEl.classList.add('my-event-tooltip');
            tooltipEl.innerHTML = info.event.extendedProps.description;
            tooltipEl.style.position = 'fixed';
            tooltipEl.style.fontSize = '0.8em';
            tooltipEl.style.left = `${rect.left}px`;
            tooltipEl.style.top = `${rect.bottom}px`;
            tooltipEl.style.zIndex = '9999';
            tooltipEl.style.backgroundColor = 'white';
            tooltipEl.style.border = '1px solid #ccc';
            tooltipEl.style.padding = '5px';
            tooltipEl.style.whiteSpace = 'normal';
            document.body.appendChild(tooltipEl);
            info.event.setExtendedProp('tooltipEl', tooltipEl);
          }
        }}
        eventMouseLeave={(info) => {
          const tooltipEl = info.event.extendedProps.tooltipEl;
          if (tooltipEl) {
            tooltipEl.remove();
          }
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