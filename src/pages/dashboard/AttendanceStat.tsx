import { UserCheck } from "lucide-react";

type StatProps = {
  title: string;
  value: number; // value as a percentage
};

export default function AttendanceStat({ title, value }: StatProps) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (value / 100) * circumference;

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center gap-3 w-full transition-all hover:shadow-md hover:-translate-y-0.5">
      <div className="flex items-center gap-2">
        <UserCheck className="w-4 h-4 text-gray-500" />
        <span className="text-sm text-gray-600 font-medium">{title}</span>
      </div>

      {/* <h2 className="text-3xl font-semibold text-gray-800 tracking-tight">
        {value}%
      </h2> */}

      <div className="relative w-32 h-32 flex items-center justify-center">
        <svg className="transform -rotate-90 w-28 h-28">
          <circle
            cx="56"
            cy="56"
            r={radius}
            stroke="#E5E7EB"
            strokeWidth="14"
            fill="transparent"
          />
          <circle
            cx="56"
            cy="56"
            r={radius}
            stroke="#2563EB"
            strokeWidth="14"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={progressOffset}
            strokeLinecap="round"
            className="transition-all duration-500"
          />
        </svg>

        <span className="absolute text-sm font-semibold text-gray-800">
          {value}%
        </span>
      </div>
    </div>
  );
}
