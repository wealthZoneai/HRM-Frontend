import { useState, useEffect } from "react";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import type { CalendarEvent } from "./eventTypes";
import { getCalendarEvents } from "../../../Services/apiHelpers";

export default function Calendar() {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    fetchEvents();
  }, [month, year]);

  const fetchEvents = () => {
    // API expects month 1-12, but JS use 0-11
    getCalendarEvents(year, month + 1)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setEvents(res.data);
        } else if (res.data && Array.isArray(res.data.results)) {
          setEvents(res.data.results);
        } else {
          setEvents([]);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch calendar events", err);
        setEvents([]);
      });
  };

  const handleMonthChange = (m: number) => {
    setMonth(m);
  };

  const handleYearChange = (y: number) => {
    setYear(y);
  };

  /*
  const events: CalendarEvent[] = [
     // Static data removed
  ];
  */

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
    <div className="max-w-6xl mx-auto p-1 sm:p-2 space-y-2">
      <div className="flex flex-col gap-0.5">
        <h2 className="text-md font-bold text-gray-900 tracking-tight">
          Calendar
        </h2>
        <p className="text-[10px] text-gray-500">
          Your schedule and events
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-2 sm:p-3 border-b border-gray-100">
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

        <div className="p-1 sm:p-2 bg-gray-50/30">
          <CalendarGrid month={month} year={year} events={events} />
        </div>
      </div>
    </div>
  );
}