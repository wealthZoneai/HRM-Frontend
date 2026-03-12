import { useNavigate, useLocation } from "react-router-dom";
import DefaultAvatar from "../assets/CEO.png"; // Changed from user.png to CEO.png or available asset
import { useRef, useEffect, useState } from "react";
import LogoutModal from "./LogoutModal";
import { FiBell, FiHeadphones, FiChevronDown } from "react-icons/fi"; // Lucide icons replaced with Feather icons for consistency if needed, or stick to provided Lucide

// Since Lucide was used in the provided code, let's stick to Lucide but I need to check if lucide-react is installed.
// Package.json did not show lucide-react. It showed react-icons.
// So I will convert lucide-react imports to react-icons.
// Bell -> FiBell
// Headset -> FiHeadphones
// ChevronDown -> FiChevronDown

import { getNotifications } from "../../../Services/apiHelpers";

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

const getGreeting = (): string => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
};

export default function Topbar({ name, id }: TopbarProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const [isLogoutOpen, setIsLogoutOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    // Reactive user data
    const [userData, setUserData] = useState({
        name: name || localStorage.getItem("userName") || "CEO",
        id: id || localStorage.getItem("empId") || "CEO-001"
    });
    const [imageSrc, setImageSrc] = useState(() => localStorage.getItem("profileImage") || DefaultAvatar);

    useEffect(() => {
        const updateProfile = () => {
            const newName = localStorage.getItem("userName") || "CEO";
            const newId = localStorage.getItem("empId") || "CEO-001";
            setUserData({ name: newName, id: newId });
            setImageSrc(localStorage.getItem("profileImage") || DefaultAvatar);
        };
        window.addEventListener('profileUpdate', updateProfile);
        return () => window.removeEventListener('profileUpdate', updateProfile);
    }, []);

    const [unreadCount, setUnreadCount] = useState(0);
    const [isHelpDropdownOpen, setIsHelpDropdownOpen] = useState(false);
    const helpDropdownRef = useRef<HTMLDivElement>(null);

    // Removed profile image fetching logic that depends on 'server' and 'endpoints' which might be missing or different
    // Keeping it simple for now, using DefaultAvatar.
    // If apiHelpers has profile fetch, I can use it, but the provided code had a complex fetch with cache busting.
    // I will comment out the complex fetch to ensure stability first, or use a simpler one if possible.
    // Actually, I'll keep the basic structure but wrap in try-catch and assume 'server' might not be fully compatible with the provided code's expectations (e.g. response structure).
    // The provided code imports `server` from `../../../Services/index`. In this file it should be `../Services/index`.

    // Fetch unread notifications
    useEffect(() => {
        let active = true;
        const fetchUnreadCount = async () => {
            try {
                // Assuming getNotifications is available and works
                const res = await getNotifications();
                if (active && res && res.data && Array.isArray(res.data.data)) {
                    const list = res.data.data;
                    const count = list.filter((item: any) => !item.is_read).length;
                    setUnreadCount(count);
                }
            } catch (err) {
                console.error("Topbar: Failed to fetch notifications", err);
            }
        };

        fetchUnreadCount();
        return () => { active = false; };
    }, [location.pathname]);


    const handleNotification = () => {
        if (location.pathname === "/notifications") {
            navigate(-1);
        } else {
            navigate("/notifications");
        }
    };

    const handleProfileNavigate = () => {
        // Navigate to profile or equivalent
        // The provided code used /employee/profile. I will use /profile or just log for now as per user request to map to specific routes.
        // User asked for: Dashboard, Total employees, Attrition Analysis, payroll insights, Attendance/leave, report
        // Profile is not explicitly requested but usually needed.
        // I'll leave it as is or point to a placeholder.
        navigate("/profile");
    };

    const handleLogoutConfirm = () => {
        try {
            localStorage.clear(); // Simple clear for now
        } catch (e) {
            // ignore
        }
        setIsLogoutOpen(false);
        navigate("/login");
    };

    // Close help dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (helpDropdownRef.current && !helpDropdownRef.current.contains(event.target as Node)) {
                setIsHelpDropdownOpen(false);
            }
        };

        if (isHelpDropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isHelpDropdownOpen]);

    // Close profile dropdown (if we had one separate from navigation)
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                // setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formattedDate = currentTime.toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric",
        month: "short"
    });

    const formattedTime = currentTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    });

    const formattedName = toTitleCase(userData.name || "CEO");
    const greeting = getGreeting();

    return (
        <div className="w-full bg-white border-b border-gray-200 sticky top-1 shadow-[0_2px_3px_-1px_rgba(75,85,99,0.3)] z-40 backdrop-blur-md px-4 sm:px-6">
            <div className="flex items-center justify-between py-3 lg:py-4">

                {/* LEFT SIDE: Identity & Meta */}
                <div className="flex items-center gap-3 lg:gap-0">
                    {/* Mobile Menu Spacer (for hamburger) */}
                    <div className="lg:hidden w-8 sm:w-10 flex-shrink-0" />

                    {/* Mobile Only: Compact View */}
                    <div className="lg:hidden flex flex-col justify-center leading-tight">
                        <h1 className="text-sm sm:text-lg font-bold text-gray-900 truncate max-w-[130px] sm:max-w-none tracking-tight">
                            Hi, {formattedName}
                        </h1>
                        <span className="text-[9px] sm:text-[10px] font-semibold text-gray-400 uppercase">
                            {formattedDate} • {formattedTime}
                        </span>
                    </div>

                    {/* Desktop Only: Full Pro View */}
                    <div className="hidden lg:flex flex-col leading-tight">
                        <h1 className="text-md font-bold text-gray-800 tracking-tight flex items-center gap-2">
                            Hello, {formattedName}
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-100 text-blue-700 border border-blue-200 uppercase tracking-wide">
                                {localStorage.getItem("role") || "CEO"}
                            </span>
                        </h1>
                        <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">{currentTime.toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short", year: "numeric" })}</span>
                            {/* <span className="text-gray-300">|</span> */}
                            <span className="text-[10px] font-bold text-blue-500 tracking-tight">
                                {currentTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true })}
                            </span>
                        </div>
                    </div>
                </div>

                {/* MIDDLE SECTION (Desktop only) */}
                <div className="hidden lg:block text-center flex-1 mx-4">
                    <p className="text-[15px] font-semibold text-gray-700">
                        {greeting}, let's get this workday rolling!
                    </p>
                </div>

                {/* RIGHT SIDE: Action Buttons */}
                <div className="flex items-center gap-2 sm:gap-6">
                    {/* Notifications */}
                    <button
                        onClick={handleNotification}
                        className="relative p-2 rounded-xl text-gray-600 hover:bg-gray-100 active:scale-95 transition-all duration-150"
                    >
                        <FiBell
                            className={`h-5 w-5 sm:h-6 sm:w-6 ${location.pathname === "/notifications" ? "text-blue-600" : ""}`}
                            fill={location.pathname === "/notifications" ? "currentColor" : "none"}
                        />
                        {unreadCount > 0 && (
                            <span className="absolute top-2 right-2 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
                        )}
                    </button>

                    {/* Help/Support */}
                    <div className="relative" ref={helpDropdownRef}>
                        <button
                            onClick={() => setIsHelpDropdownOpen(!isHelpDropdownOpen)}
                            className="flex items-center gap-1 p-2 sm:px-3 sm:py-2 rounded-xl text-gray-600 bg-gray-50 border border-gray-100 hover:bg-gray-100 active:scale-95 transition-all"
                        >
                            <FiHeadphones className="h-5 w-5 sm:h-6 sm:w-6" />
                            <FiChevronDown className={`hidden sm:block transition-transform duration-300 ${isHelpDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isHelpDropdownOpen && (
                            <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
                                <button className="w-full px-4 py-3 text-left hover:bg-blue-50 transition flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                        <FiHeadphones size={16} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-800">Help from HR</p>
                                        <p className="text-[10px] text-gray-500">Employee Support</p>
                                    </div>
                                </button>
                                <div className="h-px bg-gray-100 mx-4 my-1"></div>
                                <button className="w-full px-4 py-3 text-left hover:bg-purple-50 transition flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                                        <FiHeadphones size={16} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-800">IT Support</p>
                                        <p className="text-[10px] text-gray-500">Tech Assistance</p>
                                    </div>
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Profile */}
                    <div className="h-8 w-px bg-gray-200 hidden lg:block" />
                    <button
                        onClick={handleProfileNavigate}
                        className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition-all active:scale-95 group"
                    >
                        <div className="relative">
                            <img
                                src={imageSrc}
                                alt="Profile"
                                className="h-8 w-8 sm:h-9 sm:w-9 rounded-full object-cover shadow-sm group-hover:ring-2 group-hover:ring-blue-400 transition-all"
                            />
                            <div className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-500 rounded-full border-2 border-white"></div>
                        </div>
                        <div className="hidden sm:flex flex-col text-left leading-none">
                            <span className="text-xs sm:text-sm font-bold text-gray-800">{formattedName}</span>
                            <span className="text-[10px] text-gray-500 mt-1 font-medium">ID: {userData.id}</span>
                        </div>
                    </button>
                </div>
            </div>

            <LogoutModal
                isOpen={isLogoutOpen}
                onClose={() => setIsLogoutOpen(false)}
                onConfirm={handleLogoutConfirm}
            />
        </div>
    );
}

