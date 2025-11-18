import React from "react";
import { FiTrendingUp, FiTrendingDown, FiUsers } from "react-icons/fi"; 

export interface SummaryCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  className?: string;
  trend?: 'up' | 'down' | 'neutral'; 
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, subtitle, icon, className, trend = 'neutral' }) => {

  // --- Dynamic Styling based on Trend ---
  const accentColorClass = 
    trend === 'up' ? 'bg-green-500' :
    trend === 'down' ? 'bg-red-500' :
    'bg-blue-500'; // Accent color for the side bar

  const iconBgClasses = 
    trend === 'up' ? 'bg-green-100 text-green-600' :
    trend === 'down' ? 'bg-red-100 text-red-600' :
    'bg-blue-100 text-blue-600';
    
  const subtitleClasses = 
    trend === 'up' ? 'text-green-600 font-medium' :
    trend === 'down' ? 'text-red-600 font-medium' :
    'text-gray-500';

  const TrendIcon = 
    trend === 'up' ? <FiTrendingUp size={16} /> :
    trend === 'down' ? <FiTrendingDown size={16} /> : null;
    
  return (
    <div 
      className={`
        relative bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200 transition-all duration-300 hover:shadow-xl
        ${className || ""}
      `}
    >
      {/* 🚀 UNIQUE DESIGN ELEMENT: ACCENT SIDE BAR */}
      <div className={`absolute top-0 left-0 h-full w-2 ${accentColorClass}`}></div>

      <div className="p-5 pl-7 flex items-start gap-4">
        
        {/* ===========================
            ICON BLOCK
        ============================ */}
        <div className={`
          flex-shrink-0 w-12 h-12 rounded-lg 
          flex items-center justify-center text-xl 
          ${iconBgClasses}
        `}>
          {/* Default Icon placeholder for demonstration */}
          {icon ?? <FiUsers size={22} />}
        </div>
        
        {/* ===========================
            CONTENT SECTION
        ============================ */}
        <div className="flex-1">
          {/* Title */}
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">
            {title}
          </p>
          
          {/* Value */}
          <p className="text-3xl font-bold text-gray-900 leading-tight">
            {value}
          </p>
          
          {/* Subtitle / Trend */}
          {subtitle && (
            <div className={`flex items-center mt-2 ${subtitleClasses}`}>
              {TrendIcon && <span className="mr-1">{TrendIcon}</span>}
              <p className="text-sm">
                {subtitle}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;