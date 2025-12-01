import { Wallet, TrendingDown, TrendingUp, Calendar, Eye, EyeOff } from "lucide-react";

export default function SalarySummary({ summary, isVisible, toggleVisibility }: any) {
  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-2xl p-6 sm:p-8 relative overflow-hidden h-full flex flex-col">
      {/* Decorative background gradient */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-32 -mt-32 opacity-50 pointer-events-none"></div>

      <div className="relative z-10 flex-1">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Calendar size={16} />
          <span>Latest payslip: {summary.latestPayslipDate}</span>
        </div>

        <div className="mb-8">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Net Pay</p>
          <div className="flex items-center gap-4">
            <h1 className="text-4xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              {isVisible ? `₹${summary.netPay.toLocaleString()}` : "••••••"}
            </h1>
            <button
              onClick={toggleVisibility}
              className="text-gray-400 hover:text-blue-600 transition-colors focus:outline-none p-2 hover:bg-gray-100 rounded-full"
              title={isVisible ? "Hide details" : "Show details"}
            >
              {isVisible ? <EyeOff size={24} /> : <Eye size={24} />}
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-2 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            Paid on {summary.paidOn}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-gray-100">
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-lg bg-blue-100 text-blue-600">
                <Wallet size={16} />
              </div>
              <span className="text-xs font-medium text-gray-500 uppercase">Gross Pay</span>
            </div>
            <p className="font-bold text-gray-900 text-lg">
              {isVisible ? `₹${summary.grossPay.toLocaleString()}` : "••••"}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-red-50/50 border border-red-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-lg bg-red-100 text-red-600">
                <TrendingDown size={16} />
              </div>
              <span className="text-xs font-medium text-gray-500 uppercase">Deductions</span>
            </div>
            <p className="font-bold text-red-600 text-lg">
              {isVisible ? `-₹${summary.deductions.toLocaleString()}` : "••••"}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 rounded-lg bg-amber-100 text-amber-600">
                <TrendingUp size={16} />
              </div>
              <span className="text-xs font-medium text-gray-500 uppercase">Taxes</span>
            </div>
            <p className="font-bold text-amber-600 text-lg">
              {isVisible ? `-₹${summary.taxes.toLocaleString()}` : "••••"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}