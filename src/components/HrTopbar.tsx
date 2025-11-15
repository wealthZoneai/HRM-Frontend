import { Search, Bell, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TopbarProps {
  name: string;
  id: string | number;
}

export default function HrTopbar({ name, id }: TopbarProps) {
  const navigate = useNavigate();

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div
      className="
        w-full bg-[#F8FAFF]
        px-4 sm:px-6 py-3
        flex items-center justify-between gap-4
        shadow-sm border-b border-gray-200
      "
    >
      {/* ============= LEFT SECTION ============= */}
      <div className="flex flex-col leading-tight">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
          Hello {name}
        </h2>

        {/* Desktop Date */}
        <p className="text-sm text-blue-600 font-medium hidden sm:block">
          {formattedDate}
        </p>

        {/* Mobile Date */}
        <p className="text-xs text-blue-600 font-medium sm:hidden">
          {today.toLocaleDateString("en-US", { day: "numeric", month: "short" })}
        </p>
      </div>

      {/* ============= CENTER SEARCH BAR ============= */}
      <div className="hidden md:flex flex-1 justify-center px-4">
        <div className="w-full max-w-xl relative">
          <input
            type="text"
            placeholder="Search..."
            className="
              w-full py-2.5 pl-10 pr-4 
              rounded-full border border-gray-300 bg-white
              focus:ring-2 focus:ring-blue-300 focus:outline-none
              text-gray-700 shadow-sm
            "
          />
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          />
        </div>
      </div>

      {/* MOBILE SEARCH ICON */}
      <div className="md:hidden">
        <Search size={20} className="text-gray-700 cursor-pointer" />
      </div>

      {/* ============= RIGHT SECTION ============= */}
      <div className="flex items-center gap-4 sm:gap-6">

        {/* Notification */}
        <div
          className="
            p-2 rounded-full bg-gray-100 cursor-pointer
            hover:bg-gray-200 transition shadow-sm
          "
        >
          <Bell size={18} className="text-gray-700" />
        </div>

        {/* Profile */}
        <div
          className="
            flex items-center gap-2 cursor-pointer
            hover:bg-gray-100 rounded-full px-2 py-1 transition
          "
        >
          <div className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition shadow-sm">
            <User size={18} className="text-gray-700" />
          </div>

          {/* Hide on mobile */}
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="text-sm font-medium text-gray-800">{name}</span>
            <span className="text-xs text-gray-500">ID{String(id)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
