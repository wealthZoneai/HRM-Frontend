import React, { useState, type ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FiHome,
  FiBriefcase,
  FiClock,
  FiCalendar,
  FiMenu,
  FiFileText,
  FiBook,
  FiDollarSign,
  FiChevronLeft,
  FiLogOut,
  FiUsers
} from "react-icons/fi";
import Topbar from "./Topbar";
import Logo from "../../../assets/white_logo.png";
import SidebarImage from "../../../assets/Sidebar.png";
import LogoutModal from "../../../components/LogoutModal";
import { useDispatch } from "react-redux";
import { clearAttendance } from "../../../store/slice/attendanceSlice";

type DashboardLayoutProps = {
  children: ReactNode;
};

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path: string;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  const role = localStorage.getItem("role");

  const navItems: NavItem[] = [
    { name: "Dashboard", icon: <FiHome size={20} />, path: "/employee/dashboard" },
    // { name: "Profile", icon: <FiUser size={20} />, path: "/employee/profile" },
    { name: "Project Status", icon: <FiBriefcase size={20} />, path: "/employee/project-status" },
    { name: "Attendance", icon: <FiClock size={20} />, path: "/employee/attendances" },

    // {
    //   name: "Notifications",
    //   icon: <FiBell size={20} />,
    //   path: "/employee/notifications",
    // },



    {
      name: "Calendar",
      icon: <FiCalendar size={20} />,
      path: "/employee/calendar",
    },

    { name: "Payroll", icon: <FiDollarSign size={20} />, path: "/employee/payroll" },
    {
      name: "Leaves",
      icon: <FiFileText size={20} />,
      path: "/employee/leave-management",
    },
    {
      name: "Policy",
      icon: <FiBook size={20} />,
      path: "/employee/policy",
    },
    {
      name: "Lead Status",
      icon: <FiUsers size={20} />,
      path: "/employee/lead-status",
    },
  ].filter((item) => {
    if (role === "intern" && item.name === "Payroll") {
      return false;
    }
    if (item.name === "Lead Status" && role !== "tl") {
      return false;
    }
    return true;
  });

  // const handleLogout = () => {
  //   localStorage.removeItem("authToken");
  //   localStorage.removeItem("role");
  //   navigate("/login");
  // };

  // Get username from local storage & format it
  const rawName = localStorage.getItem("userName") || "Raviteja";
  const firstName = rawName.split(".")[0];
  const formattedUserName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();

  const [currentUser, setCurrentUser] = useState({
    name: formattedUserName,
    id: localStorage.getItem("empId") || "WZG-AI-0029"
  });

  const mainContentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // If empId is missing, try to fetch it from the profile
    if (!localStorage.getItem("empId")) {
      import("../../../Services/apiHelpers").then(api => {
        api.GetMyProfile().then(res => {
          if (res.data && res.data.emp_id) {
            localStorage.setItem("empId", res.data.emp_id);
            setCurrentUser(prev => ({ ...prev, id: res.data.emp_id }));
          }
        }).catch(err => console.error("Layout: Failed to fetch profile", err));
      });
    }

    if (mainContentRef.current) {
      mainContentRef.current.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return (
    <div className="flex h-screen overflow-hidden">

      {/* MOBILE MENU BUTTON */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-md shadow"
      >
        <FiMenu size={24} />
      </button>

      {/* BACKDROP */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`
          fixed md:relative top-0 left-0 h-full
          z-50 shadow-lg flex flex-col items-center
          bg-linear-to-b from-[#0E4DB5] to-[#1557C8]
          transition-all duration-300
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          w-56 md:w-40
        `}
      >
        {/* Logo */}
        <div className="w-full flex items-center justify-center py-3.5 border-b border-white/10 relative z-20">
          <img src={Logo} className="h-12  brightness-0 invert" />



          <button
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden absolute right-4 text-white"
          >
            <FiChevronLeft size={22} />
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex-1 w-full  overflow-y-auto no-scrollbar  relative z-20">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);

            return (
              <div
                key={item.name}
                onClick={() => {
                  navigate(item.path);
                  setIsSidebarOpen(false);
                }}
                className={`
                  w-full cursor-pointer transition-all duration-200
                  ${isActive
                    ? "flex flex-row items-center justify-start px-6 py-4 gap-3 bg-white text-[#0E4DB5]"
                    : "flex flex-col items-center justify-center py-4 text-white/80 hover:bg-white/20 hover:text-white"
                  }
                `}
              >
                <div className={`${isActive ? "text-[#0E4DB5]" : "mb-1 text-white/80"}`}>
                  {item.icon}
                </div>

                <span className={`text-sm font-medium ${isActive ? "text-[#0E4DB5]" : "text-white/80"}`}>
                  {item.name}
                </span>
              </div>
            );
          })}
        </div>

        {/* Sidebar Image Background (covers full sidebar) */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <img
            src={SidebarImage}
            alt="Sidebar background"
            className="w-full h-screen object-cover opacity-95"
          />
        </div>

        {/* Divider */}
        <div className="w-full border-t border-white/20 mb-2 z-20"></div>

        {/* Logout */}
        <div
          onClick={() => {
            setIsLogoutOpen(true);
          }}
          className="w-full py-2 flex justify-center gap-2 items-center cursor-pointer text-white/90 hover:bg-white/20 transition z-20"
        >
          <FiLogOut size={22} />
          <span className="text-sm">Logout</span>
        </div>
      </div>

      {/* Logout modal for sidebar */}
      <LogoutModal
        isOpen={isLogoutOpen}
        onClose={() => setIsLogoutOpen(false)}
        onConfirm={() => {
          try {
            // Clearing all auth & user data
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("access"); // Also used in Login logic
            localStorage.removeItem("refresh"); // Also used in Login logic
            localStorage.removeItem("authToken");
            localStorage.removeItem("role");
            localStorage.removeItem("userName");
            localStorage.removeItem("userId");
            localStorage.removeItem("empId");
            localStorage.removeItem("attendance_state"); // Clear persisted attendance

            // Dispatch Redux action to clear state
            dispatch(clearAttendance());

          } catch (e) {
            console.error("Logout cleanup error", e);
          }
          setIsLogoutOpen(false);
          navigate("/login");
        }}
      />

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col">

        <Topbar name={currentUser.name} id={currentUser.id} />

        {/* ONLY CONTENT SCROLLS */}
        <main ref={mainContentRef} className="flex-1 overflow-y-auto px-8 py-6">
          {children}
        </main>
      </div>
    </div>
  );
}
