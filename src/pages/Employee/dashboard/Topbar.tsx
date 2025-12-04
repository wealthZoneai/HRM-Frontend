import { Bell } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import DefaultAvatar from "../../../assets/my_pic.jpg";
import { useRef, useEffect, useState } from "react";
// import myPic from "../../../assets/my_pic.jpg";
import LogoutModal from "../../../components/LogoutModal";
// import { useSelector } from "react-redux";

interface TopbarProps {
  name: string;
  id: string | number;
}

function toTitleCase(str: string): string {
  if (!str) return "";
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
  );
}

// function getInitials(name: string): string {

//   if (!name) return "U";
//   return name
//     .split(" ")
//     .map((n) => n[0])
//     .slice(0, 2)
//     .join("")
//     .toUpperCase();
// }

const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
};

export default function Topbar({ name, id }: TopbarProps) {
  // const username = useSelector((store) => store?.userName)
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleNotification = () => {
    // Toggle between notifications page and dashboard
    if (location.pathname === "/employee/notifications") {
      navigate(-1);
    } else {
      navigate("/employee/notifications");
    }
  };

  const handleProfileNavigate = () => {
    // Toggle between profile page and dashboard
    if (location.pathname === "/employee/profile") {
      navigate(-1)
    } else {
      navigate("/employee/profile");
    }
    // setIsDropdownOpen(false);
  };

  const handleLogoutConfirm = () => {
    // Clear tokens/local state and navigate to login
    try {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("authToken");
      localStorage.removeItem("role");
    } catch (e) {
      // ignore
    }
    setIsLogoutOpen(false);
    navigate("/login");
  };
  // const handleLogout = () => {
  //   console.log("Logout...");
  //   // setIsDropdownOpen(false);
  // };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        // setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formattedName = toTitleCase(name);
  // const userInitials = getInitials(formattedName);
  const greeting = getGreeting();

  return (
    <div className="w-full flex flex-col lg:flex-row justify-between items-center py-4 px-4 sm:px-6 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40 gap-3 lg:gap-0 backdrop-blur-md">
      {/* LEFT SIDE - Centered on mobile */}
      <div className="flex flex-col leading-tight text-center lg:text-left order-2 lg:order-1 w-full lg:w-auto">
        <h1 className="text-md font-bold text-gray-800 tracking-tight">
          Hello, {formattedName}
        </h1>
        <p className="text-xs text-gray-500 font-medium">Employee ID: {id}</p>
      </div>

      {/* MIDDLE SECTION - Hidden on mobile */}
      <div className="hidden lg:block text-center flex-1 order-2">
        <p className="text-[15px] font-semibold text-gray-700">
          {greeting}, let's get this workday rolling!
        </p>
      </div>

      {/* RIGHT SIDE - Always right-aligned */}
      <div className="flex items-center justify-end gap-4 sm:gap-6 w-full lg:w-auto order-1 lg:order-3">
        {/* Notifications */}
        <button
          onClick={handleNotification}
          className="relative p-2 rounded-full text-gray-600 hover:bg-gray-100 active:scale-95 transition-all duration-150"
        >
          <Bell
            className={`h-6 w-6 ${location.pathname === "/employee/notifications" ? "text-blue-600" : ""}`}
            fill={location.pathname === "/employee/notifications" ? "currentColor" : "none"}
          />
          {/* <span className="absolute top-1 right-1 h-2.5 w-2.5 bg-red-500 rounded-full border border-white"></span> */}
        </button>

        {/* Profile Avatar + Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <div className="flex items-center gap-3">
            <div
              onClick={handleProfileNavigate}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleProfileNavigate();
              }}
              role="button"
              tabIndex={0}
              title="View profile"
              className="flex items-center gap-3 cursor-pointer select-none"
            >
              <img
                src={DefaultAvatar}
                alt="Profile"
                className="h-10 w-10 rounded-full object-cover shadow-md"
              />
            </div>

            {/* Logout trigger */}
            {/* <button
              onClick={() => setIsLogoutOpen(true)}
              title="Logout"
              className="p-2 rounded-full text-gray-600 hover:bg-gray-100 active:scale-95 transition-all duration-150"
            >
              <FiLogOut className="h-5 w-5" />
            </button> */}
          </div>
        </div>
      </div>

      {/* Logout Modal */}
      <LogoutModal
        isOpen={isLogoutOpen}
        onClose={() => setIsLogoutOpen(false)}
        onConfirm={handleLogoutConfirm}
      />
    </div>
  );
}
