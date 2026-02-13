 import { Bell, Headset, ChevronDown } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import DefaultAvatar from "../../../assets/user.png";
import { useRef, useEffect, useState } from "react";
import LogoutModal from "../../../components/LogoutModal";
import server from "../../../Services/index";
import endpoints from "../../../Services/endpoints";
import { getNotifications } from "../../../Services/apiHelpers"; // Import API

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
  // const username = useSelector((store) => store?.userName)
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [imageSrc, setImageSrc] = useState<string>(DefaultAvatar);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isHelpDropdownOpen, setIsHelpDropdownOpen] = useState(false);
  const helpDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;
    let objectUrl: string | null = null;

    const fetchImage = async () => {
      try {
        // Fetch profile directly with cache busting to ensure we get the latest photo URL
        const profileRes = await server.get(endpoints.myProfile, {
          requiresAuth: true,
          params: { t: new Date().getTime() }
        });

        const photoUrl = profileRes.data?.data?.protected_profile_photo_url || profileRes.data?.protected_profile_photo_url;

        if (photoUrl) {
          // Fetch image as Blob with auth headers and cache busting
          const response = await server.get(photoUrl, {
            responseType: "blob",
            requiresAuth: true,
            params: { t: new Date().getTime() }
          });

          if (active) {
            objectUrl = URL.createObjectURL(response.data);
            setImageSrc(objectUrl);
          }
        }
      } catch (error) {
        console.error("Topbar: Failed to load profile image", error);
        if (active) setImageSrc(DefaultAvatar);
      }
    };

    fetchImage();

    return () => {
      active = false;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, []);

  // Fetch unread notifications
  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const res = await getNotifications();
        const list = res.data?.data || [];
        const count = list.filter((item: any) => !item.is_read).length;
        setUnreadCount(count);
      } catch (err) {
        console.error("Topbar: Failed to fetch notifications", err);
      }
    };

    fetchUnreadCount();
  }, [location.pathname]);


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

  const formattedName = toTitleCase(name);
  // const userInitials = getInitials(formattedName);
  const greeting = getGreeting();

  return (
    <div className="w-full flex flex-col lg:flex-row justify-between items-center py-4 px-4 sm:px-6 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40 gap-3 lg:gap-0 backdrop-blur-md">
      {/* LEFT SIDE - Centered on mobile */}
      <div className="flex flex-col leading-tight text-center lg:text-left order-2 lg:order-1 w-full lg:w-auto">
        <h1 className="text-md font-bold text-gray-800 tracking-tight flex items-center gap-2 justify-center lg:justify-start">
          Hello, {formattedName}
          <span className="px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-200 uppercase tracking-wide">
            {localStorage.getItem("role") || "Employee"}
          </span>
        </h1>
        {/* <p className="text-xs text-gray-500 font-medium">Employee ID: {id}</p> */}
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
          {/* Badge */}
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 h-2.5 w-2.5 bg-red-500 rounded-full border border-white"></span>
          )}
        </button>

        {/* HELP DROPDOWN */}
        <div className="relative" ref={helpDropdownRef}>
          <button
            onClick={() => setIsHelpDropdownOpen(!isHelpDropdownOpen)}
            className="flex items-center gap-1 px-3 py-2 rounded-full text-gray-600 hover:bg-gray-100 active:scale-95 transition-all duration-150"
            title="Help & Support"
          >
            <Headset className="h-6 w-6" />
            <ChevronDown size={16} className={`transition-transform ${isHelpDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {isHelpDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              <button
                onClick={() => {
                  setIsHelpDropdownOpen(false);
                  // Navigate or handle HR help action
                  console.log("Help from HR clicked");
                }}
                className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 transition flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Headset size={16} className="text-blue-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-800">Help from HR</div>
                  <div className="text-xs text-gray-500">Contact HR Department</div>
                </div>
              </button>
              <div className="h-px bg-gray-100 my-1"></div>
              <button
                onClick={() => {
                  setIsHelpDropdownOpen(false);
                  // Navigate or handle IT support action
                  console.log("IT Support clicked");
                }}
                className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 transition flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <Headset size={16} className="text-purple-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-800">IT Support</div>
                  <div className="text-xs text-gray-500">Technical Assistance</div>
                </div>
              </button>
            </div>
          )}
        </div>

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
              className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-gray-100 cursor-pointer select-none transition-colors"
            >
              <img
                src={imageSrc}
                alt="Profile"
                className="h-9 w-9 rounded-full object-cover shadow-sm"
              />
              <div className="hidden sm:flex flex-col leading-tight text-left">
                <span className="text-sm font-semibold text-gray-800">{formattedName}</span>
                <span className="text-xs text-gray-500">ID {id}</span>
              </div>
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
