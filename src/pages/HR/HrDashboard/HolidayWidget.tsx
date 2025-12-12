import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

// Types
interface Holiday {
    id: string;
    name: string;
    date: string; // YYYY-MM-DD
    type: "Federal" | "Company" | "Optional";
}

const holidays: Holiday[] = [
    { id: "1", name: "New year", date: "2026-01-01", type: "Federal" },
    { id: "2", name: "Sankranti", date: "2026-01-14", type: "Optional" },
    { id: "3", name: "Republicday", date: "2026-01-26", type: "Federal" },
    { id: "4", name: "Ugadi", date: "2026-03-22", type: "Optional" },
];

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function HolidayWidget() {
    const [currentDate, setCurrentDate] = useState(new Date("2026-01-01")); // Default to Jan 2026 for demo matching image

    // Helper to get days in month
    const getDaysInMonth = (year: number, month: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (year: number, month: number) => {
        return new Date(year, month, 1).getDay();
    };

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const prevMonthDays = Array.from({ length: firstDay }, (_, i) => {
        const prevMonthDate = new Date(year, month, 0);
        return prevMonthDate.getDate() - firstDay + i + 1;
    });

    const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    // Pad the end to complete the grid (optional, but looks better)
    const totalSlots = prevMonthDays.length + currentMonthDays.length;
    const nextMonthDaysCount = 42 - totalSlots; // 6 rows * 7 cols = 42
    const nextMonthDays = Array.from(
        { length: nextMonthDaysCount > 0 ? nextMonthDaysCount : 0 },
        (_, i) => i + 1
    );

    const handlePrevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    // Check if a specific day is a holiday
    const getHolidayForDay = (day: number) => {
        // Format: YYYY-MM-DD
        const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        return holidays.find(h => h.date === dateStr);
    };

    // Format helpers
    const formatListDate = (dateStr: string) => {
        const d = new Date(dateStr);
        // "Jan 01,2026"
        const m = d.toLocaleString('en-US', { month: 'short' });
        const day = d.getDate().toString().padStart(2, '0');
        const y = d.getFullYear();
        return `${m} ${day},${y}`;
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            {/* Header */}
            <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800">Upcoming Holidays</h2>
                <p className="text-gray-500 text-xs">View all comany holidays and plan your time off</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* LEFT SIDE: List */}
                <div className="w-full lg:w-1/4 space-y-4">
                    {holidays.slice(0, 3).map((holiday) => (
                        <div
                            key={holiday.id}
                            className="bg-white border rounded-xl p-4 shadow-sm flex flex-col gap-1 relative overflow-hidden"
                        >
                            {/* Green/Status dot */}
                            <div className="flex items-center gap-2 mb-1">
                                <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span>
                                <span className="text-gray-500 font-medium text-sm">
                                    {formatListDate(holiday.date)}
                                </span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">{holiday.name}</h3>
                        </div>
                    ))}
                </div>

                {/* RIGHT SIDE: Calendar */}
                <div className="flex-1">
                    {/* Calendar Header */}
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-4">
                            <h2 className="text-xl font-bold text-gray-800">
                                {currentDate.toLocaleString("default", { month: "long" })} {year}
                            </h2>
                            <div className="flex gap-1">
                                <button onClick={handlePrevMonth} className="p-1 hover:bg-gray-100 rounded bg-gray-100">
                                    <FiChevronLeft className="w-4 h-4 text-gray-600" />
                                </button>
                                <button onClick={handleNextMonth} className="p-1 hover:bg-gray-100 rounded bg-gray-100">
                                    <FiChevronRight className="w-4 h-4 text-gray-600" />
                                </button>
                            </div>
                        </div>

                        {/* View Toggle (Visual only for now) */}
                        <div className="bg-blue-50/50 p-1 rounded-lg flex text-sm">
                            <button className="px-3 py-1 text-blue-600/60 hover:text-blue-600 font-medium">Day</button>
                            <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded shadow-sm font-medium">Month</button>
                            <button className="px-3 py-1 text-blue-600/60 hover:text-blue-600 font-medium">Year</button>
                        </div>
                    </div>

                    {/* Grid Header */}
                    <div className="grid grid-cols-7 mb-0 rounded-t-xl overflow-hidden border border-b-0 border-blue-200">
                        {WEEKDAYS.map((day) => (
                            <div key={day} className="bg-blue-100/50 py-3 text-center text-lg font-semibold text-gray-800 border-r border-blue-200 last:border-r-0">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Grid Body */}
                    <div className="grid grid-cols-7 border-l border-t border-gray-200">
                        {/* Previous Month Days (faded) */}
                        {prevMonthDays.map((d, i) => (
                            <div key={`prev-${i}`} className="h-24 border-r border-b border-gray-200 p-2 bg-gray-50/50">
                                <span className="text-gray-400 font-medium">{d}</span>
                            </div>
                        ))}

                        {/* Current Month Days */}
                        {currentMonthDays.map((d) => {
                            const holiday = getHolidayForDay(d);
                            // Check if it's weekend (roughly) - not strictly needed for this visual match but nice to have.
                            // We just render plain cells mostly.

                            // Find if this specific date is Sunday (0) or Saturday (6)
                            // We need to calculate the actual day of week for this specific date
                            const currentDayOfWeek = new Date(year, month, d).getDay();
                            const isWeekend = currentDayOfWeek === 0; // Sundays are usually red in these cals

                            return (
                                <div key={`curr-${d}`} className="h-24 border-r border-b border-gray-200 p-2 relative bg-gray-50/30 hover:bg-white transition-colors">
                                    <span className={`text-sm font-medium ${isWeekend ? 'text-red-500' : 'text-gray-700'}`}>
                                        {String(d).padStart(2, '0')}
                                    </span>

                                    {holiday && (
                                        <div className="mt-1">
                                            {/* Highlight for the day number if needed, or just a tag? 
                            The image shows the day number itself might be colored or a tag
                            Image shows: specific days have a greenish background on the number?
                            Actually, image shows "01" has a green background. "14" is Red.
                            Let's add a small badge.
                        */}
                                        </div>
                                    )}

                                    {holiday && (
                                        <div className="mt-2 text-xs font-semibold px-1 py-0.5 rounded bg-green-100 text-green-700 inline-block">
                                            {String(d).padStart(2, '0')}
                                        </div>
                                    )}

                                    {/* Special matching for image:
                       1st is Green box 01
                       14th is Red text 14
                   */}
                                </div>
                            );
                        })}

                        {/* Next Month Days (faded) */}
                        {nextMonthDays.map((d, i) => (
                            <div key={`next-${i}`} className="h-24 border-r border-b border-gray-200 p-2 bg-gray-50/50">
                                <span className="text-gray-400 font-medium">{String(d).padStart(2, '0')}</span>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </div>
    );
}
