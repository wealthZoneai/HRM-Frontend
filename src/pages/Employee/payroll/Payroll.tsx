import SalarySummary from "../payroll/SalarySummary";
import PaymentHistory from "../payroll/PaymentHistory";
import BreakdownDetails from "../payroll/BreakdownDetails";
import {
  payrollSummary,
  paymentHistory,
  breakdown,
} from "../payroll/payrollData";

export default function Payroll() {
  return (
    // Use a light background for the whole page
    <div className="bg-slate-50 min-h-screen p-8 space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-slate-900">My Pay Roll</h2>
        <p className="text-slate-500 text-sm mt-1">
          Dashboard / Pay Roll
        </p>
      </div>

      {/* NEW LAYOUT: 
        A 3-column grid, with main content taking 2 columns
        and the sidebar (history) taking 1 column.
      */}
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8 space-y-8 lg:space-y-0">
        
        {/* Main Content Column (2/3 width) */}
        <div className="lg:col-span-2 space-y-8">
          <SalarySummary summary={payrollSummary} />
          <BreakdownDetails breakdown={breakdown} />
        </div>

        {/* Sidebar Column (1/3 width) */}
        <div className="lg:col-span-1">
          <PaymentHistory history={paymentHistory} />
        </div>

      </div>
    </div>
  );
}