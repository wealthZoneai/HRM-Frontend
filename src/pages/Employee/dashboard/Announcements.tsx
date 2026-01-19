import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Info } from "lucide-react";
import { getAnnouncements } from "../../../Services/apiHelpers";

/* ----------------------------------------------------
   TYPES
---------------------------------------------------- */
interface Announcement {
  id: number;
  title: string;
  description: string;
  category: string;
  priority: "High" | "Medium" | "Low";
  date: string;       // "Jan 12, 2026"
  rawDate: Date;      // For sorting
  month: string;      // "Jan"
  day: string;        // "12"
  year: string;
  time: string;
}

interface DetailModalProps {
  selected: Announcement | null;
  onClose: () => void;
}

/* ----------------------------------------------------
   API → UI FORMATTER
---------------------------------------------------- */
const formatAnnouncement = (item: any): Announcement => {
  const d = new Date(item.date);

  return {
    id: item.id,
    title: item.title,
    description: item.description,
    category: item.department || "General",
    priority: item.priority && ["High", "Medium", "Low"].includes(item.priority) ? item.priority : "Medium",
    date: d.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
    rawDate: d,
    month: d.toLocaleDateString("en-US", { month: "short" }),
    day: d.getDate().toString().padStart(2, '0'),
    year: d.getFullYear().toString(),
    time: item.time ? new Date(`1970-01-01T${item.time}`).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) : "",
  };
};

/* ----------------------------------------------------
   STYLES HELPERS (Copied from HR Dashboard)
---------------------------------------------------- */
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

/* ----------------------------------------------------
   MAIN COMPONENT
---------------------------------------------------- */
export default function Announcements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [selected, setSelected] = useState<Announcement | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await getAnnouncements();
        // Handle API response structure
        const data = res.data.data || res.data || [];
        const formatted = Array.isArray(data) ? data.map(formatAnnouncement) : [];

        // Sort by Priority like HR Dashboard
        const priorityOrder = { High: 0, Medium: 1, Low: 2 };
        const sorted = formatted.sort(
          (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
        );

        setAnnouncements(sorted);
      } catch (error) {
        console.error("Failed to fetch announcements", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center justify-center font-sans text-stone-500 h-[420px] border border-gray-100">
        Loading announcements…
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 h-[420px] flex flex-col font-sans">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Announcements</h3>

      <div className="space-y-3 flex-1 overflow-y-auto min-h-0 scrollbar-hide">
        {announcements.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 text-sm">
            <p>No announcements found</p>
          </div>
        ) : (
          announcements.map((item) => (
            <ListItem
              key={item.id}
              item={item}
              onClick={() => setSelected(item)}
            />
          ))
        )}
      </div>

      <DetailModal selected={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

/* ----------------------------------------------------
   LIST ITEM (Matches HR Dashboard Widget)
---------------------------------------------------- */
function ListItem({ item, onClick }: { item: Announcement; onClick: () => void }) {
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
          {item.month}
        </span>
        <span className="text-xl font-bold text-gray-800">{item.day}</span>
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
          {item.description || item.date}
        </p>
      </div>

      <div className="text-gray-300">
        <Info size={18} />
      </div>
    </motion.div>
  );
}

/* ----------------------------------------------------
   DETAIL MODAL (Matches HR Dashboard Widget)
---------------------------------------------------- */
function DetailModal({ selected, onClose }: DetailModalProps) {
  if (!selected) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" onClick={onClose} />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          layoutId={`card-${selected.id}`}
          className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden pointer-events-auto"
        >
          <div className="h-20 bg-gray-100 flex items-center justify-between px-6">
            <span className="text-3xl font-bold text-gray-400 opacity-50">
              {selected.date}
            </span>

            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>
          </div>

          <div className="p-6">
            <h2 className="text-xl font-bold mb-2 text-gray-900">{selected.title}</h2>

            <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${getPriorityStyles(selected.priority)}`}>
              {selected.priority}
            </span>

            <p className="mt-4 text-gray-600 leading-relaxed whitespace-pre-line">
              {selected.description}
            </p>

            <div className="mt-4 flex items-center gap-2 text-gray-500 text-sm">
              <Calendar size={18} />
              <span>{selected.date} {selected.time && `at ${selected.time}`}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
