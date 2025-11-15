interface Props {
  label: string;
  active: boolean;
  onClick: () => void;
}

export default function TabButton({ label, active, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`
        flex-1 px-4 py-2.5 text-sm font-semibold rounded-md transition-all border-0
        focus:outline-none 
        ${
          active
            ? "bg-white text-gray-800 shadow-sm" // Active state: white, shadow
            : "text-gray-600 hover:text-gray-800" // Inactive state
        }
      `}
    >
      {label}
    </button>
  );
}