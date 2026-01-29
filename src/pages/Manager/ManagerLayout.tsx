import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
    FiHome,
    FiBriefcase,
    FiLayers,
    FiLogOut,
    FiMenu,
    FiChevronLeft,
} from "react-icons/fi";
import Logo from "../../assets/white_logo.png";
import SidebarImage from "../../assets/Sidebar.png";
import LogoutModal from "../../components/LogoutModal";
import HrTopbar from "../../components/HrTopbar"; // Reusing HrTopbar for now as it likely has profile info
import { useDispatch } from "react-redux";
// import { clearAttendance } from "../../store/slice/attendanceSlice"; // If needed

interface ManagerLayoutProps {
    children: React.ReactNode;
}

export default function ManagerLayout({ children }: ManagerLayoutProps) {
    const navigate = useNavigate();
    // const dispatch = useDispatch();
    const location = useLocation();
    const [openLogout, setOpenLogout] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const mainContentRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to top on route change
    useEffect(() => {
        if (mainContentRef.current) {
            mainContentRef.current.scrollTop = 0;
        }
    }, [location.pathname]);

    const rawRole = localStorage.getItem("role") || "dm";
    // If role is 'dm', prefix routes with /dm, else /pm
    const routePrefix = rawRole === "pm" ? "/pm" : "/dm";

    const [currentUser, setCurrentUser] = useState({
        name: localStorage.getItem("userName") || "Manager",
        id: localStorage.getItem("empId") || "WZG-MAN-001",
    });

    useEffect(() => {
        // If empId is missing, try to fetch it from the profile
        if (!localStorage.getItem("empId")) {
            import("../../Services/apiHelpers").then(api => {
                api.GetMyProfile().then(res => {
                    if (res.data && res.data.emp_id) {
                        localStorage.setItem("empId", res.data.emp_id);
                        setCurrentUser(prev => ({ ...prev, id: res.data.emp_id }));
                    }
                }).catch(err => console.error("ManagerLayout: Failed to fetch profile", err));
            });
        }
    }, []);

    const navItems = [
        { name: "Dashboard", icon: <FiHome size={20} />, path: `${routePrefix}/dashboard` },
        ...(rawRole === 'dm' ? [{ name: "Create Project", icon: <FiBriefcase size={20} />, path: `${routePrefix}/create-project` }] : []),
        ...(rawRole === 'pm' ? [{ name: "Create Module", icon: <FiLayers size={20} />, path: `${routePrefix}/create-module` }] : []),
    ];

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
                    <img src={Logo} className="h-12 brightness-0 invert" alt="Logo" />

                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="md:hidden absolute right-4 text-white"
                    >
                        <FiChevronLeft size={22} />
                    </button>
                </div>

                {/* Menu Items */}
                <div className="flex-1 w-full overflow-y-auto no-scrollbar relative z-20 mt-4">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;

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

                {/* Sidebar Image Background */}
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
                    onClick={() => setOpenLogout(true)}
                    className="w-full py-2 flex justify-center gap-2 items-center cursor-pointer text-white/90 hover:bg-white/20 transition z-20"
                >
                    <FiLogOut size={22} />
                    <span className="text-sm">Logout</span>
                </div>
            </div>

            {/* MAIN AREA */}
            <div className="flex-1 flex flex-col bg-gray-50">
                <HrTopbar name={currentUser.name} id={currentUser.id} />

                {/* ONLY CONTENT SCROLLS */}
                <main ref={mainContentRef} className="flex-1 overflow-y-auto p-6">
                    {children}
                </main>
            </div>

            <LogoutModal
                isOpen={openLogout}
                onClose={() => setOpenLogout(false)}
                onConfirm={() => {
                    // Clear storage
                    localStorage.clear();
                    // dispatch(clearAttendance()); // if we had this
                    navigate("/login");
                    setIsSidebarOpen(false);
                }}
            />
        </div>
    );
}
