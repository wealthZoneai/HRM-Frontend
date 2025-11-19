import { Bell, User } from "lucide-react";
import { useState, useRef } from "react";
import NotificationPanel from "./NotificationPanel";

interface TopbarProps {
  name: string;
  id: string | number;
}



export default function HrTopbar({ name, id }: TopbarProps) {
  const [openNotif, setOpenNotif] = useState(false);
  const bellRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      {/* BACKDROP WHEN NOTIFICATION OPEN */}
      {openNotif && (
        <div
          className="fixed inset-0 bg-black/50"
          onClick={() => setOpenNotif(false)}
        />
      )}

      <div className="w-full bg-white px-6 py-3 shadow-sm flex items-center justify-between relative">
        {/* LEFT */}
        <div>
          <h2 className="text-lg font-bold text-gray-800">Hello, {name}</h2>
          <p className="text-sm text-gray-500">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>

        {/* CENTER */}
        <div className="hidden md:flex flex-1 justify-center">
          <p className="text-gray-600">Let’s have a productive day!</p>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-6 relative">

          {/* NOTIFICATION BUTTON */}
          <button
            ref={bellRef}
            onClick={() => setOpenNotif(!openNotif)}
            className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
          >
            <Bell size={20} className="text-gray-700" />

            {/* Badge */}
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] px-1.5 py-[1px] rounded-full">
              3
            </span>
          </button>

          {/* PROFILE */}
          <div className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded-full cursor-pointer transition">
            <div className="p-2 rounded-full bg-gray-100">
              <User size={18} className="text-gray-700" />
            </div>
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="text-sm font-semibold text-gray-800">{name}</span>
              <span className="text-xs text-gray-500">ID {id}</span>
            </div>
          </div>
        </div>

        {/* UNIQUE NOTIFICATION PANEL */}

        <NotificationPanel open={openNotif} anchorRef={bellRef}  onClose={() => setOpenNotif(false)}/>
      </div>
    </>
  );
}
