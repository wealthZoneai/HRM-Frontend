import React from "react";

export interface AnnouncementItem {
  id: string;
  title: string;
  date: string;
  summary?: string;
  color?: string; // accent color e.g. "bg-red-100 text-red-700"
}

interface Props {
  items: AnnouncementItem[];
}

const Announcements: React.FC<Props> = ({ items }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border">
      <h3 className="text-lg font-semibold mb-4">Announcements</h3>

      <div className="space-y-3">
        {items.map((it) => (
          <div key={it.id} className="flex items-start gap-3 p-3 rounded-md hover:bg-gray-50">
            <div className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center ${it.color ?? "bg-blue-100 text-blue-700"}`}>
              {/* small icon placeholder */}
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none"><path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.5"/></svg>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-gray-800">{it.title}</p>
                  <p className="text-xs text-gray-400 mt-1">{it.summary}</p>
                </div>
                <div className="text-xs text-gray-400">{it.date}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
