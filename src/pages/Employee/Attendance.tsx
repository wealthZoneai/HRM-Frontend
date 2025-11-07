import { useRef } from "react";
import CurrentShiftCard from "../../components/attendance/CurrentShiftCard";
import MonthSummaryCard from "../../components/attendance/MonthSummaryCard";
import AttendanceTable from "../../components/attendance/AttendanceTable";
import DashboardLayout from "../../components/dashboard/DashboardLayout";

export default function Attendance() {
  const tableRef = useRef<HTMLDivElement | null>(null);

  const handleHighlightTable = () => {
    if (!tableRef.current) return;

    // Scroll into view smoothly
    tableRef.current.scrollIntoView({ behavior: "smooth", block: "start" });

    // Add highlight class
    tableRef.current.classList.add("highlight-flash");

    // Remove after animation ends
    setTimeout(() => {
      tableRef.current?.classList.remove("highlight-flash");
    }, 1500);
  };

  return (
    <DashboardLayout>
        <div className="space-y-6">
      <CurrentShiftCard onViewHistory={handleHighlightTable} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MonthSummaryCard />
        <div ref={tableRef}>
          <AttendanceTable />
        </div>
      </div>
    </div>
    </DashboardLayout>
  );
}
