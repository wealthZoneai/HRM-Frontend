import {
  FiPlus,
  FiMinus,
  FiFileText,
  FiChevronDown,
} from "react-icons/fi";

const iconMap: { [key: string]: React.ReactElement } = {
  "+": <FiPlus className="text-green-500 text-base sm:text-lg" />,
  "-": <FiMinus className="text-red-500 text-base sm:text-lg" />,
  "*": <FiFileText className="text-blue-500 text-base sm:text-lg" />,
};

export default function BreakdownDetails({ breakdown }: any) {
  return (
    <div className="bg-white shadow-md border border-slate-200 rounded-2xl p-4 sm:p-8">
      {/* Heading */}
      <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-4 sm:mb-6">
        Detailed Breakdown
      </h3>

      <div className="space-y-3 sm:space-y-4">
        {breakdown.map((section: any, i: number) => (
          <details
            key={i}
            className="group border border-slate-200 rounded-xl overflow-hidden transition-all duration-300 open:bg-slate-50"
          >
            <summary className="flex justify-between items-center p-4 sm:p-5 cursor-pointer list-none">

              {/* LEFT – icon + category */}
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="text-lg sm:text-xl">
                  {iconMap[section.icon as keyof typeof iconMap]}
                </span>
                <span className="font-medium text-slate-800 text-sm sm:text-base">
                  {section.category}
                </span>
              </div>

              {/* RIGHT – amount + arrow */}
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="font-semibold text-slate-900 text-sm sm:text-base">
                  {section.amount < 0 ? "-" : ""}₹
                  {Math.abs(section.amount).toLocaleString()}
                </span>
                <FiChevronDown className="text-slate-400 text-sm sm:text-base transition-transform duration-200 group-open:rotate-180" />
              </div>

            </summary>

            {/* Inner details */}
            <div className="p-4 sm:p-5 pt-3 sm:pt-4 border-t border-slate-200 bg-white space-y-2 sm:space-y-3">

              {section.items.map((item: any, index: number) => (
                <p
                  key={index}
                  className="flex justify-between items-center text-xs sm:text-sm"
                >
                  <span className="text-slate-600">{item.label}</span>
                  <span className="font-medium text-slate-800">
                    {item.amount < 0 ? "-" : ""}₹
                    {Math.abs(item.amount).toLocaleString()}
                  </span>
                </p>
              ))}

            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
