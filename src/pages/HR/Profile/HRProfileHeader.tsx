import { motion } from 'framer-motion';
import { Briefcase, IdCard, MapPin, Calendar } from 'lucide-react';
import Pic from '../../../assets/my_pic.jpg';

const HRProfileHeader = () => {
    const userName = localStorage.getItem("userName") || "HR Manager";

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100"
        >
            {/* Content Area */}
            <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">

                    {/* Profile Image */}
                    <div className="relative shrink-0 mx-auto sm:mx-0">
                        <img
                            src={Pic}
                            alt="Profile"
                            className="h-24 w-24 sm:h-32 sm:w-32 rounded-full border-4 border-gray-50 shadow-sm object-cover bg-white"
                        />
                        <span className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 h-4 w-4 sm:h-5 sm:w-5 rounded-full border-2 border-white bg-green-500 shadow-sm" />
                    </div>

                    {/* Profile Info */}
                    <div className="flex-1 text-center sm:text-left w-full">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                                    {userName}
                                </h2>
                                <p className="text-sm sm:text-base text-gray-500 font-medium mt-1">Human Resources Manager</p>
                            </div>

                            {/* Status Badge or Quick Action */}
                            <div className="hidden sm:block">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-700 border border-green-200">
                                    Active
                                </span>
                            </div>
                        </div>

                        {/* Details Grid */}
                        <div className="mt-6 flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-4">
                            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 bg-gray-50 px-2.5 sm:px-3 py-1.5 rounded-lg border border-gray-100">
                                <Briefcase size={14} className="text-blue-500 shrink-0" />
                                <span>HR Department</span>
                            </div>

                            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 bg-gray-50 px-2.5 sm:px-3 py-1.5 rounded-lg border border-gray-100">
                                <IdCard size={14} className="text-purple-500 shrink-0" />
                                <span>{localStorage.getItem("empId") || "WZG-HR-001"}</span>
                            </div>

                            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 bg-gray-50 px-2.5 sm:px-3 py-1.5 rounded-lg border border-gray-100">
                                <MapPin size={14} className="text-red-500 shrink-0" />
                                <span>Hyderabad, India</span>
                            </div>

                            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 bg-gray-50 px-2.5 sm:px-3 py-1.5 rounded-lg border border-gray-100">
                                <Calendar size={14} className="text-orange-500 shrink-0" />
                                <span>DOJ: 01/01/2023</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default HRProfileHeader;
