import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Info } from "lucide-react";

export interface AnnouncementItem {
  id: string;
  title: string;
  date: string;
  summary?: string;
  color?: string;
}

interface Props {
  items: AnnouncementItem[];
}

const Announcements: React.FC<Props> = ({ items }) => {
  const [selected, setSelected] = useState<AnnouncementItem | null>(null);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 h-full flex flex-col">
      <h3 className="text-lg font-semibold mb-4">Announcements</h3>

      <div className="space-y-3 flex-1 overflow-y-auto min-h-0">
        {items.map((it) => (
          <ListItem key={it.id} item={it} onClick={() => setSelected(it)} />
        ))}
      </div>

      <DetailModal selected={selected} onClose={() => setSelected(null)} />
    </div>
  );
};

// ... (imports)

// ... (Announcements component)

function ListItem({ item, onClick }: { item: AnnouncementItem; onClick: () => void }) {
  // Parsing for the large date block (Month/Day)
  const parts = item.date.split(" ");
  
  // Example: item.date is "Mar 25 2024"
  // parts[0] is "Mar" (month)
  // parts[1] is "25" (day)
  // parts[2] is "2024" (year)

  const month = parts.length > 0 ? parts[0] : "";
  const day = parts.length > 1 ? parts[1] : item.date;

  // Re-format the full date for the summary/modal display to include the comma
  // If the date is simple "Mar 25", it remains "Mar 25"
  // If the date is "Mar 25 2024", it becomes "Mar 25, 2024"
  let displayDate = item.date;
  if (parts.length >= 3 && !item.date.includes(',')) {
      displayDate = `${parts[0]} ${parts[1]}, ${parts[2]}`;
  }


  return (
    <motion.div
      layoutId={`card-${item.id}`}
      onClick={onClick}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="group flex items-center gap-3 p-3 rounded-md hover:bg-gray-50 cursor-pointer transition-all duration-300"
    >
      {/* Date Component (Month/Day only) */}
      <div className="flex flex-col items-center justify-center w-12 min-w-12">
        <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase group-hover:text-blue-500 transition-colors">
          {month}
        </span>
        <span className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
          {day}
        </span>
      </div>

      {/* Vertical Divider */}
      <div className="h-8 w-px bg-gray-200 hidden md:block mx-1"></div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-800 truncate group-hover:text-blue-700 transition-colors">
          {item.title}
        </p>
        <p className="text-xs text-gray-400 mt-0.5 truncate">
          {/* Using the re-formatted date here if needed, or just the summary */}
          {item.summary || displayDate} 
        </p>
      </div>

      {/* Action Icon */}
      <div className="text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300">
        <Info size={18} />
      </div>
    </motion.div>
  );
}

// ... (DetailModal component)

// ... (ListItem component)

function DetailModal({ selected, onClose }: { selected: AnnouncementItem | null; onClose: () => void }) {
  // Re-format the date for the Detail Modal display
  let modalDate = "";
  if (selected) {
    const parts = selected.date.split(" ");
    if (parts.length >= 3 && !selected.date.includes(',')) {
      // Assuming format is "Oct 08 2024"
      modalDate = `${parts[0]} ${parts[1]}, ${parts[2]}`;
    } else {
      // Use original date if it's already correct or not in the full format
      modalDate = selected.date;
    }
  }

  return (
    <AnimatePresence>
      {selected && (
        <>
          {/* Backdrop */}
          <div
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          />

          {/* Modal Card */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              layoutId={`card-${selected.id}`}
              className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden pointer-events-auto"
            >
              {/* Modal Header */}
              <div className="h-20 bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-between px-6 relative">
                <div className="flex flex-col">
                  {/* Updated date format with comma in the header */}
                  <span className="text-3xl font-bold text-gray-400 opacity-50">
                    {modalDate} 
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="bg-white/50 hover:bg-white p-2 rounded-full transition-colors text-gray-600 hover:text-blue-900"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                    {selected.title}
                  </h2>

                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {selected.summary}
                  </p>

                  <div className="space-y-3 border-t border-gray-100 pt-4">
                    <div className="flex items-start gap-3">
                      <Calendar className="text-gray-400 mt-0.5" size={18} />
                      <div>
                        <p className="text-sm font-bold text-gray-900">
                          Date
                        </p>
                        <p className="text-sm text-gray-500">
                          {/* Updated date format with comma in the details */}
                          {modalDate}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

export default Announcements;


