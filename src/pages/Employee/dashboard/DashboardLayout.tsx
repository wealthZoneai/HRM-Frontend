import React, { type ReactNode, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  FiHome,
  FiUser,
  FiBriefcase,
  FiClock,
  FiCalendar,
  FiCreditCard,
  FiLogOut,
  FiMenu,
  FiX
} from "react-icons/fi";
import Topbar from "./Topbar";
import Logo from "../../../assets/white_logo.png"

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
    {
      name: "Dashboard",
      icon: <FiHome size={20} />,
      path: "/employee",
    },

    { name: "Profile", icon: <FiUser size={20} />, path: "/employee/profile" },

    // {
    //   name: "Performance",
    //   icon: <FiTrendingUp size={20} />,
    //   path: "/employee/performance",
    // },

    {
      name: "Project Status",
      icon: <FiBriefcase size={20} />,
      path: "/employee/project-status",
    },

    // {
    //   name: "Announcements",
    //   icon: <BsFillMegaphoneFill size={20} />,
    //   path: "/employee/announcements",
    // },

    { name: "Attendances", icon: <FiClock size={20} />, path: "/employee/attendances" },

    // {
    //   name: "Notifications",
    //   icon: <FiBell size={20} />,
    //   path: "/employee/notifications",
    // },

    {
      name: "Leave Management",
      icon: <FiCalendar size={20} />,
      path: "/employee/leave-management",
    },

    // {
    //   name: "Calendar",
    //   icon: <FiCalendar size={20} />,
    //   path: "/employee/calendar",
    // },

    { name: "Payroll", icon: <FiCreditCard size={20} />, path: "/employee/payroll" },
    // {
    //   name: "Policy",
    //   icon: <FiCalendar size={20} />,
    //   path: "/employee/policy",
    // },
  ];

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/employeelogin");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Get the current user's name and ID from your authentication context or API
  // For now, using placeholder values - replace these with actual user data
  const currentUser = {
    name: "Raviteja", // Replace with actual user name
    id: "WZG-AI-0029"      // Replace with actual user ID
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${isSidebarOpen ? "w-64" : "w-20"} 
        bg-blue-800 text-white transition-all duration-300 ease-in-out`}
      >
        <div className="p-4 flex items-center justify-center">
          {isSidebarOpen && <img src={Logo} alt="logo" className="h-24"/>}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-blue-700"
          >
            {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        <nav className="mt-8">
          {navItems.map((item) => (
            <div
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`flex items-center px-6 py-3 cursor-pointer transition-colors ${
                location.pathname === item.path
                  ? "bg-blue-700"
                  : "hover:bg-blue-700"
              }`}
            >
              <span className="mr-4">{item.icon}</span>
              {isSidebarOpen && <span className="text-sm">{item.name}</span>}
            </div>
          ))}

          <div
            className="absolute bottom-0 w-full left-0 p-4 cursor-pointer flex items-center"
            onClick={handleLogout}
          >
            <FiLogOut size={20} className="mr-4" />
            {isSidebarOpen && <span>Logout</span>}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <Topbar name={currentUser.name} id={currentUser.id} />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">
            {navItems.find((item) => item.path === location.pathname)?.name || "Dashboard"}
          </h1>
          {children}
        </main>
      </div>
    </div>
  );
}
