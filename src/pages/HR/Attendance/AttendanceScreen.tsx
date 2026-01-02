import React, { useState } from "react";
import ViewLogModal from "./ViewLogModal"; // Ensure path is correct based on your folder structure
import { DailyView, MonthlyView, RecordsView } from "./TabViews"; // Ensure path is correct

const AttendanceScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"daily" | "monthly" | "records">("daily");
  
  // --- MODAL STATE (UPDATED) ---
  const [isLogOpen, setIsLogOpen] = useState(false);
  // Now storing 'logs' array in addition to name and month
  const [selectedLogData, setSelectedLogData] = useState<{ name: string, month: string, logs: any[] } | null>(null);

  // Updated handler to accept 'logs'
  const handleViewLog = (employee: string, month: string, logs: any[]) => {
    setSelectedLogData({ name: employee, month, logs });
    setIsLogOpen(true);
  };

  const TabButton: React.FC<{ k: string, label: string }> = ({ k, label }) => (
    <button
      onClick={() => setActiveTab(k as any)}
      className={`pb-3 text-base transition-colors ${activeTab === k
        ? "border-b-2 border-blue-600 font-bold text-blue-600"
        : "text-gray-600 hover:text-gray-800"
        }`}
    >
      {label}
    </button>
  );

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Page Title */}
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Attendance Overview</h2>

      {/* TABS */}
      <div className="flex gap-8 border-b border-gray-200 mb-8 overflow-x-auto whitespace-nowrap">
        <TabButton k="daily" label="Daily View" />
        <TabButton k="monthly" label="Monthly Summary" />
        <TabButton k="records" label="Attendance Records" />
      </div>

      {/* CONTENT */}
      <div className="max-w-full mx-auto overflow-hidden overflow-y-auto max-h-[60vh] no-scrollbar">
        {activeTab === "daily" && <DailyView />}
        {/* Pass the updated handler to MonthlyView */}
        {activeTab === "monthly" && <MonthlyView onViewLog={handleViewLog} />}
        {activeTab === "records" && <RecordsView />}
      </div>

      {/* VIEW LOG MODAL (UPDATED) */}
      <ViewLogModal
        isOpen={isLogOpen}
        onClose={() => setIsLogOpen(false)}
        employeeName={selectedLogData?.name || ""}
        month={selectedLogData?.month || ""}
        logs={selectedLogData?.logs || []} 
      />
    </div>
  );
};

export default AttendanceScreen;