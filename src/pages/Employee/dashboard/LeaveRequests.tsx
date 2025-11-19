
import { CalendarDays, Clock,  CheckCircle2, XCircle, AlertCircle } from "lucide-react";

const data = [
  { id: 1, type: "Sick Leave", time: "2 hrs ago", status: "Pending", date: "Oct 24 - Oct 25" },
  { id: 2, type: "Annual Leave", time: "13 days ago", status: "Approved", date: "Nov 01 - Nov 10" },
  { id: 3, type: "Remote Work", time: "2 days ago", status: "Rejected", date: "Oct 12" },
  { id: 4, type: "Sick Leave", time: "1 month ago", status: "Approved", date: "Sep 15" },
];

const STATUS_CONFIG = {
  Pending: {
    style: "bg-amber-50 text-amber-700 border-amber-200",
    icon: AlertCircle
  },
  Approved: {
    style: "bg-emerald-50 text-emerald-700 border-emerald-200",
    icon: CheckCircle2
  },
  Rejected: {
    style: "bg-rose-50 text-rose-700 border-rose-200",
    icon: XCircle
  },
};

export default function LeaveRequests() {
  return (
    <div className="max-h-[700px] bg-white flex items-center justify-center font-sans text-stone-800">

      {/* Main Card */}
      <div className="h-full w-full bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-stone-100 overflow-hidden">
        
        {/* Header */}
        <div className="px-6 pt-8 pb-6 flex justify-between items-start">
          <div>
            {/* <h2 className="text-xs font-bold tracking-widest uppercase text-blue-900/60 mb-1">HR Portal</h2> */}
            <h1 className="text-2xl font-bold text-stone-900 tracking-tight">Leave Requests</h1>
          </div>
          {/* <button className="p-2 rounded-full hover:bg-stone-50 text-stone-400 hover:text-blue-900 transition-colors">
            <Filter size={20} />
          </button> */}
        </div>

        {/* List Section */}
        <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
          <div className="space-y-1 px-4 pb-4">
            {data.map((req) => {
              const StatusIcon = STATUS_CONFIG[req.status as keyof typeof STATUS_CONFIG].icon;
              
              return (
                <div
                  key={req.id}
                  className="group flex items-center justify-between p-4 rounded-2xl hover:bg-stone-50 border border-transparent hover:border-stone-100 transition-all duration-300 cursor-pointer"
                >
                  {/* Left Info */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-stone-50 group-hover:bg-white group-hover:shadow-sm transition-all text-stone-400 group-hover:text-blue-900">
                      <CalendarDays size={20} />
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-bold text-stone-900 group-hover:text-blue-900 transition-colors">
                        {req.type}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-medium text-stone-500">{req.date}</span>
                        <span className="w-1 h-1 rounded-full bg-stone-300"></span>
                        <div className="flex items-center text-stone-400 text-xs">
                          <Clock className="w-3 h-3 mr-1" />
                          <span>{req.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-bold tracking-wide uppercase ${STATUS_CONFIG[req.status as keyof typeof STATUS_CONFIG].style}`}>
                    <StatusIcon size={12} strokeWidth={3} />
                    {req.status}
                  </div>
                </div>
              );
            })}
        {/* <div className="px-6 py-4 border-t border-stone-100 bg-stone-50/50 flex justify-center">
          <button className="text-sm font-semibold text-stone-500 hover:text-blue-900 flex items-center gap-1 transition-colors group">
            View Full History
            <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div> */}

      </div>
    </div>
  </div>
</div>
  );
}