export default function NotificationTabs({
  active,
  onChange,
}: {
  active: string;
  onChange: (val: string) => void;
}) {
  const tabs = ["All", "Unread", "Responses", "Project Status"];

  return (
    <div className="flex gap-2 sm:gap-3 mb-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`px-2.5 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm rounded-md border whitespace-nowrap flex-shrink-0 transition-all
          ${active === tab ? "bg-blue-600 text-white border-blue-600" : "bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200"}`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
