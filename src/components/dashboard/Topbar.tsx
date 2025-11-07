import React from "react";
import { FiBell } from "react-icons/fi";
import { HiOutlineUser } from "react-icons/hi";

interface TopbarProps {
  name: string;
  id: string | number;
}

export default function Topbar({ name, id }: TopbarProps) {
  // Format date: Monday, 22 March 2025
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="w-full flex justify-between items-center py-4 px-6 bg-white border-b">
      <div>
        <h2 className="text-lg font-semibold capitalize">Hello {name}</h2>
        <p className="text-sm text-gray-500">{formattedDate}</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative cursor-pointer hover:text-gray-700">
          <FiBell className="text-xl text-gray-700" />
          <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </div>

        <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
          <HiOutlineUser className="text-gray-600 text-lg" />
          <div className="text-sm capitalize font-medium">{name}</div>
        </div>

        <span className="text-xs text-gray-400">ID{id}</span>
      </div>
    </div>
  );
}
