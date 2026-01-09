import { Bell, Headset } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import myPic from "../assets/my_pic.jpg";
// import { GetMyProfile } from "../Services/apiHelpers"; // Removed to use direct call
import server from "../Services/index";
import endpoints from "../Services/endpoints";
import { getNotifications } from "../Services/apiHelpers"; // Import API

interface TopbarProps {
  name: string;
  id: string | number;
}

export default function HrTopbar({ name, id }: TopbarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [imageSrc, setImageSrc] = useState<string>(myPic);
  const [unreadCount, setUnreadCount] = useState(0);

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

        // console.log("HrTopbar: Profile Response", profileRes);

        const photoUrl = profileRes.data?.data?.protected_profile_photo_url || profileRes.data?.protected_profile_photo_url;
        // console.log("HrTopbar: Photo URL", photoUrl);

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
        } else {
          // console.log("HrTopbar: No photo URL found, using default.");
        }
      } catch (error) {
        console.error("HrTopbar: Failed to load profile image", error);
        if (active) setImageSrc(myPic);
      }
    };

    fetchImage();

    return () => {
      active = false;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, []);

  // Fetch unread notifications count
  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const res = await getNotifications();
        // Assuming res.data.data is the list, as seen in Notifications.tsx
        const list = res.data?.data || [];
        const count = list.filter((item: any) => !item.is_read).length;
        setUnreadCount(count);
      } catch (err) {
        console.error("HrTopbar: Failed to fetch notifications", err);
      }
    };

    fetchUnreadCount();
  }, [location.pathname]); // Re-fetch when switching pages (e.g. returning from reading notifications)

  const handleNotification = () => {
    // Toggle between notifications page and dashboard
    if (location.pathname === "/hr/notifications") {
      navigate(-1);
    } else {
      navigate("/hr/notifications");
    }
  };

  const handleProfile = () => {
    if (location.pathname === "/hr/profile") {
      navigate(-1)
    }
    else {
      navigate("/hr/profile")
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

          {/* HELP BUTTON */}
          <button
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition text-gray-700"
            title="Help & Support"
          >
            <Headset size={20} />
          </button>

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
