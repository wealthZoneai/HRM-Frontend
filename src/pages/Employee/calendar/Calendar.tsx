import { useState } from "react";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import type { CalendarEvent } from "./eventTypes";

export default function Calendar() {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const handleMonthChange = (m: number) => {
    setMonth(m);
  };

  const handleYearChange = (y: number) => {
    setYear(y);
  };

  const events: CalendarEvent[] = [
    { id: "1", date: "2026-01-01", title: "New Year’s Day", type: "holiday" },
    { id: "2", date: "2026-01-03", title: "Client Meeting", type: "meeting" },
    { id: "3", date: "2026-01-14", title: "Makar Sankranti", type: "holiday" },
    { id: "4", date: "2026-01-16", title: "Team Sync", type: "meeting" },
    { id: "5", date: "2026-01-26", title: "Republic Day", type: "holiday" },
    { id: "6", date: "2026-01-20", title: "Employee Birthday", type: "birthday" },
    { id: "7", date: "2026-01-22", title: "Frontend Training", type: "training" },
    { id: "8", date: "2026-01-25", title: "Interview Round", type: "interview" },
    {
      id: "9",
      date: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`,
      title: "Today's Meeting",
      type: "meeting",
    },
  ];

  const handleSetToday = () => {
    setMonth(today.getMonth());
    setYear(today.getFullYear());
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const handlePrevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          Calendar
        </h2>
        <p className="text-sm text-gray-500">
          Manage your schedule and view upcoming events
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-100">
          <CalendarHeader
            month={month}
            year={year}
            onNextMonth={handleNextMonth}
            onPrevMonth={handlePrevMonth}
            onSetToday={handleSetToday}
            onMonthChange={handleMonthChange}
            onYearChange={handleYearChange}
          />
        </div>

        <div className="p-4 sm:p-6 bg-gray-50/30">
          <CalendarGrid month={month} year={year} events={events} />
        </div>
      </div>
    </div>
  );
}