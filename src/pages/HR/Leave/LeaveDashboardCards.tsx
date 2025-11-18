import React from "react";

interface LeaveDashboardCardsProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string; 
}

const LeaveDashboardCards: React.FC<LeaveDashboardCardsProps> = ({ title, value, icon, color }) => {
  return (
    <div className="
      bg-white 
      p-5 
      rounded-xl 
      shadow-sm 
      border border-gray-200 
      flex items-center justify-between 
      hover:shadow-md 
      transition
    ">
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
      </div>

      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color}`}>
        {icon}
      </div>
    </div>
  );
};

export default LeaveDashboardCards;
