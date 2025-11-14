export default function NotificationTabs({
  active,
  onChange,
}: {
  active: string;
  onChange: (val: string) => void;
}) {
  const tabs = ["All", "Unread", "Responses", "Project Status"];

  return (
    <div className="flex gap-3 mb-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`px-3 py-1 text-sm rounded-md border 
          ${active === tab ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"}`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
