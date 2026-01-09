import { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { type AppDispatch } from "../../../store";
import { fetchCalendarEvents, selectAllCalendarEvents, selectCalendarLoading } from "../../../store/slice/calendarSlice";

// Types
interface Holiday {
    id: string;
    name: string;
    date: string; // YYYY-MM-DD
    type: "Federal" | "Company" | "Optional" | "Announcement" | "Meeting";
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];


export default function HolidayWidget() {
    const dispatch = useDispatch<AppDispatch>();
    const allEvents = useSelector(selectAllCalendarEvents);
    const loading = useSelector(selectCalendarLoading);
    const [currentDate, setCurrentDate] = useState(new Date("2026-01-01"));

    const [holidays, setHolidays] = useState<Holiday[]>([]);
    const [view, setView] = useState<'calendar' | 'list'>('calendar');

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Fetch holidays
    // Fetch dynamic events when month changes
    useEffect(() => {
        dispatch(fetchCalendarEvents({ year, month: month + 1 }));
    }, [dispatch, year, month]);

    // Filter events for the current view
    useEffect(() => {
        const filtered = allEvents.filter(e => {
            const d = new Date(e.date);
            return d.getMonth() === month && d.getFullYear() === year;
        }).map(e => ({
            id: e.id,
            name: e.title,
            date: e.date,
            type: e.type as any
        }));
        setHolidays(filtered);
    }, [allEvents, year, month]);

    // Helper to get days in month
    const getDaysInMonth = (year: number, month: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (year: number, month: number) => {
        return new Date(year, month, 1).getDay();
    };

    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const prevMonthDays = Array.from({ length: firstDay }, (_, i) => {
        const prevMonthDate = new Date(year, month, 0);
        return prevMonthDate.getDate() - firstDay + i + 1;
    });

    const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const totalSlots = prevMonthDays.length + currentMonthDays.length;
    const nextMonthDaysCount = 42 - totalSlots;
    const nextMonthDays = Array.from({ length: nextMonthDaysCount > 0 ? nextMonthDaysCount : 0 }, (_, i) => i + 1);

    const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
    const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

    const getEventsForDay = (day: number) => {
        const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        return holidays.filter(h => h.date === dateStr);
    };

    const formatListDate = (dateStr: string) => {
        const d = new Date(dateStr);
        const m = d.toLocaleString('en-US', { month: 'short' });
        const day = d.getDate().toString().padStart(2, '0');
        const y = d.getFullYear();
        return `${m} ${day},${y}`;
    };

    // Color helpers
    const getHolidayColor = (type: Holiday["type"]) => {
        switch (type) {
            case "Federal": return "bg-red-100 text-red-600 border-red-200";
            case "Company": return "bg-blue-100 text-blue-600 border-blue-200";
            case "Optional": return "bg-green-100 text-green-600 border-green-200";
            case "Announcement": return "bg-indigo-100 text-indigo-600 border-indigo-200";
            case "Meeting": return "bg-amber-100 text-amber-600 border-amber-200";
            default: return "bg-gray-100 text-gray-600 border-gray-200";
        }
    };

    const getHolidayDotColor = (type: Holiday["type"]) => {
        switch (type) {
            case "Federal": return "bg-red-500";
            case "Announcement": return "bg-indigo-500";
            case "Meeting": return "bg-amber-500";
            default: return "bg-blue-400"; // Optional / Company
        }
    };

    return (
        <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
            {/* Header & Controls */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-2 gap-2">
                <div>
                    <h2 className="text-lg font-bold text-gray-800">
                        {currentDate.toLocaleString("default", { month: "long" })} {year}
                    </h2>
                    <p className="text-gray-500 text-[10px]">Manage your holidays</p>
                </div>

                <div className="flex items-center gap-3">
                    {/* Month Nav */}
                    <div className="flex gap-1 bg-gray-50 p-0.5 rounded-lg">
                        <button onClick={handlePrevMonth} className="p-1 hover:bg-gray-200 rounded-md transition-colors">
                            <FiChevronLeft className="w-4 h-4 text-gray-600" />
                        </button>
                        <button onClick={handleNextMonth} className="p-1 hover:bg-gray-200 rounded-md transition-colors">
                            <FiChevronRight className="w-4 h-4 text-gray-600" />
                        </button>
                    </div>

                    {/* View Toggle */}
                    <div className="flex bg-gray-100 p-0.5 rounded-lg text-xs">
                        <button
                            onClick={() => setView('calendar')}
                            className={`px-2 py-1 rounded-md font-medium transition-all ${view === 'calendar' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Calendar
                        </button>
                        <button
                            onClick={() => setView('list')}
                            className={`px-2 py-1 rounded-md font-medium transition-all ${view === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            List
                        </button>
                    </div>
                </div>
            </div>

            {/* Content Body */}
            <div>
                {view === 'list' && (
                    <div className="w-full">
                        {loading && <p className="text-sm text-gray-400">Loading holidays...</p>}
                        {!loading && holidays.length === 0 && (
                            <div className="text-center py-10 bg-gray-50 rounded-xl">
                                <p className="text-gray-400">No holidays found for this month.</p>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {holidays.map((holiday) => (
                                <div
                                    key={holiday.id}
                                    className="bg-white border rounded-xl p-4 shadow-sm flex flex-col gap-2 hover:shadow-md transition-shadow"
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-2">
                                            <span className={`w-2 h-2 rounded-full ${getHolidayDotColor(holiday.type)}`}></span>
                                            <span className="text-gray-500 font-medium text-sm">
                                                {formatListDate(holiday.date)}
                                            </span>
                                        </div>
                                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${getHolidayColor(holiday.type)}`}>
                                            {holiday.type === 'Federal' ? 'Main' : 'Optional'}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 truncate" title={holiday.name}>{holiday.name}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {view === 'calendar' && (
                    <div className="w-full">
                        {/* Grid Header */}
                        <div className="grid grid-cols-7 mb-0 rounded-t-xl overflow-hidden border border-b-0 border-blue-200">
                            {WEEKDAYS.map((day) => (
                                <div key={day} className="bg-blue-100/50 py-2 text-center text-sm font-semibold text-gray-800 border-r border-blue-200 last:border-r-0">
                                    {day}
                                </div>
                            ))}
                        </div>

                        {/* Grid Body */}
                        <div className="grid grid-cols-7 border-l border-t border-gray-200">
                            {prevMonthDays.map((d, i) => (
                                <div key={`prev-${i}`} className="min-h-[6rem] border-r border-b border-gray-200 p-1 bg-gray-50/50">
                                    <span className="text-gray-400 text-xs font-medium">{d}</span>
                                </div>
                            ))}

                            {currentMonthDays.map((d) => {
                                const dayEvents = getEventsForDay(d);
                                const currentDayOfWeek = new Date(year, month, d).getDay();
                                const isWeekend = currentDayOfWeek === 0;

                                return (
                                    <div key={`curr-${d}`} className="min-h-[6rem] border-r border-b border-gray-200 p-1 relative bg-gray-50/30 hover:bg-white transition-colors group flex flex-col gap-1">
                                        <span className={`text-xs font-medium ${isWeekend ? 'text-red-500' : 'text-gray-700'}`}>
                                            {String(d).padStart(2, '0')}
                                        </span>

                                        {dayEvents.slice(0, 3).map((ev) => (
                                            <div
                                                key={ev.id}
                                                className={`text-[9px] font-medium px-1 py-0.5 rounded border block truncate text-left cursor-pointer ${getHolidayColor(ev.type)}`}
                                                title={ev.name}
                                            >
                                                {ev.name}
                                            </div>
                                        ))}

                                        {dayEvents.length > 3 && (
                                            <span className="text-[9px] text-gray-400 pl-1">+{dayEvents.length - 3} more</span>
                                        )}
                                    </div>
                                );
                            })}

                            {nextMonthDays.map((d, i) => (
                                <div key={`next-${i}`} className="min-h-[6rem] border-r border-b border-gray-200 p-1 bg-gray-50/50">
                                    <span className="text-gray-400 text-xs font-medium">{String(d).padStart(2, '0')}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
