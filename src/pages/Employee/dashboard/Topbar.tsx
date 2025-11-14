// Import Search and updated icons
import { Bell, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TopbarProps {
  name: string;
  id: string | number;
}

// Helper to convert any name to Title Case
function toTitleCase(str: string): string {
  if (!str) return "";
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
  );
}

// Helper to get initials from a name
function getInitials(name: string): string {
  if (!name) return "U"; // Default to "U" for User
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2) // Get max 2 initials
    .join("")
    .toUpperCase();
}

export default function Topbar({ name, id }: TopbarProps) {
  const navigate = useNavigate();
  const today = new Date();

  const handleNotification = () => {
    navigate("/employee/notifications");
  };

  const handleProfileClick = () => {
    navigate("/employee/profile");
  };

  // Single date format, clean and simple
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const formattedName = toTitleCase(name);
  const userInitials = getInitials(formattedName);

  return (
    <div className="w-full flex justify-between items-center py-4 px-4 sm:px-6 bg-white border-b border-gray-200">
      {/* LEFT SIDE: Title & Date */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
          Employee Portal
        </h1>
        <p className="text-sm text-gray-500 hidden sm:block">
          {formattedDate}
        </p>
      </div>

      {/* RIGHT SIDE: Search, Actions & Profile */}
      <div className="flex items-center gap-4 sm:gap-6">
        {/* --- Search Bar (Hidden on mobile) --- */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 w-64 text-sm bg-gray-100 border border-transparent rounded-full focus:bg-white focus:border-gray-300 focus:outline-none transition-all"
          />
        </div>

        {/* --- Notification Bell --- */}
        <button
          onClick={handleNotification}
          className="relative p-2 rounded-full text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="h-6 w-6" />
          {/* Notification dot */}
          <span className="absolute top-1 right-1 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        {/* --- Profile Section --- */}
        <div
          onClick={handleProfileClick}
          className="flex items-center gap-3 cursor-pointer"
        >
          {/* Avatar with Initials */}
          <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm">
            {userInitials}
          </div>

          {/* Name & ID (Hidden on mobile) */}
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-gray-800">
              {formattedName}
            </p>
            <p className="text-xs text-gray-500">ID: {id}</p>
          </div>
        </div>
      </div>
    </div>
  );
}