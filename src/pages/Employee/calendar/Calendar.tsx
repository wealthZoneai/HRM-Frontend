import { useState } from "react";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import type { CalendarEvent } from "./eventTypes";

export default function Calendar() {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  // --- ADDED: Handlers for dropdowns ---
  const handleMonthChange = (m: number) => {
    setMonth(m);
  };

  const handleYearChange = (y: number) => {
    setYear(y);
  };
  // -------------------------------------

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
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-100">
      <CalendarHeader
        month={month}
        year={year}
        onNextMonth={handleNextMonth}
        onPrevMonth={handlePrevMonth}
        onSetToday={handleSetToday}
        // --- ADDED: Pass handlers to header ---
        onMonthChange={handleMonthChange}
        onYearChange={handleYearChange}
        // ---------------------------------------
      />

      <CalendarGrid month={month} year={year} events={events} />
    </div>
  );
}