import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";

type Announcement = {
  day: string;
  date:string;
  event:string;
  time:string;
  description:string;
  location:string;
}

export default function Announcements() {
  const data : Announcement[] = [
    {
      day: "Mon",
      date: "08",
      event: "Marketing Meeting",
      time: "10:00 AM",
      description: "Discuss upcoming campaign strategy",
      location: "Conference Room / Google Meet link",
    },
    {
      day: "Tue",
      date: "09",
      event: "UI/UX Meeting",
      time: "11:00 AM",
      description: "Review new design prototypes",
      location: "Design Studio / Figma Live",
    },
    {
      day: "Wed",
      date: "10",
      event: "Full Stack Meeting",
      time: "12:30 AM",
      description: "API structure planning and workflow division",
      location: "Zoom Meeting Link",
    },
    {
      day: "Thu",
      date: "11",
      event: "Client Demo Meet",
      time: "04:00 PM",
      description: "Monthly product demo review",
      location: "Conference Room A",
    },
  ];

  const [selected, setSelected] = useState<Announcement | null> (null);

  return (
    <div className="bg-white p-5 rounded-xl shadow w-full">
      <h3 className="font-semibold text-lg mb-4">Announcements</h3>

      {/* Scrollable list with fixed height */}
      <div className="space-y-4 h-64 md:h-72 overflow-y-auto pr-2 custom-scrollbar">

        {data.map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-between border-b last:border-none pb-2"
          >
            <div className="flex items-center space-x-3">
              <div className="bg-gray-100 rounded-md px-3 py-2 text-center leading-tight">
                <p className="font-semibold text-sm">{item.day}</p>
                <p className="text-xs text-gray-600">{item.date}</p>
              </div>

              <div>
                <p className="font-medium">{item.event}</p>
                <p className="text-blue-600 text-xs">{item.time}</p>
              </div>
            </div>

            <button
              onClick={() => setSelected(item)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <FiChevronDown className="text-gray-600" />
            </button>
          </div>
        ))}
      </div>

      {/* Pop-up Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black/50 bg-opacity-30 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-5 w-80 rounded-xl shadow-lg"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h3 className="font-semibold text-lg mb-3 border-b pb-2">
                Announcement Details
              </h3>

              <p><span className="font-semibold">Title</span>: {selected.event}</p>
              <p><span className="font-semibold">Date & Time</span>: {selected.day} {selected.date}, {selected.time}</p>
              <p><span className="font-semibold">Description</span>: {selected.description}</p>
              <p><span className="font-semibold">Location</span>: {selected.location}</p>

              <button
                onClick={() => setSelected(null)}
                className="mt-4 w-full py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
