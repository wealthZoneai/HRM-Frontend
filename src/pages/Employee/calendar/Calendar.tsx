import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import type { CalendarEvent } from "./eventTypes";
import { fetchCalendarEvents, selectAllCalendarEvents } from "../../../store/slice/calendarSlice";
import {type AppDispatch } from "../../../store";

export default function Calendar() {
  const dispatch = useDispatch<AppDispatch>();
  const allEvents = useSelector(selectAllCalendarEvents);

  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    dispatch(fetchCalendarEvents({ year, month: month + 1 }));
  }, [dispatch, month, year]);

  useEffect(() => {
    // Map generic Redux events to local CalendarEvent type
    const mapped: CalendarEvent[] = allEvents.map(e => ({
      id: e.id,
      date: e.date,
      title: e.title,
      type: e.type as any
    }));
    setEvents(mapped);
  }, [allEvents]);

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