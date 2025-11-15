import React, { useState, type ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FiHome,
  FiUser,
  FiBriefcase,
  FiClock,
  FiCalendar,
  FiLogOut,
  FiMenu,
  FiX,
  FiFileText,
  FiBook,
  FiDollarSign
} from "react-icons/fi";
import Topbar from "./Topbar";
import Logo from "../../../assets/white_logo.png";

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
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navItems: NavItem[] = [
    { name: "Dashboard", icon: <FiHome size={20} />, path: "/employee/dashboard" },
    { name: "Profile", icon: <FiUser size={20} />, path: "/employee/profile" },
    { name: "Project Status", icon: <FiBriefcase size={20} />, path: "/employee/project-status" },
    { name: "Attendances", icon: <FiClock size={20} />, path: "/employee/attendances" },

    // {
    //   name: "Notifications",
    //   icon: <FiBell size={20} />,
    //   path: "/employee/notifications",
    // },

    {
      name: "Leave Management",
      icon: <FiFileText size={20} />,
      path: "/employee/leave-management",
    },

    {
      name: "Calendar",
      icon: <FiCalendar size={20} />,
      path: "/employee/calendar",
    },

    { name: "Payroll", icon: <FiDollarSign size={20} />, path: "/employee/payroll" },
    {
      name: "Policy",
      icon: <FiBook size={20} />,
      path: "/employee/policy",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const currentUser = {
    name: "Raviteja",
    id: "WZG-AI-0029"
  };

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <div
        className={`${isSidebarOpen ? "w-64" : "w-20"}
          bg-blue-800 text-white transition-all duration-300`}
      >
        <div className="p-4 flex items-center justify-between">
          {isSidebarOpen && <img src={Logo} className="h-16" />}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 rounded-lg">
            {isSidebarOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>

        <nav className="mt-8">
          {navItems.map((item) => (
            <div
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`flex items-center px-6 py-3 cursor-pointer transition 
              ${location.pathname === item.path ? "bg-blue-700" : "hover:bg-blue-700"}`}
            >
              <span className="mr-4">{item.icon}</span>
              {isSidebarOpen && <span>{item.name}</span>}
            </div>
          ))}

          {/* Logout */}
          <div
            className={`absolute bottom-0 left-0 px-6 py-4 cursor-pointer flex items-center hover:bg-blue-700 ${isSidebarOpen ? "w-64" : "w-20"}`}
            onClick={handleLogout}
          >
            <FiLogOut className="mr-4" />
            {isSidebarOpen && <span>Logout</span>}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar name={currentUser.name} id={currentUser.id} />

        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
