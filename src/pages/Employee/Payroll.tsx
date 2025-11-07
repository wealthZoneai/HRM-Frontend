import DashboardLayout from "../../components/dashboard/DashboardLayout";
import SalarySummary from "../../components/payroll/SalarySummary";
import PaymentHistory from "../../components/payroll/PaymentHistory";
import BreakdownDetails from "../../components/payroll/BreakdownDetails";
import { payrollSummary, paymentHistory, breakdown } from "../../components/payroll/payrollData";

export default function Payroll() {
  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <h2 className="text-xl font-semibold">My Pay Roll</h2>
        <p className="text-gray-500 text-sm mb-2">Dashboard / Pay Roll</p>

        <div className="flex flex-col lg:flex-row gap-6">
          <SalarySummary summary={payrollSummary} />
          <PaymentHistory history={paymentHistory} />
        </div>

        <BreakdownDetails breakdown={breakdown} />
      </div>
    </DashboardLayout>
  );
}
