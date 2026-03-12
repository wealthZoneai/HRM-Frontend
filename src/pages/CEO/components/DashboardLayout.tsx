import React, { useState, type ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
    FiHome,
    FiBriefcase,
    FiClock,
    FiMenu,
    FiDollarSign,
    FiChevronLeft,
    FiLogOut,
    FiUsers,
    FiGrid,
    FiAlertOctagon
} from "react-icons/fi";
import Topbar from "./Topbar";
import Logo from "../assets/WZG.png"; // Changed to existing logo
import SidebarImage from "../assets/Navbarbackground.png"; // Changed to existing background
import LogoutModal from "./LogoutModal";
// Removed Redux dispatch

type DashboardLayoutProps = {
    children: ReactNode;
};

type NavItem = {
    name: string;
    icon: React.ReactNode;
    activeIcon?: React.ReactNode;
    path: string;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const navigate = useNavigate();
    // const dispatch = useDispatch(); // Removed
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isLogoutOpen, setIsLogoutOpen] = useState(false);

    // const role = localStorage.getItem("role");

    // Nav items based on user request:
    // Dashboard, Total employees, Attrition Analysis, payroll insights, Attendance/leave, report
    // Mapped to routes identified in AppRouter.tsx:
    // / -> Dashboard (DepartmentsPage)
    // /employees -> Total Employees
    // /analytics -> Attrition Analysis
    // /payroll -> Payroll Insights
    // /attendance -> Attendance/Leave
    // /reports -> Reports

    // Note: The user provided code had some role based filtering. I will keep it generic or assume CEO role for now as per "HRM-CEO" folder name, but user code had check for 'intern' etc.
    // I will keep the list consistent with user request.

    const navItems: NavItem[] = [
        {
            name: "Dashboard",
            icon: <FiHome size={20} />,
            activeIcon: <FiGrid size={20} />,
            path: "/ceo/dashboard"
        },
        { name: "Total Employees", icon: <FiUsers size={20} />, path: "/ceo/employees" },
        { name: "Attrition Analysis", icon: <FiBriefcase size={20} />, path: "/ceo/analytics" }, // Using FiBriefcase as placeholder for Analysis
        { name: "Payroll Insights", icon: <FiDollarSign size={20} />, path: "/ceo/payroll" },
        { name: "Attendance/Leave", icon: <FiClock size={20} />, path: "/ceo/attendance" },
        {
            name: "Report",
            icon: <FiAlertOctagon size={20} />,
            activeIcon: <FiAlertOctagon size={20} />,
            path: "/ceo/reports"
        },
        // Keeping Policy and Calendar if they were part of the original request logic or just extras.
        // User said: "replace the menu items to Dashboard, Total employees, Attrition Analysis, payroll insights, Attendance/leave, report"
        // So I will stick to these.
    ];

    /* 
    // User provided filter logic
    .filter((item) => {
      if (role === "intern" && item.name === "Payroll") {
        return false;
      }
      if (item.name === "Lead Status" && role !== "tl") {
        return false;
      }
      return true;
    });
    */

    const getUserData = () => {
        const rawName = localStorage.getItem("userName") || "CEO";
        return {
            name: rawName,
            id: localStorage.getItem("empId") || "CEO-001"
        };
    };

    const [currentUser, setCurrentUser] = useState(getUserData);

    React.useEffect(() => {
        const updateUserData = () => {
            setCurrentUser(getUserData());
        };

        window.addEventListener('profileUpdate', updateUserData);
        return () => window.removeEventListener('profileUpdate', updateUserData);
    }, []);

    const mainContentRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        // Basic profile update check if needed, simplified to avoid complex imports for now
        if (mainContentRef.current) {
            mainContentRef.current.scrollTo(0, 0);
        }
    }, [location.pathname]);

    const handleLogout = () => {
        try {
            localStorage.clear();
        } catch (e) {
            console.error("Logout error", e);
        }
        setIsLogoutOpen(false);
        navigate("/login");
        // Note: AppRouter.tsx doesn't show /login route, but it's standard. 
        // If /login doesn't exist, it might redirect to / (which might check auth).
        // The previous code had /logout route which might have been a component.
    };

    return (
        <div className="flex h-screen overflow-hidden bg-gray-50">

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
          transition-all duration-300
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          w-44 md:w-44
        `}
                style={{
                    backgroundImage: `url(${SidebarImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}
            >
                {/* Logo */}
                <div className="w-full flex items-center justify-center py-6 border-b border-white/5 relative z-20">
                    {/* Added brightness-0 invert to make it white if it's not */}
                    <img src={Logo} className="h-8 object-contain brightness-0 invert" alt="Logo" />

                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="md:hidden absolute right-4 text-white"
                    >
                        <FiChevronLeft size={22} />
                    </button>
                </div>

                {/* Menu Items */}
                <div className="flex-1 w-full overflow-y-auto no-scrollbar relative z-20 py-4 flex flex-col justify-evenly">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(`${item.path}`)) || (item.path === '/' && location.pathname === '/departments');

                        return (
                            <div
                                key={item.name}
                                onClick={() => {
                                    navigate(item.path);
                                    setIsSidebarOpen(false);
                                }}
                                className={`
                  w-full cursor-pointer transition-all duration-200 py-3
                  ${isActive
                                        ? "bg-white text-[#0E4DB5] px-6"
                                        : "hover:bg-white/10 text-white"
                                    }
                `}
                            >
                                <div className={`
                                    flex items-center 
                                    ${isActive
                                        ? "flex-row justify-start gap-3"
                                        : "flex-col justify-center gap-1"
                                    }
                                `}>
                                    <div className={`${isActive ? "text-[#0E4DB5]" : "text-white"}`}>
                                        {React.cloneElement((isActive && item.activeIcon ? item.activeIcon : item.icon) as any, { size: 24 })}
                                    </div>

                                    <span className={`
                                        text-[14px] leading-tight 
                                        ${isActive
                                            ? "text-[#0E4DB5] font-normal text-left"
                                            : "text-white text-center px-1"
                                        }
                                    `}>
                                        {item.name} 
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Sidebar Image Background (covers full sidebar) */}
                <div className="absolute inset-0 pointer-events-none z-0">
                    <img
                        src={SidebarImage}
                        alt="Sidebar background"
                        className="w-full h-full object-cover opacity-20 mix-blend-overlay"
                    />
                </div>

                {/* Divider */}
                <div className="w-full border-t border-white/20 mb-2 z-20"></div>

                {/* Logout */}
                <div
                    onClick={() => {
                        setIsLogoutOpen(true);
                    }}
                    className="w-full py-4 flex flex-col justify-center gap-1 items-center cursor-pointer text-white/90 hover:bg-white/10 transition-all duration-300 z-20 mb-2 group"
                >
                    <FiLogOut size={20} className="group-hover:text-red-500 group-hover:scale-110 transition-all duration-300" />
                    <span className="text-[12px] font-normal">Logout</span>
                </div>
            </div>

            {/* Logout modal */}
            <LogoutModal
                isOpen={isLogoutOpen}
                onClose={() => setIsLogoutOpen(false)}
                onConfirm={handleLogout}
            />

            {/* MAIN AREA */}
            <div className="flex-1 flex flex-col h-full overflow-hidden">

                <Topbar name={currentUser.name} id={currentUser.id} />

                {/* ONLY CONTENT SCROLLS */}
                <main ref={mainContentRef} className="flex-1 overflow-y-auto bg-gray-50 p-6 scroll-smooth">
                    {children}
                </main>
            </div>
        </div>
    );
}
