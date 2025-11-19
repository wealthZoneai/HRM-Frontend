import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import {
  FiHome,
  FiUsers,
  FiCalendar,
  FiClock,
  FiDollarSign,
  FiBell,
  FiGift,
  FiLogOut,
  FiMenu,
} from "react-icons/fi";

import Logo from "../../assets/white_logo.png";
import HrTopbar from "../../components/HrTopbar";
import LogoutModal from "../../components/LogoutModal";

interface HRLayoutProps {
  children: React.ReactNode;
}

export default function HRLayout({ children }: HRLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [openLogout, setOpenLogout] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const currentUser = {
    name: "Raviteja",
    id: "WZG-AI-0029",
  };

  const navItems = [
    { name: "Dashboard", icon: <FiHome size={22} />, path: "/hr/dashboard" },
    { name: "Employees", icon: <FiUsers size={22} />, path: "/hr/employees" },
    { name: "Leave", icon: <FiCalendar size={22} />, path: "/hr/leave-management" },
    { name: "Attendence", icon: <FiClock size={22} />, path: "/hr/attendance" },
    { name: "Salary", icon: <FiDollarSign size={22} />, path: "/hr/salary" },
    { name: "Announcements", icon: <FiBell size={22} />, path: "/hr/announcements" },
    { name: "Holidays", icon: <FiGift size={22} />, path: "/hr/holidays" },
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
        <div className="w-full flex items-center justify-center border-b border-white/10 relative py-4">
          <img src={Logo} className="h-10 brightness-0 invert" />

          <button
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden absolute right-4 text-white"
          ></button>
        </div>

        {/* Menu Items */}
        <div className="flex-1 w-full overflow-y-auto no-scrollbar mt-6">
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
                  w-full cursor-pointer transition-all duration-400
                  ${isActive
                    ? "bg-white text-[#0E4DB5] flex flex-row items-center justify-center gap-2 py-4"
                    : "text-white/80 hover:bg-white/20 hover:text-white flex flex-col items-center py-4"
                  }
                `}
              >
                {/* ICON */}
                <div className={`${isActive ? "text-[#0E4DB5]" : "text-white/80"}`}>
                  {item.icon}
                </div>

                {/* TEXT */}
                <span
                  className={`text-sm ${isActive ? "text-[#0E4DB5]" : "text-white/80"}`}
                >
                  {item.name}
                </span>
              </div>
            );
          })}
        </div>

        {/* Divider */}
        <div className="w-full border-t border-white/20 mb-2"></div>

        {/* Logout */}
        <div
          onClick={() => setOpenLogout(true)}
          className="w-full py-2 flex justify-center gap-2 items-center cursor-pointer text-white/90 hover:bg-white/20 transition"
        >
          <FiLogOut size={22} />
          <span className="text-sm">Logout</span>
        </div>
      </div>

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col">
        <HrTopbar name={currentUser.name} id={currentUser.id} />

        {/* CONTENT AREA SCROLLS ONLY */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>

      <LogoutModal
        isOpen={openLogout}
        onClose={() => setOpenLogout(false)}
        onConfirm={() => {
          localStorage.removeItem("authToken");
          localStorage.removeItem("role");
          navigate("/login");
          setIsSidebarOpen(false);
        }}
      />
    </div>
  );
}
