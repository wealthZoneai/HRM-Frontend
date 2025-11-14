import { Bell, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TopbarProps {
  name: string;
  id: string | number;
}


function toTitleCase(str: string): string {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
  );
}

export default function Topbar({ name, id }: TopbarProps) {
  const navigate = useNavigate()
  const today = new Date();
  const handleNotification = () => {
    navigate('/employee/notifications')
  }

  const handleProfileClick = () => {
    navigate('/employee/profile')
  }

  // Format 1: Long date (for desktop)
  // "Wednesday, 12 November 2025"
  const longFormattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Format 2: Short date (for mobile)
  // "Nov 12, 2025"
  const shortFormattedDate = today.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const formattedName = toTitleCase(name);

  return (
    // Add responsive padding: px-4 on mobile, sm:px-6 on larger screens
    <div className="w-full flex justify-between items-center py-4 px-4 sm:px-6 bg-white border-b">
      {/* LEFT SIDE */}
      <div>
        {/* Make text slightly larger on desktop */}
        <h2 className="text-lg sm:text-xl font-semibold">{`Hello, ${formattedName}`}</h2>

        {/* --- Responsive Date --- */}
        {/* Show short date on mobile (block, but sm:hidden) */}
        <p className="text-sm text-gray-500 block sm:hidden">
          {shortFormattedDate}
        </p>
        {/* Show long date on desktop (hidden, but sm:block) */}
        <p className="text-sm text-gray-500 hidden sm:block">
          {longFormattedDate}
        </p>
      </div>

      {/* RIGHT SIDE */}
      {/* Use a smaller gap on mobile (gap-3) and larger on desktop (sm:gap-5) */}
      <div className="flex items-center gap-3 sm:gap-5">
        <div className="relative cursor-pointer text-gray-600 hover:text-gray-800">
          <Bell className="text-2xl" onClick={handleNotification} />
          {/* Notification dot */}
          <span className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-red-500 rounded-full border border-white"></span>
        </div>

        <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-full cursor-pointer hover:bg-gray-200">
          <User className="text-gray-600 text-xl" onClick={handleProfileClick}/>
        </div>

        {/* --- Responsive ID --- */}
        {/* Hide the ID on mobile (hidden) and show it from sm screens up (sm:block) */}
        <span className="text-xs text-gray-400 hidden sm:block">ID: {id}</span>
      </div>
    </div>
  );
}