import {
  Plus,
  Minus,
  FileText,
  ChevronDown,
} from "lucide-react";

const iconMap: { [key: string]: React.ReactElement } = {
  "+": <Plus size={18} className="text-green-600" />,
  "-": <Minus size={18} className="text-red-600" />,
  "*": <FileText size={18} className="text-blue-600" />,
};

export default function BreakdownDetails({ breakdown, isVisible }: any) {
  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-2xl p-6 sm:p-8">
      {/* Heading */}
      <h3 className="text-lg font-bold text-gray-900 mb-6">
        Detailed Breakdown
      </h3>

      <div className="space-y-3">
        {breakdown.map((section: any, i: number) => (
          <details
            key={i}
            className="group border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 open:bg-gray-50/50 open:shadow-sm"
          >
            <summary className="flex justify-between items-center p-4 cursor-pointer list-none hover:bg-gray-50 transition-colors">

              {/* LEFT – icon + category */}
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${section.icon === '+' ? 'bg-green-50' :
                  section.icon === '-' ? 'bg-red-50' : 'bg-blue-50'
                  }`}>
                  {iconMap[section.icon as keyof typeof iconMap]}
                </div>
                <span className="font-medium text-gray-900 text-sm sm:text-base">
                  {section.category}
                </span>
              </div>

              {/* RIGHT – amount + arrow */}
              <div className="flex items-center gap-4">
                <span className={`font-semibold text-sm sm:text-base ${section.amount < 0 ? "text-red-600" : "text-gray-900"
                  }`}>
                  {isVisible ? (
                    <>
                      {section.amount < 0 ? "-" : ""}₹
                      {Math.abs(section.amount).toLocaleString()}
                    </>
                  ) : (
                    "••••"
                  )}
                </span>
                <ChevronDown size={18} className="text-gray-400 transition-transform duration-200 group-open:rotate-180" />
              </div>

            </summary>

            {/* Inner details */}
            <div className="px-4 pb-4 pt-2 border-t border-gray-100 space-y-2">
              {section.items.map((item: any, index: number) => (
                <div
                  key={index}
                  className="flex justify-between items-center text-sm pl-11 pr-2 py-1"
                >
                  <span className="text-gray-500">{item.label}</span>
                  <span className="font-medium text-gray-700">
                    {isVisible ? (
                      <>
                        {item.amount < 0 ? "-" : ""}₹
                        {Math.abs(item.amount).toLocaleString()}
                      </>
                    ) : (
                      "••••"
                    )}
                  </span>
                </div>
              ))}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
