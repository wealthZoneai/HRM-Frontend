import { Bell, Headset, ChevronDown } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import myPic from "../assets/user.png";
import server from "../Services/index";
import endpoints from "../Services/endpoints";
import { getNotifications } from "../Services/apiHelpers";

interface TopbarProps {
  name: string;
  id: string | number;
}

export default function HrTopbar({ name, id }: TopbarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [imageSrc, setImageSrc] = useState<string>(myPic);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isHelpDropdownOpen, setIsHelpDropdownOpen] = useState(false);
  const helpDropdownRef = useRef<HTMLDivElement>(null);

  // FIX 1: Profile Image - Removed "t: new Date()" cache buster to allow browser caching
  useEffect(() => {
    let active = true;
    let objectUrl: string | null = null;

    const fetchImage = async () => {
      try {
        // Removed `params` to stop forcing a fresh request every time
        const profileRes = await server.get(endpoints.myProfile, {
          requiresAuth: true,
        });

        const photoUrl = profileRes.data?.data?.protected_profile_photo_url || profileRes.data?.protected_profile_photo_url;

        if (photoUrl) {
          const response = await server.get(photoUrl, {
            responseType: "blob",
            requiresAuth: true,
            // Removed cache busting params here as well
          });

          if (active) {
            objectUrl = URL.createObjectURL(response.data);
            setImageSrc(objectUrl);
          }
        }
      } catch (error) {
        // Silent error to prevent console spam
        if (active) setImageSrc(myPic);
      }
    };

    fetchImage();

    return () => {
      active = false;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, []);

  // FIX 2: Notifications - Removed [location.pathname] and added 60s Interval
  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const res = await getNotifications();
        const list = res.data?.data || [];
        const count = list.filter((item: any) => !item.is_read).length;
        setUnreadCount(count);
      } catch (err) {
        // console.error("HrTopbar: Failed to fetch notifications");
      }
    };

    // 1. Fetch immediately on mount
    fetchUnreadCount();

    // 2. Poll every 60 seconds (instead of on every navigation)
    const interval = setInterval(fetchUnreadCount, 60000);

    // 3. Cleanup interval on unmount
    return () => clearInterval(interval);
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

  const handleNotification = () => {
    if (location.pathname === "/hr/notifications") {
      navigate(-1);
    } else {
      navigate("/hr/notifications");
    }
  };

  const handleProfile = () => {
    if (location.pathname === "/hr/profile") {
      navigate(-1);
    } else {
      navigate("/hr/profile");
    }
  };

  return (
    <>
      <div className="w-full bg-white px-6 py-3 shadow-sm flex items-center justify-between relative">
        {/* LEFT */}
        <div>
          <h2 className="text-lg font-bold text-gray-800">Hello, {name}</h2>
          <p className="text-sm text-gray-500">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>

        {/* CENTER */}
        <div className="hidden md:flex flex-1 justify-center">
          <p className="text-gray-600">Let’s have a productive day!</p>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-6 relative">

          {/* NOTIFICATION BUTTON */}
          <button
            onClick={handleNotification}
            className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
          >
            <Bell
              size={20}
              className={`text-gray-700 ${location.pathname === "/hr/notifications" ? "text-blue-600" : ""}`}
              fill={location.pathname === "/hr/notifications" ? "currentColor" : "none"}
            />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 h-2.5 w-2.5 bg-red-500 rounded-full border border-white"></span>
            )}
          </button>

          {/* HELP DROPDOWN */}
          <div className="relative" ref={helpDropdownRef}>
            <button
              onClick={() => setIsHelpDropdownOpen(!isHelpDropdownOpen)}
              className="flex items-center gap-1 px-3 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition text-gray-700"
              title="Help & Support"
            >
              <Headset size={20} />
              <ChevronDown size={16} className={`transition-transform ${isHelpDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isHelpDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <button
                  onClick={() => {
                    setIsHelpDropdownOpen(false);
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

          {/* PROFILE */}
          <div
            onClick={handleProfile}
            className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-gray-100 cursor-pointer"
            role="button"
            tabIndex={0}
          >
            <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
              <img src={imageSrc} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="text-sm font-semibold text-gray-800">{name}</span>
              <span className="text-xs text-gray-500">ID {id}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}