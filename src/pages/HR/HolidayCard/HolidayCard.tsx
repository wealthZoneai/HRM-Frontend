import React, { useMemo, useState } from "react";
import { FiFilter } from "react-icons/fi";

// ==============================
// Types
// ==============================
interface Holiday {
  name: string;
  description: string;
  fullDate: string;
  type: "Federal" | "Company" | "Optional";
}

type HolidayStatus = "Upcoming" | "Past";

// ==============================
// Dummy Data
// ==============================
const holidayData: Holiday[] = [
  { name: "New Year's Day", description: "First day of the year", fullDate: "Jan 1, 2025", type: "Federal" },
  { name: "Republic Day", description: "India's national holiday", fullDate: "Jan 26, 2025", type: "Federal" },
  { name: "Good Friday", description: "Christian holiday", fullDate: "Apr 18, 2025", type: "Federal" },
  { name: "Diwali", description: "Festival of Lights", fullDate: "Oct 31, 2025", type: "Company" },
  { name: "Thanksgiving", description: "United States holiday", fullDate: "Nov 27, 2025", type: "Company" },
  { name: "Christmas Eve", description: "Day before Christmas", fullDate: "Dec 24, 2025", type: "Optional" },
  { name: "Christmas Day", description: "Birth of Jesus Christ", fullDate: "Dec 25, 2025", type: "Federal" },
  { name: "New Year’s Eve", description: "Year-end celebration", fullDate: "Dec 31, 2025", type: "Company" },
];

// ==============================
// Helper Functions
// ==============================
const currentDate = new Date("2025-11-14");

const getStatus = (date: string): HolidayStatus => {
  return new Date(date) < currentDate ? "Past" : "Upcoming";
};

const formatBadgeDate = (date: string) => {
  const d = new Date(date);
  return {
    month: d.toLocaleString("en-US", { month: "short" }),
    day: d.getDate(),
  };
};

// ==============================
// Holiday Card Component
// ==============================
const HolidayCard: React.FC<{ holiday: Holiday }> = ({ holiday }) => {
  const status = getStatus(holiday.fullDate);
  const { month, day } = formatBadgeDate(holiday.fullDate);

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-5 border border-gray-100">
      {/* Top Badge & Type */}
      <div className="flex justify-between items-start">
        {/* Date Badge */}
        <div className="text-center bg-linear-to-b from-blue-600 to-blue-400 text-white w-14 rounded-xl py-2 shadow">
          <div className="text-xs">{month}</div>
          <div className="text-xl font-bold leading-tight">{day}</div>
        </div>

        {/* Type Tag */}
        <span
          className={`
            text-xs px-3 py-1 rounded-full font-semibold
            ${
              holiday.type === "Federal"
                ? "bg-blue-100 text-blue-700"
                : holiday.type === "Company"
                ? "bg-purple-100 text-purple-700"
                : "bg-green-100 text-green-700"
            }
          `}
        >
          {holiday.type}
        </span>
      </div>

      {/* Title */}
      <h3 className="mt-4 text-lg font-semibold text-gray-800">{holiday.name}</h3>

      {/* Description */}
      <p className="text-gray-600 text-sm mt-1 line-clamp-2">{holiday.description}</p>

      {/* Footer */}
      <div className="mt-5 flex justify-between items-center">
        <span className="text-sm text-gray-500">{holiday.fullDate}</span>

        <span
          className={`
            px-3 py-0.5 text-xs font-bold rounded-full
            ${status === "Past" ? "bg-gray-200 text-gray-700" : "bg-green-100 text-green-700"}
          `}
        >
          {status}
        </span>
      </div>
    </div>
  );
};

// ==============================
// Main Component
// ==============================
export default function HolidaysCalendar() {
  const [filter, setFilter] = useState<HolidayStatus | "All">("All");

  const filteredData = useMemo(() => {
    if (filter === "All") return holidayData;
    return holidayData.filter((h) => getStatus(h.fullDate) === filter);
  }, [filter]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Holiday Calendar</h1>
          <p className="text-blue-600 text-sm mt-1">Plan your year ahead with clarity</p>
        </div>

       
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between bg-white p-4 rounded-lg border shadow-sm mb-6">

        {/* Tabs */}
        <div className="flex gap-3">
          {["All", "Upcoming", "Past"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab as any)}
              className={`
                px-4 py-1.5 rounded-full text-sm font-medium
                ${
                  filter === tab
                    ? "bg-blue-600 text-white shadow"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }
              `}
            >
              {tab}
            </button>
          ))}
        </div>

        <button className="flex items-center gap-2 text-gray-700 px-3 py-1.5 rounded-md border hover:bg-gray-100">
          <FiFilter size={16} /> Filters
        </button>
      </div>

      {/* Holiday Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredData.map((holiday, i) => (
          <HolidayCard key={i} holiday={holiday} />
        ))}
      </div>
    </div>
  );
}
