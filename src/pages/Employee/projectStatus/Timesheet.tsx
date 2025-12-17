import { useState, useEffect } from "react";
import { Send } from "lucide-react";

interface TimesheetEntry {
    day: string;
    date: string;
    description: string;
    startTime: string;
    endTime: string;
    totalHours: string;
    status: string;
}

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function Timesheet() {
    const [employeeName, setEmployeeName] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [entries, setEntries] = useState<TimesheetEntry[]>(
        DAYS.map((day) => ({
            day,
            date: "",
            description: "",
            startTime: "",
            endTime: "",
            totalHours: "",
            status: "In Progress",
        }))
    );

    // Load user name from local storage if available
    useEffect(() => {
        const storedName = localStorage.getItem("userName");
        if (storedName) setEmployeeName(storedName);
        // You might want to fetch ID as well if available
    }, []);

    const calculateDuration = (start: string, end: string): string => {
        if (!start || !end) return "";
        const [startHours, startMinutes] = start.split(":").map(Number);
        const [endHours, endMinutes] = end.split(":").map(Number);

        let durationHours = endHours - startHours;
        let durationMinutes = endMinutes - startMinutes;

        if (durationMinutes < 0) {
            durationHours -= 1;
            durationMinutes += 60;
        }

        if (durationHours < 0) return "";

        const total = durationHours + durationMinutes / 60;
        return total.toFixed(2);
    };

    const handleInputChange = (index: number, field: keyof TimesheetEntry, value: string) => {
        const newEntries = [...entries];
        const entry = { ...newEntries[index], [field]: value };

        if (field === "startTime" || field === "endTime") {
            const start = field === "startTime" ? value : entry.startTime;
            const end = field === "endTime" ? value : entry.endTime;
            entry.totalHours = calculateDuration(start, end);
        }

        newEntries[index] = entry;
        setEntries(newEntries);
    };

    const isSubmissionAllowed = () => {
        const now = new Date();
        const day = now.getDay(); // 0=Sun, 6=Sat
        const hour = now.getHours();
        // Saturday is 6. 1:00 PM is 13.
        // Uncomment the following line to enforce the rule strictly
        return day === 6 && hour >= 13;

        // For testing purposes, you might want to return true
        // return true; 
    };

    const handleSubmit = () => {
        if (!isSubmissionAllowed()) {
            alert("Timesheet can only be submitted on Saturday after 1:00 PM.");
            return;
        }
        console.log("Submitting timesheet:", { employeeName, employeeId, entries });
        alert("Timesheet submitted successfully!");
    };

    return (
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
            <div className="flex flex-col gap-6 mb-8">
                <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                    <h2 className="text-xl font-bold text-gray-900">Weekly Timesheet</h2>
                    <div className="text-sm text-gray-500">
                        Submission Deadline: Saturday 1:00 PM
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-gray-700">Employee Name</label>
                        <input
                            type="text"
                            value={employeeName}
                            onChange={(e) => setEmployeeName(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                            placeholder="Enter Name"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-gray-700">Employee ID</label>
                        <input
                            type="text"
                            value={employeeId}
                            onChange={(e) => setEmployeeId(e.target.value)}
                            className="border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                            placeholder="Enter ID"
                        />
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full min-w-[900px] border-collapse">
                    <thead>
                        <tr className="bg-gray-50 text-left">
                            <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider w-32">Day</th>
                            <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider w-36">Date</th>
                            <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">Task Description</th>
                            <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider w-28">Start Time</th>
                            <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider w-28">End Time</th>
                            <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider w-24">Hours</th>
                            <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider w-40">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {entries.map((entry, index) => (
                            <tr key={entry.day} className="hover:bg-blue-50/30 transition-colors">
                                <td className="px-4 py-3 text-sm font-medium text-gray-900 bg-gray-50/50">
                                    {entry.day}
                                </td>
                                <td className="px-4 py-3">
                                    <input
                                        type="date"
                                        value={entry.date}
                                        onChange={(e) => handleInputChange(index, "date", e.target.value)}
                                        className="w-full bg-transparent border border-gray-200 rounded px-2 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    />
                                </td>
                                <td className="px-4 py-3">
                                    <input
                                        type="text"
                                        value={entry.description}
                                        onChange={(e) => handleInputChange(index, "description", e.target.value)}
                                        className="w-full border border-gray-200 rounded px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                        placeholder="What did you work on?"
                                    />
                                </td>
                                <td className="px-4 py-3">
                                    <input
                                        type="time"
                                        value={entry.startTime}
                                        onChange={(e) => handleInputChange(index, "startTime", e.target.value)}
                                        className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    />
                                </td>
                                <td className="px-4 py-3">
                                    <input
                                        type="time"
                                        value={entry.endTime}
                                        onChange={(e) => handleInputChange(index, "endTime", e.target.value)}
                                        className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    />
                                </td>
                                <td className="px-4 py-3">
                                    <input
                                        type="number"
                                        value={entry.totalHours}
                                        onChange={(e) => handleInputChange(index, "totalHours", e.target.value)}
                                        className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                        placeholder="0"
                                    />
                                </td>
                                <td className="px-4 py-3">
                                    <select
                                        value={entry.status}
                                        onChange={(e) => handleInputChange(index, "status", e.target.value)}
                                        className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                                    >
                                        <option value="In Progress">In Progress</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-8 flex justify-end">
                <button
                    onClick={handleSubmit}
                    disabled={!isSubmissionAllowed()}
                    className={`flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all shadow-lg transform active:scale-95
                ${isSubmissionAllowed()
                            ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-blue-500/30 hover:-translate-y-0.5"
                            : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                        }`}
                >
                    <Send size={18} />
                    {isSubmissionAllowed() ? "Submit" : "Submit"}
                </button>
            </div>
        </div>
    );
}
