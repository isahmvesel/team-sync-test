"use client";

import { SchedulerProvider, SchedularView } from "mina-scheduler";

export default function Calendar() {
  return (
    <section className="flex w-full flex-col items-center justify-center gap-4 py-8 md:py-10">
      <SchedulerProvider>
        <SchedularView />
      </SchedulerProvider>
    </section>
  );
}