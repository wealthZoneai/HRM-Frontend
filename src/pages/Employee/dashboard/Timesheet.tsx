import { Clock, Calendar } from "lucide-react";

const TIMESHEET_DATA = [
    {
        id: 1,
        project: "HRM System",
        task: "Frontend Development",
        date: "Oct 24, 2025",
        hours: "8h 00m",
        status: "Approved",
    },
    {
        id: 2,
        project: "E-Commerce App",
        task: "API Integration",
        date: "Oct 23, 2025",
        hours: "7h 30m",
        status: "Pending",
    },
    {
        id: 3,
        project: "Internal Tools",
        task: "Bug Fixes",
        date: "Oct 22, 2025",
        hours: "8h 15m",
        status: "Approved",
    },
    {
        id: 4,
        project: "HRM System",
        task: "UI Design",
        date: "Oct 21, 2025",
        hours: "6h 45m",
        status: "Approved",
    },
];

const STATUS_STYLES = {
    Approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Pending: "bg-amber-50 text-amber-700 border-amber-200",
    Rejected: "bg-rose-50 text-rose-700 border-rose-200",
};

export default function Timesheet() {
    return (
        <div className="max-h-[500px] bg-white flex items-center justify-center font-sans text-stone-800">
            <div className="w-full h-full bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-stone-100 overflow-hidden flex flex-col">
                {/* Header */}
                <div className="px-6 py-6 border-b border-stone-100 flex justify-between items-center bg-white">
                    <div>
                        <h2 className="text-xl font-bold text-stone-900 tracking-tight">
                            Timesheet
                        </h2>
                        <p className="text-xs text-stone-500 mt-1">Recent activity</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                        <Clock size={20} />
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
                    <div className="space-y-3">
                        {TIMESHEET_DATA.map((item) => (
                            <div
                                key={item.id}
                                className="group p-4 rounded-2xl border border-stone-100 hover:border-blue-100 hover:bg-blue-50/30 transition-all duration-300"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="font-semibold text-stone-900 group-hover:text-blue-900 transition-colors">
                                            {item.project}
                                        </h3>
                                        <p className="text-xs text-stone-500 mt-0.5">{item.task}</p>
                                    </div>
                                    <div
                                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${STATUS_STYLES[item.status as keyof typeof STATUS_STYLES]
                                            }`}
                                    >
                                        {item.status}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mt-3">
                                    <div className="flex items-center gap-2 text-xs text-stone-500">
                                        <Calendar size={14} />
                                        <span>{item.date}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-sm font-bold text-stone-700">
                                        <Clock size={16} className="text-blue-500" />
                                        {item.hours}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer Action - Removed for scrollbar consistency */}
                {/* <div className="p-4 border-t border-stone-100 bg-stone-50/50">
                <button className="w-full py-2.5 rounded-xl bg-white border border-stone-200 text-stone-600 text-sm font-semibold hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-all shadow-sm">
                    View Full Timesheet
                </button>
            </div> */}
            </div>
        </div>
    );
}
