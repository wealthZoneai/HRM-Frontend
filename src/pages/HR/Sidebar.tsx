export default function Sidebar() {
  const menuItems = [
    "Dashboard",
    "Employees",
    "Leave Management",
    "Attendance",
    "Notifications",
    "salary Management",
    "Holidays",
    "Announcements",
    "Logout"
  ];

  return (
    <aside className="w-64 min-h-screen bg-blue-600 text-white p-6 space-y-6">
      {/* <h2 className="text-2xl font-bold">W&G</h2> */}
      <nav className="space-y-2">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className="w-full text-left py-2 px-3 hover:bg-blue-700 rounded"
          >
            {item}
          </button>
        ))}
      </nav>
    </aside>
  );
}
