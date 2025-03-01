"use client";

import "./calendar.css";

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { useRouter } from "next/navigation";

export default function Calendar() {
  const router = useRouter();

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