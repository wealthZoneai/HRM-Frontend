import { useRef } from "react";
import CurrentShiftCard from "../attendance/CurrentShiftCard";
import MonthSummaryCard from "../attendance/MonthSummaryCard";
import AttendanceTable from "../attendance/AttendanceTable";
import DashboardLayout from "../dashboard/DashboardLayout";
import { motion } from "framer-motion";

export default function Attendance() {
  const tableRef = useRef<HTMLDivElement | null>(null);

  const handleHighlightTable = () => {
    if (!tableRef.current) return;

    tableRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    tableRef.current.classList.add("highlight-flash");
    setTimeout(() => {
      tableRef.current?.classList.remove("highlight-flash");
    }, 1500);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex justify-between items-center flex-wrap gap-2"
        >
          <h1 className="text-2xl font-bold text-gray-900">Attendance Overview</h1>
          <p className="text-sm text-gray-500">Track your shift & attendance history</p>
        </motion.div>

        {/* Current Shift Card */}
        <CurrentShiftCard onViewHistory={handleHighlightTable} />

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {/* Month Summary (smaller column) */}
          <div className="md:col-span-1">
            <MonthSummaryCard />
          </div>

          {/* Attendance Table (larger column) */}
          <motion.div
            ref={tableRef}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2 bg-white/70 backdrop-blur-md rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <AttendanceTable />
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
