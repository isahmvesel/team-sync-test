"use client";

import { SchedulerProvider, SchedularView } from "mina-scheduler";


export default function Home() {
  return (
    <section className="flex w-full flex-col items-center justify-center gap-4 py-8 md:py-10">
      <SchedulerProvider>
        <SchedularView
          classNames={{
            buttons: {
              addEvent: "bg-red-500",
              next: "bg-blue-500",
              prev: "bg-green-500",
            },
          }}
          views={{ views: ["day", "month", "week"], mobileViews: ["day"] }}
          CustomComponents={{
            CustomEventModal: {
              CustomAddEventModal: {
                title: "Custom Add Event",
                CustomForm: MyCustomForm,
              },
            },
          }}
        />
      </SchedulerProvider>
    </section>
  );
}

import { FieldErrors, UseFormRegister } from "react-hook-form";

interface FormValues {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}

const MyCustomForm: React.FC<{ register: UseFormRegister<FormValues>; errors: FieldErrors<FormValues> }> = ({
  register,
  errors,
}) => (
  <>
    <input
      {...register("title")}
      placeholder="Custom Event Name"
      className={`input ${errors.title ? "input-error" : ""}`}
    />
    {errors.title && (
      <span className="error-message">{errors.title.message}</span>
    )}

    <textarea
      {...register("description")}
      placeholder="Custom Description"
      className="textarea"
    />

    <input
      {...register("startDate")}
      type="date"
      className={`input ${errors.startDate ? "input-error" : ""}`}
    />

    <input
      {...register("endDate")}
      type="date"
      className={`input ${errors.endDate ? "input-error" : ""}`}
    />

    <button type="submit" className="btn">
      Submit
    </button>
  </>
);

/*
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
*/