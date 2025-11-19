import  { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, X, Calendar, Bell, Info, Clock } from 'lucide-react';

// --- Mock Data ---
const ANNOUNCEMENTS = [
  {
    id: 1,
    day: "Mon",
    date: "08",
    month: "Oct",
    event: "Marketing Strategy",
    time: "10:00 AM",
    description: "Quarterly review of campaign performance and brainstorming session for the upcoming holiday season strategies.",
    location: "Executive Conference Room",
    type: "Strategy"
  },
  {
    id: 2,
    day: "Tue",
    date: "09",
    month: "Oct",
    event: "Design System Review",
    time: "11:00 AM",
    description: "Critique session for the new mobile design prototypes. Please bring your updated Figma files.",
    location: "Design Studio / Figma Live",
    type: "Design"
  },
  {
    id: 3,
    day: "Wed",
    date: "10",
    month: "Oct",
    event: "Engineering Sync",
    time: "12:30 PM",
    description: "Full stack team sync to discuss API architecture changes and workflow division for the Q4 sprint.",
    location: "Zoom Meeting Link",
    type: "Dev"
  },
  {
    id: 4,
    day: "Thu",
    date: "11",
    month: "Oct",
    event: "Client Demo: Alpha",
    time: "04:00 PM",
    description: "Monthly product demo review with the Alpha Corp stakeholders. Casual business attire required.",
    location: "Conference Room A",
    type: "Client"
  },
];

export default function Announcements() {
  const [selected, setSelected] = useState<Announcement | null>(null);

  return (
    <div className="max-h-[700px] bg-white flex items-center justify-center  font-sans text-stone-800" style={{ fontFamily: "'Inter', sans-serif" }}>
      
      {/* Main Card Container */}
      <div className="w-full max-w-2xl h-full bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-stone-100 overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-8 md:px-8 border-b border-stone-100 flex justify-between items-end bg-white">
          <div>
            {/* <h2 className="text-sm font-bold tracking-widest uppercase text-blue-900/60 mb-1">Updates</h2> */}
            <h1 className="text-3xl md:text-4xl font-bold text-stone-900 tracking-tight">Announcements</h1>
          </div>
          <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-stone-50 text-stone-400 border border-stone-100">
            <Bell size={18} />
          </div>
        </div>

        {/* Scrollable List Area */}
        <div className="max-h-[450px] overflow-y-auto custom-scrollbar">
          <ul className="divide-y divide-stone-50">
            {ANNOUNCEMENTS.map((item) => (
              <ListItem key={item.id} item={item} onClick={() => setSelected(item)} />
            ))}
          </ul>
        </div>

        {/* Footer / Action Area */}
        {/* <div className="bg-stone-50 px-6 py-4 border-t border-stone-100 text-center">
          <button className="text-sm font-medium text-stone-500 hover:text-blue-900 transition-colors">
            View archived announcements
          </button>
        </div> */}
      </div>

      {/* Detail Modal */}
      <DetailModal selected={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

// --- Sub-Components ---

interface Announcement {
  id: number;
  day: string;
  date: string;
  month: string;
  event: string;
  time: string;
  description: string;
  location: string;
  type: string;
}

interface ListItemProps {
  item: Announcement;
  onClick: () => void;
}

function ListItem({ item, onClick }: ListItemProps) {
  return (
    <motion.li 
      layoutId={`card-${item.id}`}
      onClick={onClick}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="group flex items-center gap-4 p-6 md:px-8 hover:bg-blue-50/30 cursor-pointer transition-all duration-300"
    >
      {/* Date Component - Classic Typography */}
      <div className="flex flex-col items-center justify-center w-14 min-w-14">
        <span className="text-xs font-bold tracking-wider text-stone-400 uppercase group-hover:text-blue-400 transition-colors">{item.day}</span>
        <span className="text-2xl font-bold text-stone-800 group-hover:text-blue-900 transition-colors">
          {item.date}
        </span>
      </div>

      {/* Vertical Divider */}
      <div className="h-10 w-px bg-stone-200/60 hidden md:block mx-2"></div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-medium text-stone-900 truncate pr-4 group-hover:text-blue-900 transition-colors">
          {item.event}
        </h3>
<div className="flex items-center gap-3 mt-1 text-sm text-stone-500">
  <span className="flex items-center gap-1 group-hover:text-blue-800/70 transition-colors">
    <Clock size={14} className="text-stone-400" />
    <span className="truncate">{item.time}</span>
  </span>
  <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-stone-300"></span>
  <span className="hidden sm:flex items-center gap-1 truncate group-hover:text-blue-800/70 transition-colors">
     {item.type}
  </span>
</div>
      </div>

      {/* Action Icon */}
      <div className="text-stone-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300">
        <Info size={20} />
      </div>
    </motion.li>
  );
}

interface DetailModalProps {
  selected: Announcement | null;
  onClose: () => void;
}

function DetailModal({ selected, onClose }: DetailModalProps) {
  return (
    <AnimatePresence>
      {selected && (
        <>
          {/* Backdrop */}
          <div
            onClick={onClose}
            className="fixed inset-0 bg-stone-900/20 backdrop-blur-sm z-40"
          />

          {/* Modal Card */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              layoutId={`card-${selected.id}`}
              className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden pointer-events-auto"
            >
              {/* Modal Header Image/Pattern Placeholder */}
              <div className="h-24 bg-linear-to-r from-stone-100 to-stone-200 flex items-center justify-between px-6 relative">
                <div className="flex flex-col">
                    <span className="text-4xl font-bold text-stone-400 opacity-50">{selected.date}</span>
                    <span className="text-xs uppercase tracking-widest text-stone-500 font-bold">{selected.month}</span>
                </div>
                <button 
                  onClick={onClose}
                  className="bg-white/50 hover:bg-white p-2 rounded-full transition-colors text-stone-600 hover:text-blue-900"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 md:p-8">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-xs font-bold uppercase tracking-wider text-blue-800 mb-3">
                    {selected.type}
                  </span>
                  
                  <h2 className="text-2xl font-bold text-stone-900 mb-4 leading-tight">
                    {selected.event}
                  </h2>
                  
                  <p className="text-stone-600 leading-relaxed mb-8">
                    {selected.description}
                  </p>

                  <div className="space-y-4 border-t border-stone-100 pt-6">
                    <div className="flex items-start gap-3">
                      <Calendar className="text-stone-400 mt-0.5" size={18} />
                      <div>
                        <p className="text-sm font-bold text-stone-900">Date & Time</p>
                        <p className="text-sm text-stone-500">{selected.day}, {selected.month} {selected.date} at {selected.time}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <MapPin className="text-stone-400 mt-0.5" size={18} />
                      <div>
                        <p className="text-sm font-bold text-stone-900">Location</p>
                        <p className="text-sm text-stone-500">{selected.location}</p>
                      </div>
                    </div>
                  </div>

                  {/* <button 
                    onClick={onClose}
                    className="w-full mt-8 bg-blue-900 text-white py-3 rounded-xl font-medium hover:bg-blue-800 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20"
                  >
                    Acknowledge
                  </button> */}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}