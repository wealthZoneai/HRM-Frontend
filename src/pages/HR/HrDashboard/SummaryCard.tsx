import React from "react";

export interface SummaryCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  className?: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, subtitle, icon, className }) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm border p-4 flex items-center gap-4 ${className || ""}`}>
      <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-blue-50 flex items-center justify-center">
        {icon ?? <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="none"><path d="M12 12v9" stroke="currentColor" strokeWidth="1.5"/><circle cx="12" cy="7" r="3" stroke="currentColor" strokeWidth="1.5"/></svg>}
      </div>

      <div className="flex-1">
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-semibold text-gray-800">{value}</p>
        {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
      </div>
    </div>
  );
};

export default SummaryCard;
