export default function LeaveBalances() {
  const balances = [
    { label: "Annual Leave", days: 14 },
    { label: "Sick Leave", days: 8 },
    { label: "Unpaid Leaves", days: 2 }
  ];

  return (
    <div className="flex gap-6">
      {balances.map((b) => (
        <div key={b.label} className="flex-1 p-6 bg-white shadow-md rounded-xl text-center">
          <p className="font-semibold">{b.label}</p>
          <p className="text-blue-600 text-2xl font-bold mt-2">{b.days} Days</p>
        </div>
      ))}
    </div>
  );
}
