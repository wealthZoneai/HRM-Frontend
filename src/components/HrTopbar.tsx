import { Bell, User, CheckCircle } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface TopbarProps {
  name: string;
  id: string | number;
}

// Mock Notification Data with a 'read' status
const notifications = [
  { id: 1, msg: "New holiday calendar is updated.", time: "2 hrs ago", read: false },
  { id: 2, msg: "Your leave request is being processed.", time: "5 hrs ago", read: false },
  { id: 3, msg: "Team meeting scheduled for Monday.", time: "Yesterday", read: true },
  { id: 4, msg: "Payroll released successfully.", time: "2 days ago", read: true },
  { id: 5, msg: "Check-in reminder for today.", time: "3 days ago", read: true },
];


export default function HrTopbar({ name, id }: TopbarProps) {
  const [openNotif, setOpenNotif] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      // Check if the click is outside the notification popup AND outside the bell button
      const bellButton = document.getElementById("bell-button"); 
      
      if (
          notifRef.current && 
          !notifRef.current.contains(e.target as Node) && 
          (!bellButton || !bellButton.contains(e.target as Node))
      ) {
        setOpenNotif(false);
      }
    };
    
    // Add event listener only when notification is open
    if (openNotif) {
        document.addEventListener("mousedown", handleOutside);
    }
    
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [openNotif]); // Rerun effect when openNotif changes

  // Calculate unread count for the badge
  const unreadCount = notifications.filter(n => !n.read).length;


  // --- Unique Notification Item Component ---
  const NotificationItem: React.FC<{ msg: string; time: string; read: boolean }> = ({ msg, time, read }) => (
    <div
      className={`
        flex items-start justify-between gap-3 px-4 py-3 border-b border-gray-100 
        transition duration-150 cursor-pointer
        ${read ? 'bg-white hover:bg-gray-50' : 'bg-blue-50/70 hover:bg-blue-100'}
      `}
    >
      <div className="flex-1">
        <p className={`text-sm ${read ? 'text-gray-700' : 'text-gray-900 font-medium'}`}>{msg}</p>
        <p className="text-xs text-gray-500 mt-1">{time}</p>
      </div>
      {!read && (
        <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-1" title="Unread"></span>
      )}
    </div>
  );


  return (
    <>
      {/* 1. Backdrop Layer (Appears when notifications are open) */}
      {openNotif && (
        <div
          onClick={() => setOpenNotif(false)}
          className="fixed inset-0 bg-black/50 z-40" 
        />
      )}

      {/* 2. Top Bar Content */}
      <div className="w-full bg-white px-4 sm:px-6 py-3 flex items-center justify-between border-b shadow-sm relative z-50"> 

        {/* LEFT */}
        <div className="flex flex-col">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
            Hello {name}
          </h2>
          <p className="text-sm text-gray-500">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>

        {/* CENTER */}
        <div className="hidden md:flex flex-1 justify-center pr-10">
          <p className="text-base text-gray-600">
            Good morning, let's have a productive day!
          </p>
        </div>

        {/* RIGHT ICONS */}
        <div className="flex items-center gap-6 relative">

          {/* ============== BELL BUTTON ============== */}
          <button
            id="bell-button" // Added ID for easier outside-click handling
            onClick={() => setOpenNotif(!openNotif)}
            className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
          >
            <Bell size={20} strokeWidth={1.7} className="text-gray-700" />

            {/* Badge (shows unread count) */}
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-[5px] py-px rounded-full">
                {unreadCount}
              </span>
            )}
          </button>

          {/* ============== NOTIFICATION POPUP (NEW UNIQUE DESIGN) ============== */}
          {openNotif && (
            <div
              ref={notifRef}
              className="
                absolute right-0 top-12 w-80 
                bg-white 
                rounded-xl shadow-2xl 
                animate-fade-in
                z-50 border border-gray-100
              "
            >
              {/* Arrow Pointer */}
              <div className="absolute -top-2 right-4 w-4 h-4 bg-white transform rotate-45 border-t border-l border-gray-100"></div>

              {/* Header */}
              <div className="px-4 py-3 border-b flex justify-between items-center">
                <h3 className="text-base font-bold text-gray-800">Notifications ({unreadCount} new)</h3>
                <button className="text-xs font-medium text-blue-600 hover:text-blue-700 transition">
                  View All
                </button>
              </div>

              {/* LIST */}
              <div className="max-h-80 overflow-y-auto custom-scroll divide-y divide-gray-600">
                {notifications.length > 0 ? (
                  notifications.map((n) => (
                    <NotificationItem 
                      key={n.id} 
                      msg={n.msg} 
                      time={n.time} 
                      read={n.read} 
                    />
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500 text-sm">No new notifications.</div>
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-3 text-center border-t bg-gray-50/50">
                <button className="text-sm text-blue-600 hover:text-blue-700 transition flex items-center justify-center w-full gap-1">
                  <CheckCircle size={14} /> Mark All as Read
                </button>
              </div>

            </div>
          )}

          {/* PROFILE */}
          <div className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-gray-100 cursor-pointer">
            <div className="p-2 rounded-full bg-gray-100">
              <User size={18} className="text-gray-700" />
            </div>

            <div className="hidden sm:flex flex-col leading-tight">
              <span className="text-sm font-medium text-gray-800">{name}</span>
              <span className="text-xs text-gray-500">ID {id}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}