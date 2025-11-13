import { Clock, Loader2 } from "lucide-react";
import { useState } from "react";

type Props = {
  label: string;
  time: string;
  actionLabel: string;
  onAction?: () => void;
  loading?: boolean;
  disabled?: boolean;
};

export default function TimeCard({
  label,
  time,
  actionLabel,
  onAction,
  loading = false,
  disabled = false,
}: Props) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`
        relative overflow-hidden
        bg-white/90 backdrop-blur-sm
        p-6 rounded-2xl shadow-md border border-white/30
        flex flex-col gap-4 w-full
        transition-all duration-300 ease-out
        ${isHovered && !disabled ? "shadow-lg -translate-y-1" : ""}
        ${disabled ? "opacity-70 cursor-not-allowed" : "cursor-default"}
      `}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="article"
      aria-label={`${label}: ${time}`}
    >
      {/* Content */}
      <div className="relative z-10 flex flex-col gap-4">
        {/* Label with icon */}
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-blue-50">
            <Clock className="w-4 h-4 text-blue-600" />
          </div>
          <span className="text-sm font-semibold text-gray-600 tracking-wide uppercase">
            {label}
          </span>
        </div>

        {/* Time */}
        <h2 className="text-4xl font-bold text-gray-900 tracking-tighter">
          {time}
        </h2>

        {/* Action Button */}
        <button
          onClick={onAction}
          disabled={disabled || loading}
          className={`
            mt-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold
            rounded-xl shadow-sm flex items-center justify-center gap-2
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            ${disabled || loading
              ? "opacity-60 cursor-not-allowed"
              : "hover:bg-blue-700 hover:shadow-md active:scale-98"
            }
          `}
          aria-label={actionLabel}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            actionLabel
          )}
        </button>
      </div>
    </div>
  );
}