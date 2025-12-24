import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, X, Calendar, Bell, Info, Clock } from "lucide-react";
import { getAnnouncements } from "../../../Services/apiHelpers";

/* ----------------------------------------------------
   TYPES
---------------------------------------------------- */
interface Announcement {
  id: number;
  day: string;
  date: string;
  month: string;
  year: string;
  event: string;
  time: string;
  description: string;
  location: string;
  type: string;
  priority: "High" | "Medium" | "Low";
}

interface ListItemProps {
  item: Announcement;
  onClick: () => void;
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
    day: d.toLocaleDateString("en-US", { weekday: "short" }),
    date: d.getDate().toString().padStart(2, "0"),
    month: d.toLocaleDateString("en-US", { month: "short" }),
    year: d.getFullYear().toString(),
    event: item.title,
    time: new Date(`1970-01-01T${item.time}`).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    description: item.description,
    location: item.department || "Office",
    type: item.department,
    priority:
      item.priority === "HIGH"
        ? "High"
        : item.priority === "MEDIUM"
        ? "Medium"
        : "Low",
  };
};

/* ----------------------------------------------------
   PRIORITY STYLES
---------------------------------------------------- */
const getPriorityStyles = (priority: string) => {
  switch (priority) {
    case "High":
      return "bg-red-50 text-red-600 border-red-100";
    case "Medium":
      return "bg-amber-50 text-amber-600 border-amber-100";
    case "Low":
      return "bg-slate-50 text-slate-500 border-slate-100";
    default:
      return "bg-stone-50 text-stone-500 border-stone-100";
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
        const formatted = res.data.data.map(formatAnnouncement);
        setAnnouncements(formatted);
      } catch (error) {
        console.error("Failed to fetch announcements", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <div className="max-h-[500px] bg-white flex items-center justify-center font-sans text-stone-800">
      <div className="w-full max-w-2xl h-full bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-stone-100 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-6 md:px-8 border-b border-stone-100 flex justify-between items-end">
          <h1 className="text-2xl md:text-xl font-bold text-stone-900">
            Announcements
          </h1>
          <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-stone-50 border border-stone-100 text-stone-400">
            <Bell size={18} />
          </div>
        </div>

        {/* List */}
        <div className="max-h-[380px] overflow-y-auto custom-scrollbar">
          <ul className="divide-y divide-stone-50">
            {loading ? (
              <li className="p-6 text-center text-stone-400">
                Loading announcements…
              </li>
            ) : announcements.length === 0 ? (
              <li className="p-6 text-center text-stone-400">
                No announcements available
              </li>
            ) : (
              announcements.map((item) => (
                <ListItem
                  key={item.id}
                  item={item}
                  onClick={() => setSelected(item)}
                />
              ))
            )}
          </ul>
        </div>
      </div>

      <DetailModal selected={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

/* ----------------------------------------------------
   LIST ITEM
---------------------------------------------------- */
function ListItem({ item, onClick }: ListItemProps) {
  const priorityStyle = getPriorityStyles(item.priority);

  return (
    <motion.li
      layoutId={`card-${item.id}`}
      onClick={onClick}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="group flex items-center gap-4 p-6 md:px-8 hover:bg-blue-50/30 cursor-pointer transition-all"
    >
      <div className="flex flex-col items-center w-14">
        <span className="text-xs font-bold text-stone-400 uppercase">
          {item.day}
        </span>
        <span className="text-2xl font-bold text-stone-800">
          {item.date}
        </span>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between">
          <h3 className="text-lg font-medium truncate">{item.event}</h3>
          <span
            className={`hidden sm:inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${priorityStyle}`}
          >
            {item.priority}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-stone-500 mt-1">
          <Clock size={14} />
          {item.time}
          <span className="hidden sm:inline">• {item.type}</span>
        </div>
      </div>

      <Info size={20} className="text-stone-300 group-hover:text-blue-600" />
    </motion.li>
  );
}

/* ----------------------------------------------------
   DETAIL MODAL
---------------------------------------------------- */
function DetailModal({ selected, onClose }: DetailModalProps) {
  if (!selected) return null;
  const priorityStyle = getPriorityStyles(selected.priority);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-stone-900/20 backdrop-blur-sm z-40" onClick={onClose} />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          layoutId={`card-${selected.id}`}
          className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="h-24 bg-linear-to-r from-stone-100 to-stone-200 flex justify-between p-6">
            <div>
              <div className="text-4xl font-bold text-stone-400">
                {selected.date}
              </div>
              <div className="text-xs uppercase font-bold">
                {selected.month}, {selected.year}
              </div>
            </div>
            <button onClick={onClose}>
              <X />
            </button>
          </div>

          <div className="p-6">
            <div className="flex gap-2 mb-3">
              <span className="px-3 py-1 text-xs font-bold bg-blue-50 text-blue-800 rounded-full">
                {selected.type}
              </span>
              <span
                className={`px-3 py-1 text-xs font-bold rounded-full border ${priorityStyle}`}
              >
                {selected.priority} Priority
              </span>
            </div>

            <h2 className="text-2xl font-bold mb-4">{selected.event}</h2>
            <p className="text-stone-600 mb-6">{selected.description}</p>

            <div className="space-y-4 border-t pt-4">
              <div className="flex gap-3">
                <Calendar size={18} />
                {selected.day}, {selected.month} {selected.date} at {selected.time}
              </div>
              <div className="flex gap-3">
                <MapPin size={18} />
                {selected.location}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
