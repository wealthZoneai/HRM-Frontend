export default function SalarySummary({ summary }: any) {
  return (
    <div className="flex-1 bg-white shadow-md rounded-xl p-6">
      <p className="text-sm text-gray-600">Latest payslip: {summary.latestPayslipDate}</p>
      <h1 className="text-3xl font-bold mt-2">₹{summary.netPay.toLocaleString()}</h1>
      <p className="text-gray-500 text-sm">Net pay (paid on: {summary.paidOn})</p>

      <div className="grid grid-cols-3 text-center mt-6">
        <div>
          <p className="text-sm text-gray-500">Gross Pay</p>
          <p className="font-semibold">₹{summary.grossPay.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Deductions</p>
          <p className="font-semibold text-red-600">-₹{summary.deductions}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Taxes</p>
          <p className="font-semibold text-red-600">-₹{summary.taxes}</p>
        </div>
      </div>
    </div>
  );
}
