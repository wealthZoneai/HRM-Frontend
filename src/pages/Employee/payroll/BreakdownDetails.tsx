export default function BreakdownDetails({ breakdown }: any) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <h3 className="font-semibold mb-6">Detailed Breakdown</h3>

      <div className="space-y-4">
        {breakdown.map((section: any, i: number) => (
          <details key={i} className="border-b pb-4">
            <summary className="flex justify-between cursor-pointer">
              <div className="flex items-center gap-3">
                <span className="text-blue-600 font-bold">{section.icon}</span>
                <span>{section.category}</span>
              </div>
              <span className="font-semibold">
                ₹{section.amount.toLocaleString()}
              </span>
            </summary>

            <div className="mt-3 pl-7 text-sm text-gray-600">
              {section.items.map((item: any, index: number) => (
                <p key={index} className="flex justify-between">
                  <span>{item.label}</span>
                  <span>₹{item.amount.toLocaleString()}</span>
                </p>
              ))}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
