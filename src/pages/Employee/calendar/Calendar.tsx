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
    // January
    { id: "jan-1", date: "2026-01-01", title: "New Year’s Day", type: "holiday" },
    { id: "jan-14", date: "2026-01-14", title: "Makar Sankranti / Pongal", type: "holiday" },
    { id: "jan-19", date: "2026-01-19", title: "Martin Luther King Jr. Day", type: "holiday" },
    { id: "jan-26", date: "2026-01-26", title: "Republic Day (India)", type: "holiday" },

    // February
    { id: "feb-14", date: "2026-02-14", title: "Valentine's Day", type: "holiday" },
    { id: "feb-15", date: "2026-02-15", title: "Maha Shivaratri", type: "holiday" },
    { id: "feb-16", date: "2026-02-16", title: "Presidents' Day", type: "holiday" },

    // March
    { id: "mar-4", date: "2026-03-04", title: "Holi", type: "holiday" },
    { id: "mar-8", date: "2026-03-08", title: "International Women's Day", type: "holiday" },
    { id: "mar-17", date: "2026-03-17", title: "St. Patrick's Day", type: "holiday" },
    { id: "mar-20", date: "2026-03-20", title: "Eid al-Fitr (Tentative)", type: "holiday" },
    { id: "mar-27", date: "2026-03-27", title: "Ram Navami", type: "holiday" },
    { id: "mar-31", date: "2026-03-31", title: "Mahavir Jayanti", type: "holiday" },

    // April
    { id: "apr-3", date: "2026-04-03", title: "Good Friday", type: "holiday" },
    { id: "apr-5", date: "2026-04-05", title: "Easter Sunday", type: "holiday" },
    { id: "apr-6", date: "2026-04-06", title: "Easter Monday", type: "holiday" },
    { id: "apr-14", date: "2026-04-14", title: "Ambedkar Jayanti", type: "holiday" },

    // May
    { id: "may-1", date: "2026-05-01", title: "Labor Day / Maharashtra Day", type: "holiday" },
    { id: "may-10", date: "2026-05-10", title: "Mother's Day", type: "holiday" },
    { id: "may-25", date: "2026-05-25", title: "Memorial Day", type: "holiday" },
    { id: "may-27", date: "2026-05-27", title: "Eid al-Adha (Tentative)", type: "holiday" },

    // June
    { id: "jun-21", date: "2026-06-21", title: "Father's Day", type: "holiday" },

    // July
    { id: "jul-4", date: "2026-07-04", title: "Independence Day (USA)", type: "holiday" },
    { id: "jul-17", date: "2026-07-17", title: "Muharram (Tentative)", type: "holiday" },

    // August
    { id: "aug-15", date: "2026-08-15", title: "Independence Day (India)", type: "holiday" },
    { id: "aug-28", date: "2026-08-28", title: "Raksha Bandhan", type: "holiday" },

    // September
    { id: "sep-4", date: "2026-09-04", title: "Janmashtami", type: "holiday" },
    { id: "sep-7", date: "2026-09-07", title: "Labor Day (USA)", type: "holiday" },
    { id: "sep-14", date: "2026-09-14", title: "Ganesh Chaturthi", type: "holiday" },

    // October
    { id: "oct-2", date: "2026-10-02", title: "Gandhi Jayanti", type: "holiday" },
    { id: "oct-12", date: "2026-10-12", title: "Columbus Day", type: "holiday" },
    { id: "oct-20", date: "2026-10-20", title: "Dussehra / Vijayadashami", type: "holiday" },
    { id: "oct-31", date: "2026-10-31", title: "Halloween", type: "holiday" },

    // November
    { id: "nov-1", date: "2026-11-01", title: "All Saints' Day", type: "holiday" },
    { id: "nov-8", date: "2026-11-08", title: "Diwali", type: "holiday" },
    { id: "nov-11", date: "2026-11-11", title: "Veterans Day", type: "holiday" },
    { id: "nov-26", date: "2026-11-26", title: "Thanksgiving Day", type: "holiday" },

    // December
    { id: "dec-24", date: "2026-12-24", title: "Christmas Eve", type: "holiday" },
    { id: "dec-25", date: "2026-12-25", title: "Christmas Day", type: "holiday" },
    { id: "dec-26", date: "2026-12-26", title: "Boxing Day", type: "holiday" },
    { id: "dec-31", date: "2026-12-31", title: "New Year's Eve", type: "holiday" },

    // Sample Work Events
    { id: "work-1", date: "2026-01-03", title: "Client Meeting", type: "meeting" },
    { id: "work-2", date: "2026-01-16", title: "Team Sync", type: "meeting" },
    { id: "work-3", date: "2026-01-20", title: "Employee Birthday", type: "birthday" },
    { id: "work-4", date: "2026-01-22", title: "Frontend Training", type: "training" },
    { id: "work-5", date: "2026-01-25", title: "Interview Round", type: "interview" },
    {
      id: "today",
      date: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`,
      title: "Today's Meeting",
      type: "meeting",
    },
    { id: "dec-25-2024", date: "2024-12-25", title: "Christmas Day", type: "holiday" },
    { id: "dec-25-2025", date: "2025-12-25", title: "Christmas Day", type: "holiday" },
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
    <div className="max-w-6xl mx-auto p-2 sm:p-4 space-y-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl md:text-md  font-bold text-gray-900 tracking-tight">
          Calendar
        </h2>
        <p className="text-sm text-gray-500">
          Manage your schedule and view upcoming events
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-3 sm:p-4 border-b border-gray-100">
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

        <div className="p-2 sm:p-4 bg-gray-50/30">
          <CalendarGrid month={month} year={year} events={events} />
        </div>
      </div>
    </div>
  );
}