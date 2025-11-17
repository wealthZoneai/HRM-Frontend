export default function SalarySummary({ summary }: any) {
  return (
    <div className="flex-1 bg-white shadow-xl rounded-2xl p-8">
      <p className="text-sm text-gray-500">
        Latest payslip: {summary.latestPayslipDate}
      </p>
      {/* Made the Net Pay the clear "hero" element */}
      <h1 className="text-5xl font-extrabold text-gray-900 mt-2">
        ₹{summary.netPay.toLocaleString()}
      </h1>
      <p className="text-gray-500 text-sm">Net pay (paid on: {summary.paidOn})</p>

      {/* Replaced the grid with a clean, vertical definition list */}
      <div className="mt-8 pt-8 border-t border-gray-100 space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-gray-500">Gross Pay</p>
          <p className="font-semibold text-lg text-gray-800">
            ₹{summary.grossPay.toLocaleString()}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-gray-500">Deductions</p>
          <p className="font-semibold text-lg text-red-500">
            -₹{summary.deductions}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-gray-500">Taxes</p>
          <p className="font-semibold text-lg text-red-500">
            -₹{summary.taxes}
          </p>
        </div>
      </div>
    </div>
  );
}