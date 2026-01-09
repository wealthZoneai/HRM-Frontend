import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Info } from "lucide-react";
import { getHrAnnouncements } from "../../../Services/apiHelpers";

export interface AnnouncementItem {
  id: string;
  title: string;
  date: string;
  summary?: string;
  color?: string;
  priority: "High" | "Medium" | "Low";
}

const Announcements: React.FC = () => {
  const [items, setItems] = useState<AnnouncementItem[]>([]);
  const [selected, setSelected] = useState<AnnouncementItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const res = await getHrAnnouncements();

      const mapped: AnnouncementItem[] = res.data.data.map((a: any) => ({
        id: String(a.id),
        title: a.title,
        summary: a.description,
        date: formatDate(a.date),
        priority: mapPriority(a.priority),
      }));

      setItems(mapped);
    } catch (err) {
      console.error("Announcements fetch failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const mapPriority = (p: string): "High" | "Medium" | "Low" => {
    switch (p?.toUpperCase()) {
      case "HIGH":
        return "High";
      case "MEDIUM":
        return "Medium";
      case "LOW":
      default:
        return "Low";
    }
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        Loading announcements…
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 h-[420px] flex flex-col">
      <h3 className="text-lg font-semibold mb-4">Announcements</h3>

      <div className="space-y-3 flex-1 overflow-y-auto min-h-0 scrollbar-hide">
        {items.map((it) => (
          <ListItem key={it.id} item={it} onClick={() => setSelected(it)} />
        ))}
      </div>

      <DetailModal selected={selected} onClose={() => setSelected(null)} />
    </div>
  );
};

const getPriorityStyles = (priority: string) => {
  switch (priority) {
    case "High":
      return "bg-red-50 text-red-600 border border-red-100";
    case "Medium":
      return "bg-amber-50 text-amber-600 border border-amber-100";
    case "Low":
      return "bg-slate-50 text-slate-500 border border-slate-100";
    default:
      return "bg-gray-50 text-gray-500 border border-gray-100";
  }
};

function ListItem({ item, onClick }: { item: AnnouncementItem; onClick: () => void }) {
  const parts = item.date.split(" ");
  const month = parts[0] || "";
  const day = (parts[1] || item.date).replace(",", "");

  let displayDate = item.date;
  if (parts.length >= 3 && !item.date.includes(",")) {
    displayDate = `${parts[0]} ${parts[1]}, ${parts[2]}`;
  }

  const badgeClass = getPriorityStyles(item.priority);

  return (
    <motion.div
      layoutId={`card-${item.id}`}
      onClick={onClick}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="group flex items-center gap-3 p-3 rounded-md hover:bg-gray-50 cursor-pointer transition-all duration-300"
    >
      <div className="flex flex-col items-center justify-center w-12 min-w-12">
        <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">
          {month}
        </span>
        <span className="text-xl font-bold text-gray-800">{day}</span>
      </div>

      <div className="h-8 w-px bg-gray-200 hidden md:block mx-1"></div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <p className="font-medium text-gray-800 truncate">
            {item.title}
          </p>

          <span className={`text-[10px] px-2 py-0.5 rounded font-semibold uppercase tracking-wide ml-2 ${badgeClass}`}>
            {item.priority}
          </span>
        </div>

        <p className="text-xs text-gray-400 mt-0.5 truncate">
          {item.summary || displayDate}
        </p>
      </div>

      <div className="text-gray-300">
        <Info size={18} />
      </div>
    </motion.div>
  );
}

function DetailModal({ selected, onClose }: { selected: AnnouncementItem | null; onClose: () => void }) {
  if (!selected) return null;

  return (
    <AnimatePresence>
      <>
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
        />

        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
          <motion.div
            layoutId={`card-${selected.id}`}
            className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden pointer-events-auto"
          >
            <div className="h-20 bg-gray-100 flex items-center justify-between px-6">
              <span className="text-3xl font-bold text-gray-400 opacity-50">
                {selected.date}
              </span>

              <button onClick={onClose}>
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <h2 className="text-xl font-bold mb-2">{selected.title}</h2>

              <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${getPriorityStyles(selected.priority)}`}>
                {selected.priority}
              </span>

              <p className="mt-4 text-gray-600">
                {selected.summary}
              </p>

              <div className="mt-4 flex items-center gap-2">
                <Calendar size={18} />
                <span>{selected.date}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </>
    </AnimatePresence>
  );
}

export default Announcements;
