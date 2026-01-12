import React from "react";
import { FiTrendingUp, FiTrendingDown, FiUsers } from "react-icons/fi";

export interface SummaryCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  className?: string;
  trend?: "up" | "down" | "neutral";
  bgImage?: string; // ⭐ NEW
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  className,
  trend = "neutral",
  bgImage,
}) => {
  // Dynamic Colors
  const accentColorClass =
    trend === "up"
      ? "bg-green-500"
      : trend === "down"
      ? "bg-red-500"
      : "bg-blue-500";

  const iconBgClasses =
    trend === "up"
      ? "bg-green-100 text-green-600"
      : trend === "down"
      ? "bg-red-100 text-red-600"
      : "bg-blue-100 text-blue-600";

  const subtitleClasses =
    trend === "up"
      ? "text-green-600 font-medium"
      : trend === "down"
      ? "text-red-600 font-medium"
      : "text-gray-500";

  const TrendIcon =
    trend === "up" ? (
      <FiTrendingUp size={16} />
    ) : trend === "down" ? (
      <FiTrendingDown size={16} />
    ) : null;

  return (
    <div
      className={`
        relative bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200
        transition-all duration-300 hover:shadow-xl
        ${className || ""}
      `}
    >
      {/* ⭐ Soft Faded Background Image */}
      {bgImage && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.12]"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      )}

      {/* Accent colored left border */}
      <div
        className={`absolute top-0 left-0 h-full w-2 ${accentColorClass} z-10`}
      ></div>

      {/* Content Section */}
      <div className="p-5 pl-7 flex items-start gap-4 relative z-10">
        {/* Icon */}
        <div
          className={`
            shrink-0 w-12 h-12 rounded-lg 
            flex items-center justify-center text-xl 
            ${iconBgClasses}
          `}
        >
          {icon ?? <FiUsers size={22} />}
        </div>

        {/* Content */}
        <div className="flex-1">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">
            {title}
          </p>
          <p className="text-3xl font-bold text-gray-900 leading-tight">
            {value}
          </p>

          {/* Subtitle / Trend */}
          {subtitle && (
            <div className={`flex items-center mt-2 ${subtitleClasses}`}>
              {TrendIcon && <span className="mr-1">{TrendIcon}</span>}
              <p className="text-sm">{subtitle}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
