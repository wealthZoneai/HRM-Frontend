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
  FiChevronLeft
} from "react-icons/fi";

import Logo from "../../assets/white_logo.png";
import HrTopbar from "../../components/HrTopbar";

interface HRLayoutProps {
  children: React.ReactNode;
}

export default function HRLayout({ children }: HRLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const currentUser = {
    name: "Raviteja",
    id: "WZG-AI-0029"
  };

  const navItems = [
    { name: "Dashboard", icon: <FiHome size={22} />, path: "/hr/dashboard" },
    { name: "Employees", icon: <FiUsers size={22} />, path: "/hr/employees" },
    { name: "Leave management", icon: <FiCalendar size={22} />, path: "/hr/leave-management" },
    { name: "Attendence", icon: <FiClock size={22} />, path: "/hr/attendance" },
    { name: "Salary management", icon: <FiDollarSign size={22} />, path: "/hr/salary" },
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
          bg-gradient-to-b from-[#0E4DB5] to-[#1557C8]
          transition-all duration-300
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          w-56 md:w-40
        `}
      >
        {/* Logo */}
        <div className="w-full flex items-center justify-center py-6 border-b border-white/10 relative">
          <img src={Logo} className="h-12 brightness-0 invert" />

          {/* <button
            onClick={() => setIsSidebarOpen((o) => !o)}
            className="hidden md:flex absolute right-[-12px] bg-white text-blue-700 rounded-full p-1 shadow border"
          >
            <FiChevronLeft size={18} />
          </button> */}

          <button
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden absolute right-4 text-white"
          >
            <FiChevronLeft size={22} />
          </button>
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
                  w-full flex flex-col items-center py-4 cursor-pointer
                  transition-all duration-200
                  ${
                    isActive
                      ? "bg-white text-[#0E4DB5]"
                      : "text-white/80 hover:bg-white/20 hover:text-white"
                  }
                `}
              >
                <div className={`mb-1 ${isActive ? "text-[#0E4DB5]" : "text-white/80"}`}>
                  {item.icon}
                </div>

                <span className={`text-sm ${isActive ? "text-[#0E4DB5]" : "text-white/80"}`}>
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
          onClick={() => {
            localStorage.removeItem("authToken");
            localStorage.removeItem("role");
            navigate("/login");
            setIsSidebarOpen(false);
          }}
          className="w-full py-5 flex flex-col items-center cursor-pointer text-white/90 hover:bg-white/20 transition"
        >
          <FiLogOut size={22} />
          <span className="text-sm">Logout</span>
        </div>
      </div>

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col">

        <HrTopbar name={currentUser.name} id={currentUser.id} />

        {/* ONLY CONTENT SCROLLS */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
