import { motion } from 'framer-motion';
// Import the 'IdCard' and 'ExternalLink' icons
import { Briefcase, Building, IdCard, } from 'lucide-react';
import Pic from '../../../assets/my_pic.jpg'

const ProfileHeader = () => {
  return (
    <motion.div
      // Add a subtle fade-in animation on load
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      // Responsive layout: column on mobile, row on small screens and up
      // Responsive padding and gap
      className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 bg-white p-4 sm:p-6 rounded-2xl shadow-sm sm:shadow-lg"
    >
      {/* Profile Image with Status Indicator */}
      <div className="relative shrink-0">
        <img
          src={Pic}
          alt="Profile"
          // Responsive image size - reduced on mobile
          className="h-16 w-16 sm:h-24 sm:w-24 rounded-full border-4 border-slate-50 object-cover"
        />
        {/* Status Dot - responsive size and position */}
        <span className="absolute bottom-0 right-0 sm:bottom-1 sm:right-1 h-3 w-3 sm:h-5 sm:w-5 rounded-full border-2 border-white bg-green-500" />
      </div>

      {/* Profile Info - 'grow' works in flex-row. Added w-full for flex-col */}
      {/* Responsive text alignment: center on mobile, left on desktop */}
      <div className="grow w-full text-center sm:text-left">
        {/* Responsive heading size */}
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
          Ravi Teja
        </h2>

        {/* Info with Icons */}
        {/*
          - Stacks vertically on mobile (flex-col) and centers items
          - Becomes a horizontal, wrapping row on desktop (sm:flex-row sm:flex-wrap)
          - Justifies center on mobile, start on desktop
        */}
        <div className="mt-2 flex flex-col items-center gap-1 sm:flex-row sm:flex-wrap sm:justify-start sm:gap-4">
          <span className="flex items-center gap-2 text-md text-slate-600">
            <Briefcase size={16} className="text-slate-400" />
            Frontend Developer
          </span>
          <span className="flex items-center gap-2 text-md text-slate-500">
            <Building size={16} className="text-slate-400" />
            Engineering Department
          </span>
          {/* Added Employee ID */}
          <span className="flex items-center gap-2 text-md text-slate-500">
            <IdCard size={16} className="text-slate-400" />
            EMP-12345
          </span>
        </div>
      </div>

      {/* --- New Actions Section --- */}
      {/* This section stacks below on mobile (w-full) and sits to the right on desktop (sm:w-auto) */}
      <div className="shrink-0 w-full sm:w-auto mt-4 sm:mt-0">
        {/* <button
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-blue-600 transition-colors hover:bg-blue-50 border border-blue-200 hover:border-blue-300"
        >
          <ExternalLink size={16} />
          View Public Profile
        </button> */}
      </div>
    </motion.div>
  );
};

export default ProfileHeader;