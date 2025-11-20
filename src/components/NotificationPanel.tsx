import {
  Bell,
  Check,
  DollarSign,
  FileText,
  BadgeCheck,
  CalendarCheck,
} from "lucide-react";

interface Props {
  open: boolean;
  anchorRef: React.RefObject<HTMLButtonElement | null>;
  // 💡 NEW: Function to close the panel, passed from the parent component.
  onClose: () => void; 
}

// Ensure the component accepts the new prop
export default function NotificationPanel({ open, onClose }: Props) {
  if (!open) return null;

  // --- Notification Data and Icon/Color Logic (omitted for brevity) ---
  const notifications = [
    {
      id: 1,
      msg: "Your leave request has been approved.",
      time: "Just now",
      read: false,
      type: "success",
    },
    {
      id: 2,
      msg: "New holiday calendar for 2025 is available.",
      time: "2 hrs ago",
      read: false,
      type: "info",
    },
    {
      id: 3,
      msg: "Team meeting scheduled for tomorrow at 10 AM.",
      time: "Yesterday",
      read: true,
      type: "meeting",
    },
    {
      id: 4,
      msg: "Attendance marked successfully.",
      time: "3 days ago",
      read: true,
      type: "checkin",
    },
    {
      id: 5,
      msg: "Payroll for this month has been processed.",
      time: "1 week ago",
      read: true,
      type: "salary",
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <Check size={18} className="text-white" />;
      case "info":
        return <FileText size={18} className="text-white" />;
      case "meeting":
        return <CalendarCheck size={18} className="text-white" />;
      case "checkin":
        return <BadgeCheck size={18} className="text-white" />;
      case "salary":
        return <DollarSign size={18} className="text-white" />;
      default:
        return <Bell size={18} className="text-gray-600" />;
    }
  };

  const getIconContainerClass = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-500 shadow-md";
      case "info":
        return "bg-blue-500 shadow-md";
      case "meeting":
        return "bg-purple-500 shadow-md";
      case "checkin":
        return "bg-indigo-500 shadow-md";
      case "salary":
        return "bg-teal-500 shadow-md";
      default:
        return "bg-gray-100 shadow-inner";
    }
  };
  // -----------------------------------------------------------------


  return (
    // Outer Container for both Backdrop and Panel
    <div className="fixed inset-0 z-40"> 
      {/* 1. Full-Page Backdrop Overlay */}
      <div 
        className="fixed inset-0 bg-black/30 backdrop-blur-sm" 
        // 💡 FIX: When the user clicks anywhere on this backdrop, call the onClose function.
        onClick={onClose} 
      />


      {/* 2. Notification Panel Content */}
      <div
        className="
          absolute right-4 top-14 w-88 z-50
          rounded-2xl  
          bg-white border border-gray-200 
          animate-slideDown
        "
        // 💡 IMPORTANT: Prevent clicks on the notification panel itself from bubbling up
        // and triggering the backdrop's onClick handler, which would immediately close it.
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gradient Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-4 flex justify-between items-center rounded-t-2xl">
          <h3 className="text-lg font-semibold">Notifications</h3>
          <button className="text-xs bg-white/20 px-2 py-1 rounded-md hover:bg-white/30 transition">
            View All
          </button>
        </div>

        {/* NOTIFICATION LIST */}
        <div className="max-h-80 overflow-y-auto no-scrollbar">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`
                px-4 py-4 flex gap-4 items-start border-b transition-all
                ${!n.read ? "bg-blue-50/60 hover:bg-blue-100/80" : "hover:bg-gray-50"}
                animate-fadeItem
              `}
            >
              {/* Icon */}
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${getIconContainerClass(n.type)}`}>
                {getIcon(n.type)}
              </div>

              {/* Text */}
              <div className="flex-1">
                <p className={`text-sm ${n.read ? "text-gray-700" : "font-semibold text-gray-900"}`}>
                  {n.msg}
                </p>
                <p className="text-xs text-gray-500 mt-1">{n.time}</p>
              </div>

              {/* Unread dot */}
              {!n.read && (
                <span className="w-3 h-3 bg-blue-600 rounded-full animate-pulse mt-1"></span>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 bg-gray-50/70 text-center rounded-b-2xl">
          <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1 justify-center transition">
            <Check size={14} /> Mark all as read
          </button>
        </div>
      </div>
    </div>
  );
}