import { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
// import { getCalendarEvents } from "../../../Services/apiHelpers";

// Types
// Types
interface Holiday {
    id: string;
    name: string;
    date: string; // YYYY-MM-DD
    type: "Federal" | "Company" | "Optional";
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// 2026 Holidays
const STATIC_HOLIDAYS: Holiday[] = [
    // January
    { id: "h1", name: "New Year’s Day", date: "2026-01-01", type: "Optional" },
    { id: "h2", name: "Lohri / Bhogi", date: "2026-01-13", type: "Optional" },
    { id: "h3", name: "Makar Sankranti / Pongal", date: "2026-01-14", type: "Optional" },
    { id: "h4", name: "Makara Sankranti", date: "2026-01-15", type: "Optional" },
    { id: "h5", name: "Kanuma", date: "2026-01-16", type: "Optional" },
    { id: "h6", name: "Vasant Panchami", date: "2026-01-23", type: "Optional" },
    { id: "h7", name: "Republic Day", date: "2026-01-26", type: "Federal" }, // National

    // February
    { id: "h8", name: "Maha Shivaratri", date: "2026-02-15", type: "Optional" },

    // March
    { id: "h9", name: "Holika Dahan / Holi", date: "2026-03-03", type: "Optional" }, // Date range 3-4, picked 3
    { id: "h10", name: "Holi", date: "2026-03-04", type: "Optional" },
    { id: "h11", name: "Ugadi / Gudi Padwa", date: "2026-03-19", type: "Optional" },
    { id: "h12", name: "Eid-ul-Fitr", date: "2026-03-20", type: "Optional" }, // Moon based 20-21
    { id: "h13", name: "Ram Navami", date: "2026-03-26", type: "Optional" }, // 26-27
    { id: "h14", name: "Mahavir Jayanti", date: "2026-03-31", type: "Optional" },

    // April
    { id: "h15", name: "Good Friday", date: "2026-04-03", type: "Optional" },
    { id: "h16", name: "Akshaya Tritiya", date: "2026-04-19", type: "Optional" },

    // May
    { id: "h17", name: "Labour Day", date: "2026-05-01", type: "Federal" }, // Often a holiday
    { id: "h18", name: "Eid ul-Adha / Bakrid", date: "2026-05-27", type: "Optional" },

    // June
    { id: "h19", name: "Jyeshtha Purnima", date: "2026-06-16", type: "Optional" },

    // July
    { id: "h20", name: "Rath Yatra", date: "2026-07-16", type: "Optional" },

    // August
    { id: "h21", name: "Independence Day", date: "2026-08-15", type: "Federal" }, // National
    { id: "h22", name: "Onam", date: "2026-08-25", type: "Optional" },
    { id: "h23", name: "Raksha Bandhan", date: "2026-08-28", type: "Optional" },

    // September
    { id: "h24", name: "Janmashtami", date: "2026-09-04", type: "Optional" },
    { id: "h25", name: "Ganesh Chaturthi", date: "2026-09-15", type: "Optional" },
    { id: "h26", name: "Vishwakarma Puja", date: "2026-09-17", type: "Optional" },
    // Note: Late Sep festivals without exact dates in prompt (Bathukamma) omitted or need exact date.
    // Assuming prompt wanted the list provided. I will stick to specific dates found or provided.

    // October
    { id: "h27", name: "Gandhi Jayanti", date: "2026-10-02", type: "Federal" }, // National
    { id: "h28", name: "Navratri Start", date: "2026-10-11", type: "Optional" },
    { id: "h29", name: "Dussehra", date: "2026-10-20", type: "Optional" },
    { id: "h30", name: "Karwa Chauth", date: "2026-10-29", type: "Optional" },

    // November
    { id: "h31", name: "Dhanteras", date: "2026-11-06", type: "Optional" },
    { id: "h32", name: "Diwali", date: "2026-11-08", type: "Federal" }, // Major festival
    { id: "h33", name: "Govardhan Puja", date: "2026-11-10", type: "Optional" },
    { id: "h34", name: "Bhai Dooj", date: "2026-11-11", type: "Optional" },
    { id: "h35", name: "Chhath Puja", date: "2026-11-15", type: "Optional" },
    { id: "h36", name: "Guru Nanak Jayanti", date: "2026-11-24", type: "Optional" },

    // December
    { id: "h37", name: "Christmas Day", date: "2026-12-25", type: "Federal" }, // Major
];

export default function HolidayWidget() {
    const [currentDate, setCurrentDate] = useState(new Date("2026-01-01"));
    const [holidays, setHolidays] = useState<Holiday[]>([]);
    const [loading,] = useState(false);
    const [view, setView] = useState<'calendar' | 'list'>('calendar');

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Fetch holidays
    useEffect(() => {
        // For now, we are using the static list primarily as requested by the user to "fix" the list.
        // We will simulate fetching by just setting the static list filtered by month.
        // If the user wants to mix API, we can, but the request was specific about THIS list.
        // Let's filter the STATIC_HOLIDAYS for the current view.
        // Actually, let's just set all of them or filter? Usually widgets show month view.

        const monthHolidays = STATIC_HOLIDAYS.filter(h => {
            const d = new Date(h.date);
            return d.getMonth() === month && d.getFullYear() === year;
        });
        setHolidays(monthHolidays);

    }, [year, month]);

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

    const getHolidayForDay = (day: number) => {
        const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        return holidays.find(h => h.date === dateStr);
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
        // Federal = Main -> Green
        // Optional = Remaining -> Blue/Purple
        return type === "Federal" ? "bg-green-100 text-green-700 border-green-200" : "bg-blue-50 text-blue-700 border-blue-200";
    };

    const getHolidayDotColor = (type: Holiday["type"]) => {
        return type === "Federal" ? "bg-green-500" : "bg-blue-400";
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
                                <div key={`prev-${i}`} className="h-16 border-r border-b border-gray-200 p-1 bg-gray-50/50">
                                    <span className="text-gray-400 text-xs font-medium">{d}</span>
                                </div>
                            ))}

                            {currentMonthDays.map((d) => {
                                const holiday = getHolidayForDay(d);
                                const currentDayOfWeek = new Date(year, month, d).getDay();
                                const isWeekend = currentDayOfWeek === 0;

                                return (
                                    <div key={`curr-${d}`} className="h-16 border-r border-b border-gray-200 p-1 relative bg-gray-50/30 hover:bg-white transition-colors group">
                                        <span className={`text-xs font-medium ${isWeekend ? 'text-red-500' : 'text-gray-700'}`}>
                                            {String(d).padStart(2, '0')}
                                        </span>

                                        {holiday && (
                                            <div className={`mt-1 text-[10px] font-medium px-1.5 py-0.5 rounded border block truncate text-left cursor-pointer ${getHolidayColor(holiday.type)}`} title={holiday.name}>
                                                {holiday.name}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}

                            {nextMonthDays.map((d, i) => (
                                <div key={`next-${i}`} className="h-16 border-r border-b border-gray-200 p-1 bg-gray-50/50">
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
